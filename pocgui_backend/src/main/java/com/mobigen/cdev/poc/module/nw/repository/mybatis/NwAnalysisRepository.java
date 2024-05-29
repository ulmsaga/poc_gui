package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.module.nw.dto.RootCauseForPivotDto;

import java.util.List;
import java.util.Map;

public interface NwAnalysisRepository {
    List<RootCauseForPivotDto> getKpiAnalysisRootCause(Map<String, Object> param);
    List<?> getKpiAnalysis(Map<String, Object> param);
}
