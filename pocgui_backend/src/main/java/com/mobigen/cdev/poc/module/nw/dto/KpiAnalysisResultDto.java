package com.mobigen.cdev.poc.module.nw.dto;

import java.util.List;

public class KpiAnalysisResultDto {
    private List<?> list;
    private List<RootCauseForPivotDto> causeList;

    public List<?> getList() {
        return list;
    }

    public void setList(List<?> list) {
        this.list = list;
    }

    public List<RootCauseForPivotDto> getCauseList() {
        return causeList;
    }

    public void setCauseList(List<RootCauseForPivotDto> causeList) {
        this.causeList = causeList;
    }
}
