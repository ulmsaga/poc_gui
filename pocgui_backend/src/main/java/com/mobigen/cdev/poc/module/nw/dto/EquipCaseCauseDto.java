package com.mobigen.cdev.poc.module.nw.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class EquipCaseCauseDto extends BaseObject {
    private String std_name;
    private String std_value;
    private String cause_cnt;

    public String getStd_name() {
        return std_name;
    }

    public void setStd_name(String std_name) {
        this.std_name = std_name;
    }

    public String getStd_value() {
        return std_value;
    }

    public void setStd_value(String std_value) {
        this.std_value = std_value;
    }

    public String getCause_cnt() {
        return cause_cnt;
    }

    public void setCause_cnt(String cause_cnt) {
        this.cause_cnt = cause_cnt;
    }
}
