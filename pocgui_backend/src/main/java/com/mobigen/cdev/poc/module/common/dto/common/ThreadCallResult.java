package com.mobigen.cdev.poc.module.common.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

import java.util.List;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class ThreadCallResult extends BaseObject {
    private static final long serialVersionUID = 5371663198672109669L;
    private List<?> retList;
    private Object retObj;
    private String retMsg;
    private int retType;

    public List<?> getRetList() {
        return retList;
    }
    public void setRetList(List<?> retList) {
        this.retList = retList;
    }
    public Object getRetObj() {
        return retObj;
    }
    public void setRetObj(Object retObj) {
        this.retObj = retObj;
    }
    public String getRetMsg() {
        return retMsg;
    }
    public void setRetMsg(String retMsg) {
        this.retMsg = retMsg;
    }
    public int getRetType() {
        return retType;
    }
    public void setRetType(int retType) {
        this.retType = retType;
    }
}
