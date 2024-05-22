package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class NwConfigRepositoryImpl implements NwConfigRepository {

    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mariadb.module.nw.config";

    @Autowired
    public NwConfigRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }

    @Override
    public List<EquipNodeDto> getMmeList(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getMmeList", param);
    }

    @Override
    public List<EnbNodeDto> getEnbList(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getEnbList", param);
    }
}
