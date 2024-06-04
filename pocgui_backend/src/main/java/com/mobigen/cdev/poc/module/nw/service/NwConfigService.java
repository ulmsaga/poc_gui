package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.common.dto.common.TrendChartDto;
import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.TreeNodeDto;

import java.util.List;
import java.util.Map;

public interface NwConfigService {
    List<EquipNodeDto> getMmeList(Map<String, Object> param);
    List<EnbNodeDto> getEnbList(Map<String, Object> param);

    List<TreeNodeDto> getMmeTreeList(Map<String, Object> param);
    List<TreeNodeDto> getEnbTreeList(Map<String, Object> param);

}
