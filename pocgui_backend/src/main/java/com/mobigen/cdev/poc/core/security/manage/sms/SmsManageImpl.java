package com.mobigen.cdev.poc.core.security.manage.sms;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetSocketAddress;
import java.net.SocketAddress;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.security.annotation.LoginUser;
import com.mobigen.cdev.poc.core.security.manage.session.SessionManage;
import com.mobigen.cdev.poc.core.security.manage.sms.repository.SmsManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.security.dto.ResultSmsAuthDto;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.core.util.common.Cutil;

@Component
public class SmsManageImpl implements SmsManage {

    private final SessionManage sessionManage;
    private final SmsManageRepository smsManageRepository;
    private final Environment env;

    @Autowired
    public SmsManageImpl(SessionManage sessionManage, SmsManageRepository smsManageRepository, Environment env) {
        this.sessionManage = sessionManage;
        this.smsManageRepository = smsManageRepository;
        this.env = env;
    }

    @Override
    @EnvStatus
    @LoginUser
    public ResultSmsAuthDto sendSmsAuthenticationCode(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        ResultSmsAuthDto resultSmsAuthDto = new ResultSmsAuthDto();
        String envStatus = param.get("envStatus").toString();
        String smsCode = generationAuthenticationCode();

        UserDto userDto = sessionManage.getUserByContextRepository(request,response);
        String phone = userDto.getPhone();
        
        smsCode = generationAuthenticationCode();

        if (UserDto.AUTH_NOT_AUTHENTICATED_STATUS == userDto.getSecondaryAuthenticationStatus()) {
            param.put("refMenuCode", null);
            param.put("smsCode", smsCode);
            param.put("authFlowStage", ResultSmsAuthDto.STAGE_SEND_SMS);
            param.put("authResultFlag", RsResultDto.RESULT_NONE);
            
            int resultInsertSmsAuthManage = smsManageRepository.insertSmsAuthManage(param);
            int resultSendSms = RsResultDto.RESULT_NONE;
            if (resultInsertSmsAuthManage >= 1) {
            	if (Cutil.PROFILE_LOCAL.equals(envStatus) || Cutil.PROFILE_DEVELOP.equals(envStatus) || Cutil.PROFILE_STAGING.equals(envStatus) || Cutil.PROFILE_PRODUCTION.equals(envStatus))  {
            		// local
            		resultSendSms = RsResultDto.RESULT_SUCCESS;
            	} else {
            		// dev, prod
            		resultSendSms = sendSms(phone, new StringBuilder().append(smsCode));
            	}
            }
            
            if (resultInsertSmsAuthManage >= 1 && resultSendSms == RsResultDto.RESULT_SUCCESS) {
            	// InsertDB == Succ & SendSms == Succ
            	resultSmsAuthDto.setAuthFlowStage(ResultSmsAuthDto.STAGE_SEND_SMS);
            } else {
            	resultSmsAuthDto.setAuthFlowStage(ResultSmsAuthDto.STAGE_STAND_BY);
            }
        }

        if (Cutil.PROFILE_LOCAL.equals(envStatus) || Cutil.PROFILE_DEVELOP.equals(envStatus) || Cutil.PROFILE_STAGING.equals(envStatus) || Cutil.PROFILE_PRODUCTION.equals(envStatus)) {
        	// For Local Dev
            resultSmsAuthDto.setSmsCode(smsCode);
        }

        return resultSmsAuthDto;
    }

    @Override
    @LoginUser
    public ResultSmsAuthDto verifyAuthenticationCode(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        ResultSmsAuthDto resultSmsAuthDto = new ResultSmsAuthDto();
        resultSmsAuthDto.setResult(RsResultDto.RESULT_NONE);
        String reqId = smsManageRepository.getSmsReqId(param);
        if (!"".equals(reqId) && reqId != null) {
            param.put("reqId", reqId);
            param.put("authFlowStage", ResultSmsAuthDto.STAGE_AUTH_PASSED);
            if (smsManageRepository.updateSmsAuthManage(param) >= -1) {
                resultSmsAuthDto.setAuthFlowStage(ResultSmsAuthDto.STAGE_AUTH_PASSED);
                resultSmsAuthDto.setResult(RsResultDto.RESULT_SUCCESS);
                if (smsManageRepository.updateLastLoginTime(param) > 0) {
                	sessionManage.updateSecondAuthStatus(UserDto.AUTH_PASSED_STATUS, request, response);
                }
                resultSmsAuthDto.setUserInfo(sessionManage.getUserByContextRepository(request, response));
            } else {
                // SMS 인증 실패 시 session expire 추가
                sessionManage.expireAuthorization(request, response);
                resultSmsAuthDto.setResult(RsResultDto.RESULT_FAIL);
            }
        } else {
            // SMS 인증 실패 시 session expire 추가
            sessionManage.expireAuthorization(request, response);
            resultSmsAuthDto.setResult(RsResultDto.RESULT_FAIL);
        }
        return resultSmsAuthDto;
    }

    public String generationAuthenticationCode() {
        String code = "";
        double d = 0;
        while (d < 0.1) {
            d = Math.random();
            code = Integer.toString((int) (d * 1000000));
        }
        return code;
    }
    
    @Override
    @SuppressWarnings("null")
    public int sendSms(String min, StringBuilder message) {
    	int ret = RsResultDto.RESULT_NONE;
    	
    	try {
    		String ip = env.getProperty("sms.server.ip");
        	int port = Integer.parseInt(env.getProperty("sms.server.port").toString());
        	String system = env.getProperty("sms.msg.title");
        	String sourceMin = env.getProperty("sms.msg.min");
        	
        	DatagramSocket socket = new DatagramSocket();
			SocketAddress address = new InetSocketAddress(ip, port);
			socket.connect(address);
        	
			byte[] data = new byte[404];
		    for (int i = 0; i < data.length; i++)
		      data[i] = 0x00;
		    byte[] bmin = min.getBytes("utf-8");
		    byte[] bsmin = sourceMin.getBytes("utf-8");
		    byte[] bsys = system.getBytes("utf-8");
		    byte[] bkind = "기타".getBytes("ksc5601");
		    byte[] btype = "기타".getBytes("ksc5601");
		    byte[] bmsg = message.toString().getBytes("ksc5601");

		    System.arraycopy(bmin, 0, data, 0, bmin.length);
		    System.arraycopy(bsmin, 0, data, 12, bsmin.length);
		    System.arraycopy(bsys, 0, data, 24, bsys.length);
		    System.arraycopy(bkind, 0, data, 124, bkind.length);
		    System.arraycopy(btype, 0, data, 164, btype.length);
		    System.arraycopy(bmsg, 0, data, 204, bmsg.length);
		    
			DatagramPacket packet = new DatagramPacket(data, data.length);
			socket.send(packet);
			socket.close();
			
			ret = RsResultDto.RESULT_SUCCESS;
			
			Cutil.sleep(1000);
		} catch (Exception e) {
			
			ret = RsResultDto.RESULT_FAIL;
			throw new RsRuntimeException("error.common.globalException");
		}
    	return ret;
    }
}
