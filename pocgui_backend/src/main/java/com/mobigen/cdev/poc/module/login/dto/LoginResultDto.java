package com.mobigen.cdev.poc.module.login.dto;

import com.mobigen.cdev.poc.core.security.dto.ResultSmsAuthDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;

public class LoginResultDto extends ResultSmsAuthDto {
    private UserInfoDto userInfoDto;
    private int result;
    private String authFailMsg;

    public UserInfoDto getUserInfoDto() {
        return userInfoDto;
    }

    public void setUserInfoDto(UserInfoDto userInfoDto) {
        this.userInfoDto = userInfoDto;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

	public String getAuthFailMsg() {
		return authFailMsg;
	}

	public void setAuthFailMsg(String authFailMsg) {
		this.authFailMsg = authFailMsg;
	}
    
}
