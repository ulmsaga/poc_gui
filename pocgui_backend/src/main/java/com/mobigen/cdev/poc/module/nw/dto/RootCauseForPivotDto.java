package com.mobigen.cdev.poc.module.nw.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class RootCauseForPivotDto extends BaseObject {
    private String cause;
    private String description;
    private String alias_cause;

    public String getCause() {
        return cause;
    }

    public void setCause(String cause) {
        this.cause = cause;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAlias_cause() {
        return alias_cause;
    }

    public void setAlias_cause(String alias_cause) {
        this.alias_cause = alias_cause;
    }
}
