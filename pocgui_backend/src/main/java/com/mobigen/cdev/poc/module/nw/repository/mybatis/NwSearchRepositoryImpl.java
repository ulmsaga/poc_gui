package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.module.nw.dto.SignalXdrDto;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class NwSearchRepositoryImpl implements NwSearchRepository {

    private final SqlSessionTemplate sqlSessionTemplatePemdb1;
    private final String namespace = "com.mobigen.cdev.mapper.mysql.module.nw.search";

    public NwSearchRepositoryImpl(SqlSessionTemplate sqlSessionTemplatePemdb1) {
        this.sqlSessionTemplatePemdb1 = sqlSessionTemplatePemdb1;
    }

    @Override
    public List<SignalXdrDto> getSignalCallLogXdr(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getSignalCallLogXdr", param);
    }

    @Override
    public List<FileDto> getPaketTargetFile(Map<String, Object> param) {
        return sqlSessionTemplatePemdb1.selectList(namespace + ".getPaketTargetFile", param);
    }
}
