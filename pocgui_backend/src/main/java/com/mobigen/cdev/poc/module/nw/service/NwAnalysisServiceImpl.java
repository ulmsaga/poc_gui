package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.security.annotation.LoginUser;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.core.util.common.Cutil;
import com.mobigen.cdev.poc.module.nw.dto.KpiAnalysisResultDto;
import com.mobigen.cdev.poc.module.nw.dto.RootCauseForPivotDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwAnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class NwAnalysisServiceImpl implements NwAnalysisService {

    private final NwAnalysisRepository nwAnalysisRepository;
    public NwAnalysisServiceImpl(NwAnalysisRepository nwAnalysisRepository) {
        this.nwAnalysisRepository = nwAnalysisRepository;
    }

    @Override
    public KpiAnalysisResultDto getKpiAnalysis(Map<String, Object> param) {
        KpiAnalysisResultDto ret = new KpiAnalysisResultDto();
        setKpiAnalysisParam(param);
        List<?> list = nwAnalysisRepository.getKpiAnalysis(param);
        ret.setList(list);
        ret.setCauseList((List<RootCauseForPivotDto>)param.get("causeList"));
        return ret;
    }

    @EnvStatus
    @LoginUser
    private void setKpiAnalysisParam(Map<String, Object> param) {
        String sPivotFields="";
        String sPivotTitles="";
        StringBuilder pivotFields=new StringBuilder();
        StringBuilder pivotTitles=new StringBuilder();
        List<String> pivotCauseList=new ArrayList<String>();

        List<RootCauseForPivotDto> causeList = nwAnalysisRepository.getKpiAnalysisRootCause(param);
        for (RootCauseForPivotDto dto: causeList) {
            pivotCauseList.add(dto.getCause());
        }
        param.put("pivotCauseList", pivotCauseList);
        param.put("causeList", causeList);
    }

    private Map<String, Object> setParamTableSuffix(Map<String, Object> param) {
        String timeCond = param.get("timeCond").toString();
        timeCond = Cutil.sqlInjectionFilter(timeCond);
        param.put("tableSuffix", timeCond);
        return param;
    }
}
