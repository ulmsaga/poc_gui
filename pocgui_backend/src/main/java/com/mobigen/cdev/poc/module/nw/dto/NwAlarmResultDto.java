package com.mobigen.cdev.poc.module.nw.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

import java.util.List;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class NwAlarmResultDto extends BaseObject {
    private static final long serialVersionUID = 4700799663646027519L;
    private List<NwAlarmDto> alarmList;
    private String monitor_time;
    private boolean useCache = false;

    public static final String SSE_TYPE_NW_ALARM = "nwAlarmResultList";

    public List<NwAlarmDto> getAlarmList() {
        return alarmList;
    }

    public void setAlarmList(List<NwAlarmDto> alarmList) {
        this.alarmList = alarmList;
    }

    public String getMonitor_time() {
        return monitor_time;
    }

    public void setMonitor_time(String monitor_time) {
        this.monitor_time = monitor_time;
    }

    public boolean isUseCache() {
        return useCache;
    }

    public void setUseCache(boolean useCache) {
        this.useCache = useCache;
    }
}
