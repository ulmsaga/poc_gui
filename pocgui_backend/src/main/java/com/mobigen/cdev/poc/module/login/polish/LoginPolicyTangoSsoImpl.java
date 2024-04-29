package com.mobigen.cdev.poc.module.login.polish;

import java.security.PrivateKey;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.core.security.util.tangosso.TangoSSO;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.core.util.common.Cutil;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.repository.mybatis.CommonRepository;
import com.mobigen.cdev.poc.core.security.util.rsa.RSAUtil;

@Component
public class LoginPolicyTangoSsoImpl implements LoginPolicy {
	
	private final CommonRepository commonRepository;
	private final TangoSSO tangoSSO;
	
	@Autowired
	public LoginPolicyTangoSsoImpl(CommonRepository commonRepository, TangoSSO tangoSSO) {
		this.commonRepository = commonRepository;
		this.tangoSSO = tangoSSO;
	}
	
  @SuppressWarnings("unchecked")
	@Override
	@EnvStatus
	public UserDto authentication(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
		
		UserDto userDto = new UserDto();
		
		String userId = param.get("userId").toString();
		String userPwd = param.get("userPwd").toString();
		String userPwdEx = param.get("userPwdEx").toString();
		
		String resourceFailMessage = "message.login.fail";
					
		try {
			String envStatus = param.get("envStatus").toString();
			String loginUserStatus = "";
			if (Cutil.PROFILE_LOCAL.equals(envStatus) || Cutil.PROFILE_DEVELOP.equals(envStatus) || Cutil.PROFILE_STAGING.equals(envStatus) || Cutil.PROFILE_PRODUCTION.equals(envStatus)) {
				// BEFORE 150 IP NET
				HttpSession session = request.getSession();
				PrivateKey privateKey = RSAUtil.getPrivateKeyAtSession(session);
				RSAUtil.removePrivateKeyAsSession(session);
				String decUserPwdEx = RSAUtil.descryptRSA(privateKey, userPwdEx);
				param.put("checkUserPassByPhoneLastNum", "Y");
				param.put("userPwdEx", decUserPwdEx);
				userDto = userDbAuthentication(param);
			} else {
				Map<String, String> entyToken = new HashMap<String, String>();
				Map<String, String> enty = new HashMap<String, String>();
				
				entyToken = tangoSSO.login(TangoSSO.SYSTEM_ID, userId, userPwd, userPwdEx);
				enty = tangoSSO.certificateToken(TangoSSO.SYSTEM_ID, entyToken.get("tokenId"));
				
				if (enty == null) {
					loginUserStatus = String.valueOf(entyToken.get("loginUserStatus"));
					resourceFailMessage = tangoSSO.ErrorMsgResouce(Integer.parseInt(loginUserStatus));
					throw new RsRuntimeException(resourceFailMessage);
				} else {
					loginUserStatus = String.valueOf(entyToken.get("loginUserStatus"));
					if ("200".equals(loginUserStatus)) {
						param.put("checkUserPassByPhoneLastNum", "N");
						userDto = userDbAuthentication(param);
					} else {
						String ssoFailMsg = "";
						int ssoFailCode = Integer.parseInt(String.valueOf(entyToken.get("loginUserStatus")));
						if (ssoFailCode == -1000 || ssoFailCode == -1001 || ssoFailCode == -1011) {
							ssoFailMsg = "로그인 작업을 실패 하였습니다.";
						} else {
							ssoFailMsg = "아래 사유로 로그인 할 수 없습니다.<br>(" + tangoSSO.ErrorMsg(ssoFailCode) + ")";
							ssoFailMsg = ssoFailMsg + "<br>tango.sktelecom.com 에서 확인 하시기 바랍니다. ";
						}
						userDto.setAuthFailMsg(ssoFailMsg);
					}
				}
			}
			
		} catch (Exception e) {
			throw new RsRuntimeException(resourceFailMessage);
		}
		
		return userDto;
	}

	@Override
	public UserDto authenticationByToken(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
			return null;
	}
	
	private UserInfoDto userDbAuthentication(Map<String, Object> param) {
			UserInfoDto ret = new UserInfoDto();
			param.put("checkUserPassYn", "N");
			List<UserInfoDto> userList = commonRepository.getUserList(param);
			List<MenuInfoDto> menuList = commonRepository.getUserMenuInfoList(param);
			if (userList.size() == 1) {
					ret = userList.get(0);
					ret.setMenuList(menuList);
			}
			return ret;
	}
	
}
