package com.mobigen.cdev.poc.core.security.manage.sms.repository;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.mobigen.cdev.poc.core.security.dto.ExceptionSecondCertiDto;

import java.util.Map;

@Repository
public class SmsManageRepositoryImpl implements SmsManageRepository{

    private final SqlSessionTemplate sqlSessionTemplateGuiweb;

    private final String namespace = "com.mobigen.cdev.mapper.mysql.core.security.manage";

    public SmsManageRepositoryImpl(SqlSessionTemplate sqlSessionTemplateGuiweb) {
        this.sqlSessionTemplateGuiweb = sqlSessionTemplateGuiweb;
    }

    @Override
    public String getSmsReqId(Map<String, Object> param) {
        return sqlSessionTemplateGuiweb.selectOne(namespace + ".getSmsReqId", param);
    }

    @Override
    public int insertSmsAuthManage(Map<String, Object> param) {
        return sqlSessionTemplateGuiweb.insert(namespace + ".insertSmsAuthManage", param);
    }

    @Override
    public int updateSmsAuthManage(Map<String, Object> param) {
        return sqlSessionTemplateGuiweb.update(namespace + ".updateSmsAuthManage", param);
    }
    
    @Override
    public int updateLastLoginTime(Map<String, Object> param) {
    	return sqlSessionTemplateGuiweb.update(namespace + ".updateLastLoginTime", param);
    }

    @Override
    public ExceptionSecondCertiDto getAllowExceptionSecondCerti(Map<String, Object> param) {
        return sqlSessionTemplateGuiweb.selectOne(namespace + ".getAllowExceptionSecondCerti", param);
    }
}
