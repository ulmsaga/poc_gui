package com.mobigen.cdev.poc.module.common.dto.user;

import java.util.List;

import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;

public class UserInfoDto extends UserDto {
	private static final long serialVersionUID = 6561182453609629139L;

	private String use_yn;
	private String pass_changedate;
	private String last_edit_time;
	private String last_login_time;
	private String update_time;
	private String update_user;


	private List<UserRoleDto> userRoleList;

	private List<MenuInfoDto> menuList;

	public String getUse_yn() {
		return use_yn;
	}
	public void setUse_yn(String use_yn) {
		this.use_yn = use_yn;
	}
	public String getPass_changedate() {
		return pass_changedate;
	}
	public void setPass_changedate(String pass_changedate) {
		this.pass_changedate = pass_changedate;
	}
	public String getLast_edit_time() {
		return last_edit_time;
	}
	public void setLast_edit_time(String last_edit_time) {
		this.last_edit_time = last_edit_time;
	}
	public String getLast_login_time() {
		return last_login_time;
	}
	public void setLast_login_time(String last_login_time) {
		this.last_login_time = last_login_time;
	}
	public String getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(String update_time) {
		this.update_time = update_time;
	}
	public String getUpdate_user() {
		return update_user;
	}
	public void setUpdate_user(String update_user) {
		this.update_user = update_user;
	}
	public List<MenuInfoDto> getMenuList() {
		return menuList;
	}
	public void setMenuList(List<MenuInfoDto> menuList) {
		this.menuList = menuList;
	}

	public List<UserRoleDto> getUserRoleList() {
		return userRoleList;
	}

	public void setUserRoleList(List<UserRoleDto> userRoleList) {
		this.userRoleList = userRoleList;
	}
}
