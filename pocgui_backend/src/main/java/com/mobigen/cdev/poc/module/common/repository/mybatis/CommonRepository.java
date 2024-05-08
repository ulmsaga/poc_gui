package com.mobigen.cdev.poc.module.common.repository.mybatis;

import java.util.List;
import java.util.Map;

import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.module.common.dto.common.CondValueTextDto;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserRoleDto;

public interface CommonRepository {
    // USER
    List<UserInfoDto> getUserList(Map<String, Object> param);
    void getUserListExcel(Map<String, Object> param, ExcelDefaultExceptionHandler resulHandler);
    List<UserInfoDto> getUserCollectList(Map<String, Object> param);
    List<UserInfoDto> getUserPemdb1List(Map<String, Object> param);
    List<MenuInfoDto> getUserMenuInfoList(Map<String, Object> param);

    // MENU
    MenuInfoDto getDefaultMenuInfo(Map<String, Object> param);
    List<MenuInfoDto> getMenuInfoList(Map<String, Object> param);

    List<UserRoleDto> getUserRoleList(Map<String, Object> param);
}
