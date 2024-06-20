package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;
import com.mobigen.cdev.poc.module.nw.dto.NwAlarmResultDto;
import com.mobigen.cdev.poc.module.nw.process.NwAlarmDemon;
import com.mobigen.cdev.poc.module.nw.process.NwAlarmDemonAwaken;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwMonitorRepository;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@Service
public class NwMonitorServiceImpl implements NwMonitorService {
    private final NwMonitorRepository nwMonitorRepository;
    private final NwAlarmDemon nwAlarmDemon;
    private final NwAlarmDemonAwaken nwAlarmDemonAwaken;
    private final Environment env;
    public NwMonitorServiceImpl(NwMonitorRepository nwMonitorRepository, NwAlarmDemon nwAlarmDemon, NwAlarmDemonAwaken nwAlarmDemonAwaken, Environment env) {
        this.nwMonitorRepository = nwMonitorRepository;
        this.nwAlarmDemon = nwAlarmDemon;
        this.nwAlarmDemonAwaken = nwAlarmDemonAwaken;
        this.env = env;
    }

    @PostConstruct
    public void initialize() {
        String envStatus = env.getProperty("spring.profiles.active");

        if ("none".equals(envStatus)) return;

        boolean isRun = nwAlarmDemon.isRun();
        if(!isRun){
            nwAlarmDemon.setRun(true);
            Thread demon = new Thread(nwAlarmDemon);
            boolean demonIsAlive = demon.isAlive();
            if(!demonIsAlive) demon.start();
        }
        isRun = nwAlarmDemonAwaken.isRun();
        if(!isRun){
            nwAlarmDemonAwaken.setRun(true);
            Thread awakenDemon = new Thread(nwAlarmDemonAwaken);
            boolean awakenDemonIsAlive = awakenDemon.isAlive();
            if(!awakenDemonIsAlive) awakenDemon.start();
        }
    }

    @Override
    public String getLastStatusTime(Map<String, Object> param) {
        return nwMonitorRepository.getLastStatusTime(param);
    }

    @Override
    public List<NwAlarmDto> getCurAlarm1M(Map<String, Object> param) {
        return nwMonitorRepository.getCurAlarm1M(param);
    }

    @Override
    public NwAlarmResultDto getNwAlarm1M(Map<String, Object> param) {
        // NwAlarmDemon에 적재되어 있으면 바로 보내고
        // 없으면 getCurAlarm1M -> DB Select

        String monitorTime = param.get("monitorTime").toString();
        NwAlarmResultDto nwAlarmResultDto = nwAlarmDemon.getExistData(monitorTime);
        if (nwAlarmResultDto == null) {
            nwAlarmResultDto = new NwAlarmResultDto();
            List<NwAlarmDto> nwAlarmDtoList = this.getCurAlarm1M(param);
            nwAlarmResultDto.setAlarmList(nwAlarmDtoList);
            nwAlarmResultDto.setMonitor_time(monitorTime);
            nwAlarmResultDto.setUseCache(false);
        }

        return nwAlarmResultDto;
    }
}
