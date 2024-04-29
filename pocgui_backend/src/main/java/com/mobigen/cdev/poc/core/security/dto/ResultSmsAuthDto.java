package com.mobigen.cdev.poc.core.security.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;
import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.module.common.dto.menu.MenuInfoDto;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class ResultSmsAuthDto extends BaseObject {

    private static final long serialVersionUID = -2156857667031292834L;
    public static final String STAGE_STAND_BY = "0";
    public static final String STAGE_SEND_SMS = "1";
    public static final String STAGE_AUTH_PASSED = "2";

    private int result = RsResultDto.RESULT_NONE;
    private String authFlowStage = STAGE_STAND_BY;

    private String resultMsg;

    private String smsCode;
    private UserDto userInfo;
    private MenuInfoDto defaultMenuInfo;

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        if (result == RsResultDto.RESULT_FAIL) {
            this.resultMsg = "인증에 실패 하였습니다.";
        } else if (result == RsResultDto.RESULT_SUCCESS) {
            this.resultMsg = "인증에 성공 하였습니다.";
        }
        this.result = result;
    }

    public String getAuthFlowStage() {
        return authFlowStage;
    }

    public void setAuthFlowStage(String authFlowStage) {
        if (STAGE_AUTH_PASSED.equals(authFlowStage)) {
            this.result = RsResultDto.RESULT_SUCCESS;
        }
        this.authFlowStage = authFlowStage;
    }

    public String getSmsCode() {
        return smsCode;
    }

    public ResultSmsAuthDto setSmsCode(String smsCode) {
        this.smsCode = smsCode;
        return this;
    }

    public String getResultMsg() {
        return resultMsg;
    }

    public ResultSmsAuthDto setResultMsg(String resultMsg) {
        this.resultMsg = resultMsg;
        return this;
    }

	public UserDto getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(UserDto userInfo) {
		this.userInfo = userInfo;
	}

    public MenuInfoDto getDefaultMenuInfo() {
        return defaultMenuInfo;
    }

    public void setDefaultMenuInfo(MenuInfoDto defaultMenuInfo) {
        this.defaultMenuInfo = defaultMenuInfo;
    }
}
