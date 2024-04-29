package com.mobigen.cdev.poc.module.common.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.cdev.poc.core.file.dto.ExcelDto;
import com.mobigen.cdev.poc.module.common.dto.common.CondValueTextDto;
import com.mobigen.cdev.poc.module.common.dto.common.CondsDto;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;

public interface CommonService {
    List<UserInfoDto> getUserList(Map<String, Object> param);
    ExcelDto getUserListExcel(Map<String, Object> param);
    List<UserInfoDto> getAllUserList();
    List<UserInfoDto> getUserPemdb1List(Map<String, Object> param);
    void setParamEnvStatus(Map<String, Object> param);
    List<MenuInfoDto> getUserMenuInfoList(Map<String, Object> parm);
    MenuInfoDto getDefaultMenuInfo(Map<String, Object> param);
    List<MenuInfoDto> getMenuInfoList(Map<String, Object> param);
    boolean isAuthoritySession(HttpServletRequest request, HttpServletResponse response);


}
