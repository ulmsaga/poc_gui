package com.mobigen.cdev.poc.module.login.polish;

import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.core.security.util.rsa.RSAUtil;
import com.mobigen.cdev.poc.core.security.util.sha.SHAUtil;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserRoleDto;
import com.mobigen.cdev.poc.module.common.repository.mybatis.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.security.PrivateKey;
import java.util.List;
import java.util.Map;

@Primary
@Component
public class LoginPolicyDefaultImpl implements LoginPolicy {
    private final CommonRepository commonRepository;
    
    @Autowired
    public LoginPolicyDefaultImpl(CommonRepository commonRepository) {
        this.commonRepository = commonRepository;
    }

    @Override
    public UserDto authentication(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        // RSA + SHA512
        HttpSession session = request.getSession();
        PrivateKey privateKey = RSAUtil.getPrivateKeyAtSession(session);
        RSAUtil.removePrivateKeyAsSession(session);

        if (privateKey == null || param.get("userId") == null || param.get("userPwdEx")  == null) {
            return null;
        }

        String userId = param.get("userId").toString();
        String userPwdEx = param.get("userPwdEx").toString();
        String decUserId = RSAUtil.descryptRSA(privateKey, userId);
        String decUserPwdEx = RSAUtil.descryptRSA(privateKey, userPwdEx);
        String sha512UserPwdEx = SHAUtil.sha512(decUserPwdEx);
        String sha512UserPwdExParam = param.get("userPwdExSha512").toString();

        if (sha512UserPwdEx.equals(sha512UserPwdExParam)) {
            System.out.println("true");
        }

        param.put("userId", decUserId);
        // param.put("userPwdEx", sha512UserPwdEx);
        param.put("userPwdEx", sha512UserPwdEx);
        param.put("checkUserPassByPhoneLastNum", "N");

        return userDbAuthentication(param);
    }

    @Override
    public UserDto authenticationByToken(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    private UserInfoDto userDbAuthentication(Map<String, Object> param) {
        UserInfoDto ret = new UserInfoDto();
        param.put("checkUserPassYn", "Y");
        List<UserInfoDto> userList = commonRepository.getUserList(param);
        List<MenuInfoDto> menuList = commonRepository.getUserMenuInfoList(param);
        List<UserRoleDto> userRoleList = commonRepository.getUserRoleList(param);
        if (userList.size() == 1) {
            ret = userList.get(0);
            ret.setMenuList(menuList);
            ret.setUserRoleList(userRoleList);
        }
        return ret;
    }
}
