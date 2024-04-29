package com.mobigen.cdev.poc.module.common.service;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.dto.ExcelDto;
import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.core.security.annotation.LoginUser;
import com.mobigen.cdev.poc.core.security.manage.session.SessionManage;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserMapper;
import com.mobigen.cdev.poc.module.common.entity.pemdb1.CmUserEntity;
import com.mobigen.cdev.poc.module.common.repository.jpa.pemdb1.CmUserRepository;
import com.mobigen.cdev.poc.module.common.repository.mybatis.CommonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService {

    private final CommonRepository commonRepository;
    private final CmUserRepository cmUserRepository;
	private final SessionManage sessionManage;

   	@SuppressWarnings("unused")
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    public CommonServiceImpl(CommonRepository commonRepository, CmUserRepository cmUserRepository, SessionManage sessionManage) {
        this.commonRepository = commonRepository;
        this.cmUserRepository = cmUserRepository;
		this.sessionManage = sessionManage;
    }

    @Override
    public List<UserInfoDto> getUserList(Map<String, Object> param) {
        param.put("checkUserPassYn", "N");
        return commonRepository.getUserList(param);
    }

    @Override
    public ExcelDto getUserListExcel(Map<String, Object> param) {
        ExcelDto excelDto = new ExcelDto();

        try {
            ExcelDefaultExceptionHandler resultHandler = new ExcelDefaultExceptionHandler(param);
            commonRepository.getUserListExcel(param, resultHandler);

            if("".equals(String.valueOf(param.get("sheetName")))) param.put("sheetName", "sheet1");
            if("".equals(String.valueOf(param.get("fileName")))) param.put("fileName", param.get("sheetName"));
            if("".equals(String.valueOf(param.get("fileExt")))) param.put("fileExt", "xlsx");

            excelDto.setFile_ext(String.valueOf(param.get("fileExt")));
            excelDto.setFile_name(String.valueOf(param.get("fileName")));
            excelDto.setTarget_path_key(ExcelDto.FILE_PATH_CREATE_EXCEL);
      			excelDto.setTarget_file(resultHandler.execute());
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }

        return excelDto;
    }

    @Override
    public List<UserInfoDto> getAllUserList() {
        List<UserInfoDto> ret = new ArrayList<>();
        List<CmUserEntity> entityList = cmUserRepository.findAll();
        for (CmUserEntity ent: entityList) {
            UserInfoDto userInfoDto = UserMapper.INSTANCE.userEntityToUserDto(ent);
            ret.add(userInfoDto);
        }

        return ret;
    }

  @Override
	public List<UserInfoDto> getUserPemdb1List(Map<String, Object> param) {
    	param.put("checkUserPassYn", "N");
      return commonRepository.getUserPemdb1List(param);
	}

	@Override
	@EnvStatus
	public void setParamEnvStatus(Map<String, Object> param) {}
	
	@Override
	@EnvStatus
	@LoginUser
	public List<MenuInfoDto> getUserMenuInfoList(Map<String, Object> param) {
		List<MenuInfoDto> ret = new ArrayList<MenuInfoDto>();
		List<MenuInfoDto> list = commonRepository.getUserMenuInfoList(param);
		ret = makeMenuInfoList(list, "00000000", false);
		return ret;
	}
	
	@SuppressWarnings("UnusedAssignment")
	private List<MenuInfoDto> makeMenuInfoList(List<MenuInfoDto> list, String pCode, boolean isSubMenu) {
		List<MenuInfoDto> menuList = new ArrayList<MenuInfoDto>();
		MenuInfoDto menuInfoDto = null;
		for (MenuInfoDto m : list) {
			if (pCode.equals(m.getMenu_pcode())) {
				if (!isSubMenu) {
					// MAIN MENU (ROOT)
					if (m.getMenu_code().equals(m.getMenu_pcode_next())) {
						menuInfoDto = new MenuInfoDto();
						
						menuInfoDto.setMenu_pcode(m.getMenu_pcode());
						menuInfoDto.setMenu_code(m.getMenu_code());
						menuInfoDto.setMenu_order(m.getMenu_order());
						menuInfoDto.setMenu_type(m.getMenu_type());
						menuInfoDto.setMenu_name(m.getMenu_name());
						menuInfoDto.setMenu_navigation(m.getMenu_navigation());
						menuInfoDto.setMenu_location(m.getMenu_location());
						menuInfoDto.setEnd_flag(m.getEnd_flag());

						//
						menuInfoDto.setDefault_menu_yn(m.getDefault_menu_yn());
						menuInfoDto.setModule_id(m.getModule_id());
						menuInfoDto.setModule_name(m.getModule_name());
						menuInfoDto.setModule_desc(m.getModule_desc());
						menuInfoDto.setRole_id(m.getRole_id());
						menuInfoDto.setRole_name(m.getRole_name());
						menuInfoDto.setRole_desc(m.getRole_desc());

						//
						menuInfoDto.setAllow_use_auth(m.getAllow_use_auth());
						menuInfoDto.setAllow_read_auth(m.getAllow_read_auth());
						menuInfoDto.setAllow_create_auth(m.getAllow_create_auth());
						menuInfoDto.setAllow_read_auth(m.getAllow_read_auth());
						menuInfoDto.setAllow_delete_auth(m.getAllow_delete_auth());
						menuInfoDto.setAllow_confirm_auth(m.getAllow_confirm_auth());

						//
						menuInfoDto.setAllow_func01_auth(m.getAllow_func01_auth());
						menuInfoDto.setAllow_func02_auth(m.getAllow_func02_auth());
						menuInfoDto.setAllow_func03_auth(m.getAllow_func03_auth());
						menuInfoDto.setAllow_func04_auth(m.getAllow_func04_auth());
						menuInfoDto.setAllow_func05_auth(m.getAllow_func05_auth());
						menuInfoDto.setAllow_func06_auth(m.getAllow_func06_auth());
						menuInfoDto.setAllow_func07_auth(m.getAllow_func07_auth());
						menuInfoDto.setAllow_func08_auth(m.getAllow_func08_auth());
						menuInfoDto.setAllow_func09_auth(m.getAllow_func09_auth());
						menuInfoDto.setAllow_func10_auth(m.getAllow_func10_auth());

						//
						menuInfoDto.setSubMenuList(makeMenuInfoList(list, m.getMenu_code(), true));

						menuList.add(menuInfoDto);
					}
				} else {
					// SUB MENU
					if (m.getMenu_code().equals(m.getMenu_pcode_next())) {
						menuInfoDto = new MenuInfoDto();
						
						menuInfoDto.setMenu_pcode(m.getMenu_pcode());
						menuInfoDto.setMenu_code(m.getMenu_code());
						menuInfoDto.setMenu_order(m.getMenu_order());
						menuInfoDto.setMenu_type(m.getMenu_type());
						menuInfoDto.setMenu_name(m.getMenu_name());
						menuInfoDto.setMenu_navigation(m.getMenu_navigation());
						menuInfoDto.setMenu_location(m.getMenu_location());
						menuInfoDto.setEnd_flag(m.getEnd_flag());

						//
						menuInfoDto.setDefault_menu_yn(m.getDefault_menu_yn());
						menuInfoDto.setModule_id(m.getModule_id());
						menuInfoDto.setModule_name(m.getModule_name());
						menuInfoDto.setModule_desc(m.getModule_desc());
						menuInfoDto.setRole_id(m.getRole_id());
						menuInfoDto.setRole_name(m.getRole_name());
						menuInfoDto.setRole_desc(m.getRole_desc());

						//
						menuInfoDto.setAllow_use_auth(m.getAllow_use_auth());
						menuInfoDto.setAllow_read_auth(m.getAllow_read_auth());
						menuInfoDto.setAllow_create_auth(m.getAllow_create_auth());
						menuInfoDto.setAllow_read_auth(m.getAllow_read_auth());
						menuInfoDto.setAllow_delete_auth(m.getAllow_delete_auth());
						menuInfoDto.setAllow_confirm_auth(m.getAllow_confirm_auth());

						//
						menuInfoDto.setAllow_func01_auth(m.getAllow_func01_auth());
						menuInfoDto.setAllow_func02_auth(m.getAllow_func02_auth());
						menuInfoDto.setAllow_func03_auth(m.getAllow_func03_auth());
						menuInfoDto.setAllow_func04_auth(m.getAllow_func04_auth());
						menuInfoDto.setAllow_func05_auth(m.getAllow_func05_auth());
						menuInfoDto.setAllow_func06_auth(m.getAllow_func06_auth());
						menuInfoDto.setAllow_func07_auth(m.getAllow_func07_auth());
						menuInfoDto.setAllow_func08_auth(m.getAllow_func08_auth());
						menuInfoDto.setAllow_func09_auth(m.getAllow_func09_auth());
						menuInfoDto.setAllow_func10_auth(m.getAllow_func10_auth());

						//
						menuInfoDto.setSubMenuList(makeMenuInfoList(list, m.getMenu_code(), true));

						menuList.add(menuInfoDto);
					} else {
						menuList.add(m);
					}
				}
			}
		}
		return menuList;
	}

	@Override
	public MenuInfoDto getDefaultMenuInfo(Map<String, Object> param) {
		return commonRepository.getDefaultMenuInfo(param);
	}

	@Override
	public List<MenuInfoDto> getMenuInfoList(Map<String, Object> param) {
		return commonRepository.getMenuInfoList(param);
	}

	@Override
	public boolean isAuthoritySession(HttpServletRequest request, HttpServletResponse response) {
		return sessionManage.isFullAuthentication(request, response);
	}

}
