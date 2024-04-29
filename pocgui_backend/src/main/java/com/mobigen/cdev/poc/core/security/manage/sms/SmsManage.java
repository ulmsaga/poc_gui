package com.mobigen.cdev.poc.core.security.manage.sms;

import com.mobigen.cdev.poc.core.security.dto.ResultSmsAuthDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

public interface SmsManage {

    ResultSmsAuthDto sendSmsAuthenticationCode(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    ResultSmsAuthDto verifyAuthenticationCode(Map<String, Object> param, HttpServletRequest request, HttpServletResponse response);
    int sendSms(String min, StringBuilder message);
}
