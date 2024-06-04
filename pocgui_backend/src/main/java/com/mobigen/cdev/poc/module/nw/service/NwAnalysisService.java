package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.module.common.dto.common.TrendChartDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseResultDto;
import com.mobigen.cdev.poc.module.nw.dto.KpiAnalysisResultDto;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public interface NwAnalysisService {
    KpiAnalysisResultDto getKpiAnalysis(Map<String, Object> param);

    EquipCaseCauseResultDto getKpiAnalysisEquipCauseCnt(Map<String, Object> param);

    List<TrendChartDto> getTrendKpiAndCauseAnalysis(Map<String, Object> param);
}
