package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwMonitorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class NwMonitorServiceImpl implements NwMonitorService {
    private final NwMonitorRepository nwMonitorRepository;
    public NwMonitorServiceImpl(NwMonitorRepository nwMonitorRepository) {
        this.nwMonitorRepository = nwMonitorRepository;
    }

    @Override
    public String getLastStatusTime(Map<String, Object> param) {
        return nwMonitorRepository.getLastStatusTime(param);
    }

    @Override
    public List<NwAlarmDto> getCurAlarm1M(Map<String, Object> param) {
        return nwMonitorRepository.getCurAlarm1M(param);
    }
}
