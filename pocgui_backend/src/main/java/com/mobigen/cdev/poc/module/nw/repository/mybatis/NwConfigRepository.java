package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;

import java.util.List;
import java.util.Map;

public interface NwConfigRepository {
    List<EquipNodeDto> getMmeList(Map<String, Object> param);
    List<EnbNodeDto> getEnbList(Map<String, Object> param);
}
