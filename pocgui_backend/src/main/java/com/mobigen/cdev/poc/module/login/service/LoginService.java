package com.mobigen.cdev.poc.module.login.service;

import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.module.login.dto.LoginResultDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface LoginService {
    /*UserDto loginAuthentication(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    boolean isAuthentication(HttpServletRequest request, HttpServletResponse response);
    UserDto getUserFromSession(HttpServletRequest request, HttpServletResponse response);*/




    LoginResultDto loginAuth(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    boolean isAuthoritySession(HttpServletRequest request, HttpServletResponse response);
    UserDto getUserFromSession(HttpServletRequest request, HttpServletResponse response);
    UserDto getUserByContextRepository(HttpServletRequest request, HttpServletResponse response);
    UserDto getUserDbAuthentication(Map<String, Object> param);
    void logOut(HttpServletRequest request, HttpServletResponse response);

    LoginResultDto loginProc(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    Map<String, Object> getRsaKeyset(HttpServletRequest request, HttpServletResponse response);
}
