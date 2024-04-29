package com.mobigen.cdev.poc.module.common.repository.mybatis;

import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class CommonRepositoryImpl implements CommonRepository {
    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mariadb.module.common";

    @Autowired
    public CommonRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }

    @Override
    public List<UserInfoDto> getUserList(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getUserList", param);
    }

    @Override
    public void getUserListExcel(Map<String, Object> param, ExcelDefaultExceptionHandler resultHandler) {
        sqlSessionTemplatePemdb1.select(namespace + ".getUserListExcel", param, resultHandler);
    }

    @Override
    public List<UserInfoDto> getUserCollectList(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getUserList", param);
    }

	@Override
	public List<UserInfoDto> getUserPemdb1List(Map<String, Object> param) {
		return sqlSessionTemplatePemdb1.selectList(namespace + ".getUserList", param);
	}
    
    @Override
    public List<MenuInfoDto> getUserMenuInfoList(Map<String, Object> param) {
    	return sqlSessionTemplatePemdb1.selectList(namespace + ".getUserMenuInfoList", param);
    }
    
    @Override
    public MenuInfoDto getDefaultMenuInfo(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectOne(namespace + ".getDefaultMenuInfo", param);
    }

    @Override
    public List<MenuInfoDto> getMenuInfoList(Map<String, Object> param) {
    	return sqlSessionTemplatePemdb1.selectList(namespace + ".getMenuInfoList", param);
    }
    

}
