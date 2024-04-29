package com.mobigen.cdev.poc.core.security.manage.session;

import com.mobigen.cdev.poc.core.security.dto.UserDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface SessionManage {
    boolean authentication (UserDto userDto, HttpServletRequest request, HttpServletResponse response);
    boolean isAuthorizated (HttpServletRequest request, HttpServletResponse response);
    boolean isFullAuthentication (HttpServletRequest request, HttpServletResponse response);
    UserDto getUserByContextRepository (HttpServletRequest request, HttpServletResponse response);
    void expireAuthorization (HttpServletRequest request, HttpServletResponse response);
    int updateFirstAuthStatus(int firstAuthenticationStatus, HttpServletRequest request, HttpServletResponse response);
    int updateSecondAuthStatus(int secondaryAuthenticationStatus, HttpServletRequest request, HttpServletResponse response);
    int updateUserInfo(UserDto userDto, HttpServletRequest request, HttpServletResponse response);
}
