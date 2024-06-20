package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;
import com.mobigen.cdev.poc.module.nw.dto.NwAlarmResultDto;

import java.util.List;
import java.util.Map;

public interface NwMonitorService {
    String getLastStatusTime(Map<String, Object> param);
    List<NwAlarmDto> getCurAlarm1M(Map<String, Object> param);
    NwAlarmResultDto getNwAlarm1M(Map<String, Object> param);
}
