package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.module.common.dto.common.TrendChartDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseDto;
import com.mobigen.cdev.poc.module.nw.dto.RootCauseForPivotDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class NwAnalysisRepositoryImpl implements NwAnalysisRepository {

    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mysql.module.nw.analysis";
    public NwAnalysisRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }

    @Override
    public List<RootCauseForPivotDto> getKpiAnalysisRootCause(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getKpiAnalysisRootCause", param);
    }

    @Override
    public List<?> getKpiAnalysis(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getKpiAnalysis", param);
    }

    @Override
    public void getKpiAnalysisExcel(Map<String, Object> param, ExcelDefaultExceptionHandler rh) {
        sqlSessionTemplatePemdb1.select(namespace + ".getKpiAnalysisExcel", param, rh);
    }

    @Override
    public List<EquipCaseCauseDto> getKpiAnalysisEquipCauseCnt(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getKpiAnalysisEquipCauseCnt", param);
    }

    @Override
    public List<TrendChartDto> getTrendKpiAndCauseAnalysis(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getTrendKpiAndCauseAnalysis", param);
    }
}
