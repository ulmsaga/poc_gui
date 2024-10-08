package com.mobigen.cdev.poc.core.security.manage.sms.repository;

import java.util.Map;

import com.mobigen.cdev.poc.core.security.dto.ExceptionSecondCertiDto;

public interface SmsManageRepository {
    String getSmsReqId(Map<String, Object> param);
    int insertSmsAuthManage(Map<String, Object> param);
    int updateSmsAuthManage(Map<String, Object> param);
    int updateLastLoginTime(Map<String, Object> param);
    ExceptionSecondCertiDto getAllowExceptionSecondCerti(Map<String, Object> param);
}
