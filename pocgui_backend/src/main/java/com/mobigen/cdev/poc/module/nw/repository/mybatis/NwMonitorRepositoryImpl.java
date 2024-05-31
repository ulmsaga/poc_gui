package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class NwMonitorRepositoryImpl implements NwMonitorRepository {

    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mysql.module.nw.monitor";
    public NwMonitorRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }

    @Override
    public String getLastStatusTime(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectOne(namespace + ".getLastStatusTime");
    }
}
