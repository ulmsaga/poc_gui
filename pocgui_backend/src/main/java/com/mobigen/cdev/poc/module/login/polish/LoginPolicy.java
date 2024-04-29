package com.mobigen.cdev.poc.module.login.polish;

import com.mobigen.cdev.poc.core.security.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface LoginPolicy {
    // UserId, Pw를 통한 인증
    UserDto authentication(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    
    // 제공된 Token을 이용한 인증
    UserDto authenticationByToken(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
}
