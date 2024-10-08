package com.mobigen.cdev.poc.module.login.service;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.security.dto.ExceptionSecondCertiDto;
import com.mobigen.cdev.poc.core.security.dto.ResultSmsAuthDto;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.core.security.manage.session.SessionManage;
import com.mobigen.cdev.poc.core.security.manage.sms.repository.SmsManageRepository;
import com.mobigen.cdev.poc.core.security.util.rsa.RSAKeySet;
import com.mobigen.cdev.poc.core.security.util.rsa.RSAUtil;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.repository.mybatis.CommonRepository;
import com.mobigen.cdev.poc.module.login.dto.LoginResultDto;
import com.mobigen.cdev.poc.module.login.polish.LoginPolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class LoginServiceImpl implements LoginService {
    private final SessionManage sessionManage;
    private final SmsManageRepository smsManageRepository;
    private final CommonRepository commonRepository;
    private final MessageSourceAccessor messageSourceAccessor;

    private final LoginPolicy loginPolicy;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public LoginServiceImpl(SessionManage sessionManage, SmsManageRepository smsManageRepository, CommonRepository commonRepository, LoginPolicy loginPolicy, MessageSourceAccessor messageSourceAccessor) {
        this.sessionManage = sessionManage;
        this.smsManageRepository = smsManageRepository;
        this.commonRepository = commonRepository;
        this.loginPolicy = loginPolicy;
        this.messageSourceAccessor = messageSourceAccessor;
    }

    @Override
    public LoginResultDto loginAuth(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        LoginResultDto resultDto = new LoginResultDto();
        param.put("checkUserPassYn", "N");
        UserInfoDto userInfoDto = userDbAuthentication(param);

        if (userInfoDto.getUser_id() == null) {
            // USER_ID, PW DB AUTH FAIL
            resultDto.setResult(RsResultDto.RESULT_FAIL);
        } else {
            // USER_ID, PW DB AUTH SUCCESS
            if (sessionManage.authentication(userInfoDto, request, response)) {
                // SPRING SECURITY AUTHENTICATION SUCCESS
                resultDto.setResult(RsResultDto.RESULT_SUCCESS);
            } else {
                // SPRING SECURITY AUTHENTICATION FAIL
                resultDto.setResult(RsResultDto.RESULT_FAIL);
            }
        }
        /*
        if (resultDto.getResult() == RsResultDto.RESULT_FAIL) {
            throw new RsRuntimeException("message.login.fail");
        }
         */

        resultDto.setUserInfoDto(userInfoDto);
        return resultDto;
    }

    @Override
    public boolean isAuthoritySession(HttpServletRequest request, HttpServletResponse response) {
        return sessionManage.isAuthorizated(request, response);
    }

    @Override
    public UserDto getUserFromSession(HttpServletRequest request, HttpServletResponse response) {
         return sessionManage.getUserByContextRepository(request, response);
    }

    @Override
    public UserDto getUserByContextRepository(HttpServletRequest request, HttpServletResponse response) {
        return sessionManage.getUserByContextRepository(request, response);
    }

    @Override
    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        sessionManage.expireAuthorization(request,response);
    }

    @Override
    public UserDto getUserDbAuthentication(Map<String, Object> param) {
        return userDbAuthentication(param);
    }

    private UserInfoDto userDbAuthentication(Map<String, Object> param) {
        UserInfoDto ret = new UserInfoDto();
        if (param.get("checkUserPassYn") == null) {
        	param.put("checkUserPassYn", "Y");
        }
        List<UserInfoDto> userInfoDtos = commonRepository.getUserList(param);
        if (userInfoDtos.size() == 1) {
            ret = userInfoDtos.get(0);
            List<GrantedAuthority> grantedAuthority = new ArrayList<>();
            // grantedAuthority.add(new SimpleGrantedAuthority(UserGrade.LV1.toString()));
            ret.setAuthorities(grantedAuthority);
        }
        return ret;
    }

    @Override
    public Map<String, Object> getRsaKeyset(HttpServletRequest request, HttpServletResponse response) {
        RSAKeySet keySet = RSAUtil.generatePrivateKey();
        HttpSession session = request.getSession();

        session.removeAttribute(RSAUtil.RSA_KEY);
        session.setAttribute(RSAUtil.RSA_KEY, keySet.getPrivateKey());

        Map<String, Object> ret = new HashMap<>();
        ret.put(RSAUtil.RSA_MODULUS, keySet.getPublicKeyModules());
        ret.put(RSAUtil.RSA_EXPONENT, keySet.getPublicKeyExponent());

        return ret;
    }

    @Override
    public LoginResultDto loginProc(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        UserDto userDto = loginPolicy.authentication(param, request, response);
        LoginResultDto resultDto = new LoginResultDto();

        if (userDto.getUser_id() == null) {
            // USER_ID, PW DB AUTH FAIL
            resultDto.setResult(RsResultDto.RESULT_FAIL);
            resultDto.setAuthFailMsg(messageSourceAccessor.getMessage("message.login.fail"));
        } else {
            // USER_ID, PW DB AUTH SUCCESS
        	userDto.setFirstAuthenticationStatus(UserDto.AUTH_PASSED_STATUS);
            if (sessionManage.authentication(userDto, request, response)) {
                // SPRING SECURITY AUTHENTICATION SUCCESS
                resultDto.setResult(RsResultDto.RESULT_SUCCESS);
                // CHEKC EXCEPTION SECOND CERTIFICATION
                ExceptionSecondCertiDto exceptSndCertiDto = smsManageRepository.getAllowExceptionSecondCerti(param);
                if (ExceptionSecondCertiDto.IS_ALLOW.equals(exceptSndCertiDto.getAllow_exception())) {
                    resultDto.setAuthFlowStage(ResultSmsAuthDto.STAGE_AUTH_PASSED);
                    resultDto.setDefaultMenuInfo(commonRepository.getDefaultMenuInfo(param));
                    sessionManage.updateSecondAuthStatus(UserDto.AUTH_PASSED_STATUS, request, response);
                    resultDto.setUserInfo(sessionManage.getUserByContextRepository(request, response));
                }
            } else {
                // SPRING SECURITY AUTHENTICATION FAIL
                resultDto.setResult(RsResultDto.RESULT_FAIL);
                resultDto.setAuthFailMsg(messageSourceAccessor.getMessage("message.login.fail.none.auth"));
            }
        }

        return resultDto;
    }
}
