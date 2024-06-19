package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.module.common.dto.common.TrendChartDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseDto;
import com.mobigen.cdev.poc.module.nw.dto.RootCauseForPivotDto;

import java.util.List;
import java.util.Map;

public interface NwAnalysisRepository {
    List<RootCauseForPivotDto> getKpiAnalysisRootCause(Map<String, Object> param);
    List<?> getKpiAnalysis(Map<String, Object> param);

    void getKpiAnalysisExcel(Map<String, Object> param, ExcelDefaultExceptionHandler rh);
    List<EquipCaseCauseDto> getKpiAnalysisEquipCauseCnt(Map<String, Object> param);
    List<TrendChartDto> getTrendKpiAndCauseAnalysis(Map<String, Object> param);
}
