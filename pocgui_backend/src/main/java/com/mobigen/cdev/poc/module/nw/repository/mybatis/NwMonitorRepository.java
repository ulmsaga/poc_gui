package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import java.util.Map;

public interface NwMonitorRepository {
    String getLastStatusTime(Map<String, Object> param);
}
