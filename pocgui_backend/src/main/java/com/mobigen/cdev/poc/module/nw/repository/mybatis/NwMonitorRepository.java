package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;

import java.util.List;
import java.util.Map;

public interface NwMonitorRepository {
    String getLastStatusTime(Map<String, Object> param);
    List<NwAlarmDto> getCurAlarm1M(Map<String, Object> param);
}
