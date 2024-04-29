package com.mobigen.cdev.poc.core.base.dto;

import org.springframework.dao.DataAccessException;

import java.io.Serializable;
import java.sql.SQLException;

public class RsResultDto implements Serializable {
    private static final long serialVersionUID = -7008658522494815049L;

    public static final int RESULT_SUCCESS = 1;
    public static final int RESULT_NONE = 0;
    public static final int RESULT_FAIL = -1;

    private int result = RESULT_FAIL;
    private String errorCause = "";
    private String messageKey = "";
    private String errorMessage = "";

    private Object rs = null;

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public String getErrorCause() {
        return errorCause;
    }
    public void setErrorCause(String errorCause) {
        this.errorCause = errorCause;
        this.result = RESULT_FAIL;
    }
    public void setErrorCause(Exception e) {
        if (e instanceof DataAccessException) {
            this.errorCause = ((SQLException) e.getCause().getCause()).getMessage();
        } else {
            this.errorCause = e.getMessage();
        }
        this.result = RESULT_FAIL;
    }

    public String getMessageKey() {
        return messageKey;
    }

    public void setMessageKey(String messageKey) {
        this.messageKey = messageKey;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
        this.result = RESULT_FAIL;
    }

    public Object getRs() {
        return rs;
    }

    public void setRs(Object rs) {
        this.rs = rs;
        this.result = RESULT_SUCCESS;
    }
}
