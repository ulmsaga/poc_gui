package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.nw.dto.KpiAnalysisResultDto;

import java.util.Map;

public interface NwAnalysisService {
    KpiAnalysisResultDto getKpiAnalysis(Map<String, Object> param);
}
