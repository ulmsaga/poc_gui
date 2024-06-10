package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.module.nw.dto.NwAlarmDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
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

    @Override
    public List<NwAlarmDto> getCurAlarm1M(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getCurAlarm1M", param);
    }
}
