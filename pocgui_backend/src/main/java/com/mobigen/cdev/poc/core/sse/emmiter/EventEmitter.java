package com.mobigen.cdev.poc.core.sse.emmiter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;

@Component
public class EventEmitter extends SseEmitter {

  private final List<SseEmitter> emitterList = new CopyOnWriteArrayList<>();
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private List<?> dataList = new CopyOnWriteArrayList<>();

  private Map<String, List<?>> latestData = new HashMap<>();

  public static final String DEFAULT_EVENT_NAME = NwAlarmResultDto.SSE_TYPE_NW_ALARM;

  public SseEmitter add(SseEmitter emitter) {
    this.emitterList.add(emitter);
    emitter.onCompletion(() -> {
      logger.debug("onCompletion emitter : {}", emitter.toString());
      this.emitterList.remove(emitter);
    });
    emitter.onTimeout(() -> {
      logger.debug("onTimeout emitter : {}", emitter.toString());
      emitter.complete();
    });
    return emitter;
  }

  public List<String> getEmitterList() {
    List<String> ret = new ArrayList<String>();
    emitterList.forEach(emitter -> {
      ret.add(emitter.toString());
    });
    return ret;
  }

  public void checkEmitterStatus() {
    emitterList.forEach(emitter -> {
      emitter.onCompletion(() -> {
        logger.debug("onCompletion emitter : {}", emitter.toString());
        this.emitterList.remove(emitter);
      });
      emitter.onTimeout(() -> {
        logger.debug("onTimeout emitter : {}", emitter.toString());
        emitter.complete();
      });
    });
  }

  public Map<String, List<?>> getLatestData() {
    return latestData;
  }

  public void setLatestData(Map<String, List<?>> latestData) {
    this.latestData = latestData;
  }

  public void sendData(List<?> dataList, String eventName) {
    this.dataList = dataList;
    emitterList.forEach(emitter -> {
      try {
        logger.debug("emitter : {}", emitter.toString());
        emitter.send(SseEmitter.event()
                .name(eventName)
                .data(this.dataList)
        );
      } catch (Exception e) {
        logger.debug("Exception : {}", e.toString());
      }
    });
  }

  public void connectAndSendExistData(SseEmitter emitter, String eventName) {
    try {
      logger.debug("emitter info : {}", emitter.toString());
      boolean existDataList = false;

      List<?> tmplist = latestData.get(eventName);
      if (tmplist != null) {
        if (tmplist.size() > 0) {
          existDataList = true;
        }
      }

      if (existDataList) {
        logger.debug("emitter.send existRetryList: {}", this.dataList.size());
        emitter.send(SseEmitter.event()
            .name(eventName)
            .data(tmplist));
      } else {
        logger.debug("emitter.send INIT: {}", "OK");
        emitter.send(SseEmitter.event()
            .name(eventName)
            .data(HttpStatus.OK));
      }
    } catch (IOException e) {
      throw new RsRuntimeException("error.common.rsRuntimeException", e);
    }
  }
  
}
