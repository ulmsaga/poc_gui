package com.mobigen.cdev.poc.module.nw.process;

import com.google.common.collect.Maps;
import com.mobigen.cdev.poc.core.sse.emmiter.EventEmitter;
import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;
import com.mobigen.cdev.poc.module.nw.dto.NwAlarmResultDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwMonitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentMap;

@Component
public class NwAlarmDemon implements Runnable {

    private final NwMonitorRepository nwMonitorRepository;
    private final EventEmitter eventEmitter;

    private volatile String lastStatusTime = "";
    private volatile boolean isRun = false;

    private ConcurrentMap<String, NwAlarmResultDto> dataMap = Maps.newConcurrentMap();

    private int currentIdx = 0;
    private int saveMinCnt = 5;
    private Map<Integer, String> keyMap;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public NwAlarmDemon(NwMonitorRepository nwMonitorRepository, EventEmitter eventEmitter) {
        this.nwMonitorRepository = nwMonitorRepository;
        this.eventEmitter = eventEmitter;

        keyMap = Maps.newHashMap();
        for (int i=0;i<saveMinCnt;i++) {
            keyMap.put(i, "-");
        }
    }

    public boolean isRun() {
        return isRun;
    }

    public void setRun(boolean run) {
        isRun = run;
    }

    public String getCurrentStatusTime() {
        Map<String, Object> param = new HashMap<>();
        return nwMonitorRepository.getLastStatusTime(param);
    }

    private NwAlarmResultDto getNwAlarm(String monitorTime) {
        NwAlarmResultDto nwAlarmResultDto = new NwAlarmResultDto();
        Map<String, Object> param = new HashMap<>();
        param.put("monitorTime", monitorTime);
        nwAlarmResultDto.setAlarmList(nwMonitorRepository.getCurAlarm1M(param));
        nwAlarmResultDto.setMonitor_time(monitorTime);
        nwAlarmResultDto.setUseCache(true);

        List<NwAlarmResultDto> nwAlarmResultDtoList = new ArrayList<>();
        nwAlarmResultDtoList.add(nwAlarmResultDto);

        Map<String, List<?>> tmpDataMap = new HashMap<>();
        tmpDataMap.put(NwAlarmResultDto.SSE_TYPE_NW_ALARM, nwAlarmResultDtoList);
        eventEmitter.setLatestData(tmpDataMap);
        eventEmitter.sendData(nwAlarmResultDtoList, NwAlarmResultDto.SSE_TYPE_NW_ALARM);

        return nwAlarmResultDto;
    }

    private void removeLastData() {
        if (currentIdx >= saveMinCnt) {
            int removeIdx = currentIdx % saveMinCnt;
            currentIdx = removeIdx + saveMinCnt;

            String key = keyMap.get(removeIdx);
            dataMap.remove(key);
            keyMap.remove(removeIdx);
        }
    }

    public NwAlarmResultDto getExistData(String monitorTime) {
        return dataMap.get(monitorTime);
    }

    // private int sendTestCnt = 0;

    /*
    private void sseSendTest(String monitorTime) {
        NwAlarmResultDto nwAlarmResultDto = getExistData(monitorTime);
        List<NwAlarmResultDto> nwAlarmResultDtoList = new ArrayList<>();
        nwAlarmResultDtoList.add(nwAlarmResultDto);
        eventEmitter.sendData(nwAlarmResultDtoList, NwAlarmResultDto.SSE_TYPE_NW_ALARM);
    }
    */

    public void destory() {
        isRun = false;
    }

    @Override
    public void run() {
        try {
            while (isRun) {
                String currentStatusTime = getCurrentStatusTime();

                // ---------------
                // TEST
                /*
                sendTestCnt++;
                if (sendTestCnt >= 5) {
                    sseSendTest(currentStatusTime);
                    sendTestCnt = 0;
                }
                */
                // TEST
                // ---------------

                if (lastStatusTime.equals(currentStatusTime)) {
                    Thread.currentThread().sleep(10000);
                    continue;
                }
                dataMap.put(currentStatusTime, getNwAlarm(currentStatusTime));
                keyMap.put(currentIdx++ & saveMinCnt, currentStatusTime);
                removeLastData();
                lastStatusTime = currentStatusTime;
            }
        } catch (Exception e) {
            isRun = false;
            e.printStackTrace();
        }
    }
}
