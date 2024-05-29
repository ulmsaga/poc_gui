package com.mobigen.cdev.poc.module.nw.repository.mybatis;

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
}
