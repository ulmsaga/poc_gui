package com.mobigen.cdev.poc.module.common.dto.menu;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

import java.util.List;

@JsonInclude(Include.ALWAYS)
public class MenuInfoDto extends BaseObject {
	private static final long serialVersionUID = 9060543592750137479L;
	
	private String menu_pcode;
	private String menu_code;
	
	private String menu_pcode_prev;
	private String menu_pcode_next;
	private String menu_code_prev;
	private String menu_code_next;
	
	private String menu_order;
	private String menu_type;
	private String menu_name;
	private String menu_navigation;
	private String menu_location;
	private String end_flag;
	private String use_yn;
	private String default_menu_yn;

	// Module
	private String module_id;
	private String module_name;
	private String module_desc;

	// Role
	private String role_id;
	private String role_name;
	private String role_desc;

	// AUTH
	private String allow_use_auth;
	private String allow_read_auth;
	private String allow_create_auth;
	private String allow_modify_auth;
	private String allow_delete_auth;
	private String allow_confirm_auth;
	private String allow_func01_auth;
	private String allow_func02_auth;
	private String allow_func03_auth;
	private String allow_func04_auth;
	private String allow_func05_auth;
	private String allow_func06_auth;
	private String allow_func07_auth;
	private String allow_func08_auth;
	private String allow_func09_auth;
	private String allow_func10_auth;

	private String update_time;
	private String update_user;

	private List<MenuInfoDto> subMenuList;

	public String getMenu_pcode() {
		return menu_pcode;
	}

	public MenuInfoDto setMenu_pcode(String menu_pcode) {
		this.menu_pcode = menu_pcode;
		return this;
	}

	public String getMenu_code() {
		return menu_code;
	}

	public MenuInfoDto setMenu_code(String menu_code) {
		this.menu_code = menu_code;
		return this;
	}

	public String getMenu_pcode_prev() {
		return menu_pcode_prev;
	}

	public MenuInfoDto setMenu_pcode_prev(String menu_pcode_prev) {
		this.menu_pcode_prev = menu_pcode_prev;
		return this;
	}

	public String getMenu_pcode_next() {
		return menu_pcode_next;
	}

	public MenuInfoDto setMenu_pcode_next(String menu_pcode_next) {
		this.menu_pcode_next = menu_pcode_next;
		return this;
	}

	public String getMenu_code_prev() {
		return menu_code_prev;
	}

	public MenuInfoDto setMenu_code_prev(String menu_code_prev) {
		this.menu_code_prev = menu_code_prev;
		return this;
	}

	public String getMenu_code_next() {
		return menu_code_next;
	}

	public MenuInfoDto setMenu_code_next(String menu_code_next) {
		this.menu_code_next = menu_code_next;
		return this;
	}

	public String getMenu_order() {
		return menu_order;
	}

	public MenuInfoDto setMenu_order(String menu_order) {
		this.menu_order = menu_order;
		return this;
	}

	public String getMenu_type() {
		return menu_type;
	}

	public MenuInfoDto setMenu_type(String menu_type) {
		this.menu_type = menu_type;
		return this;
	}

	public String getMenu_name() {
		return menu_name;
	}

	public MenuInfoDto setMenu_name(String menu_name) {
		this.menu_name = menu_name;
		return this;
	}

	public String getMenu_navigation() {
		return menu_navigation;
	}

	public MenuInfoDto setMenu_navigation(String menu_navigation) {
		this.menu_navigation = menu_navigation;
		return this;
	}

	public String getMenu_location() {
		return menu_location;
	}

	public MenuInfoDto setMenu_location(String menu_location) {
		this.menu_location = menu_location;
		return this;
	}

	public String getEnd_flag() {
		return end_flag;
	}

	public MenuInfoDto setEnd_flag(String end_flag) {
		this.end_flag = end_flag;
		return this;
	}

	public String getUse_yn() {
		return use_yn;
	}

	public MenuInfoDto setUse_yn(String use_yn) {
		this.use_yn = use_yn;
		return this;
	}

	public String getDefault_menu_yn() {
		return default_menu_yn;
	}

	public MenuInfoDto setDefault_menu_yn(String default_menu_yn) {
		this.default_menu_yn = default_menu_yn;
		return this;
	}

	public String getModule_id() {
		return module_id;
	}

	public MenuInfoDto setModule_id(String module_id) {
		this.module_id = module_id;
		return this;
	}

	public String getModule_name() {
		return module_name;
	}

	public MenuInfoDto setModule_name(String module_name) {
		this.module_name = module_name;
		return this;
	}

	public String getModule_desc() {
		return module_desc;
	}

	public MenuInfoDto setModule_desc(String module_desc) {
		this.module_desc = module_desc;
		return this;
	}

	public String getRole_id() {
		return role_id;
	}

