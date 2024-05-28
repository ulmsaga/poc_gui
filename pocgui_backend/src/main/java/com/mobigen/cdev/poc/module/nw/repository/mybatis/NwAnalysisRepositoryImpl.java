package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class NwAnalysisRepositoryImpl implements NwAnalysisRepository {

    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mysql.module.nw.analysis";
    public NwAnalysisRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }



}