	public MenuInfoDto setRole_id(String role_id) {
		this.role_id = role_id;
		return this;
	}

	public String getRole_name() {
		return role_name;
	}

	public MenuInfoDto setRole_name(String role_name) {
		this.role_name = role_name;
		return this;
	}

	public String getRole_desc() {
		return role_desc;
	}

	public MenuInfoDto setRole_desc(String role_desc) {
		this.role_desc = role_desc;
		return this;
	}

	public String getAllow_use_auth() {
		return allow_use_auth;
	}

	public MenuInfoDto setAllow_use_auth(String allow_use_auth) {
		this.allow_use_auth = allow_use_auth;
		return this;
	}

	public String getAllow_read_auth() {
		return allow_read_auth;
	}

	public MenuInfoDto setAllow_read_auth(String allow_read_auth) {
		this.allow_read_auth = allow_read_auth;
		return this;
	}

	public String getAllow_create_auth() {
		return allow_create_auth;
	}

	public MenuInfoDto setAllow_create_auth(String allow_create_auth) {
		this.allow_create_auth = allow_create_auth;
		return this;
	}

	public String getAllow_modify_auth() {
		return allow_modify_auth;
	}

	public MenuInfoDto setAllow_modify_auth(String allow_modify_auth) {
		this.allow_modify_auth = allow_modify_auth;
		return this;
	}

	public String getAllow_delete_auth() {
		return allow_delete_auth;
	}

	public MenuInfoDto setAllow_delete_auth(String allow_delete_auth) {
		this.allow_delete_auth = allow_delete_auth;
		return this;
	}

	public String getAllow_confirm_auth() {
		return allow_confirm_auth;
	}

	public MenuInfoDto setAllow_confirm_auth(String allow_confirm_auth) {
		this.allow_confirm_auth = allow_confirm_auth;
		return this;
	}

	public String getAllow_func01_auth() {
		return allow_func01_auth;
	}

	public MenuInfoDto setAllow_func01_auth(String allow_func01_auth) {
		this.allow_func01_auth = allow_func01_auth;
		return this;
	}

	public String getAllow_func02_auth() {
		return allow_func02_auth;
	}

	public MenuInfoDto setAllow_func02_auth(String allow_func02_auth) {
		this.allow_func02_auth = allow_func02_auth;
		return this;
	}

	public String getAllow_func03_auth() {
		return allow_func03_auth;
	}

	public MenuInfoDto setAllow_func03_auth(String allow_func03_auth) {
		this.allow_func03_auth = allow_func03_auth;
		return this;
	}

	public String getAllow_func04_auth() {
		return allow_func04_auth;
	}

	public MenuInfoDto setAllow_func04_auth(String allow_func04_auth) {
		this.allow_func04_auth = allow_func04_auth;
		return this;
	}

	public String getAllow_func05_auth() {
		return allow_func05_auth;
	}

	public MenuInfoDto setAllow_func05_auth(String allow_func05_auth) {
		this.allow_func05_auth = allow_func05_auth;
		return this;
	}

	public String getAllow_func06_auth() {
		return allow_func06_auth;
	}

	public MenuInfoDto setAllow_func06_auth(String allow_func06_auth) {
		this.allow_func06_auth = allow_func06_auth;
		return this;
	}

	public String getAllow_func07_auth() {
		return allow_func07_auth;
	}

	public MenuInfoDto setAllow_func07_auth(String allow_func07_auth) {
		this.allow_func07_auth = allow_func07_auth;
		return this;
	}

	public String getAllow_func08_auth() {
		return allow_func08_auth;
	}

	public MenuInfoDto setAllow_func08_auth(String allow_func08_auth) {
		this.allow_func08_auth = allow_func08_auth;
		return this;
	}

	public String getAllow_func09_auth() {
		return allow_func09_auth;
	}

	public MenuInfoDto setAllow_func09_auth(String allow_func09_auth) {
		this.allow_func09_auth = allow_func09_auth;
		return this;
	}

	public String getAllow_func10_auth() {
		return allow_func10_auth;
	}

	public MenuInfoDto setAllow_func10_auth(String allow_func10_auth) {
		this.allow_func10_auth = allow_func10_auth;
		return this;
	}

	public String getUpdate_time() {
		return update_time;
	}

	public MenuInfoDto setUpdate_time(String update_time) {
		this.update_time = update_time;
		return this;
	}

	public String getUpdate_user() {
		return update_user;
	}

	public MenuInfoDto setUpdate_user(String update_user) {
		this.update_user = update_user;
		return this;
	}

	public List<MenuInfoDto> getSubMenuList() {
		return subMenuList;
	}

	public MenuInfoDto setSubMenuList(List<MenuInfoDto> subMenuList) {
		this.subMenuList = subMenuList;
		return this;
	}
}
