package com.mobigen.cdev.poc.module.nw.thread;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mobigen.cdev.poc.module.common.dto.common.ThreadCallResult;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwAnalysisRepository;

public class KpiAnalysisEquipCauseCntThread implements Callable<ThreadCallResult> {
    private NwAnalysisRepository nwAnalysisRepository;
    private Map<String, Object> param = new HashMap<String, Object>();
    private String sid;
    @SuppressWarnings("unused")
    private HttpServletRequest request;
    @SuppressWarnings("unused")
    private HttpServletResponse response;

    public static final int POOL = 10;

    static final int LIST_TYPE = 0;
    static final int ENTITY_TYPE = 1;
    static final int OJB_TYPE = 2;

    public KpiAnalysisEquipCauseCntThread() {}
    @SuppressWarnings("unchecked")
    public KpiAnalysisEquipCauseCntThread(NwAnalysisRepository nwAnalysisRepository, Map<String, Object> param, String sid) {
        this.request = request;
        this.response = response;
        this.nwAnalysisRepository = nwAnalysisRepository;
        HashMap<String, Object> map = (HashMap<String, Object>) param;
        this.param = (HashMap<String, Object>) map.clone();
        this.sid = sid;
    }

    @Override
    public ThreadCallResult call() throws Exception {

        TimeUnit.MILLISECONDS.sleep(40);

        ThreadCallResult ret = new ThreadCallResult();

        List<EquipCaseCauseDto> list = new ArrayList<EquipCaseCauseDto>();

        list = nwAnalysisRepository.getKpiAnalysisEquipCauseCnt(param);
        ret.setRetType(LIST_TYPE);
        ret.setRetMsg(sid);
        ret.setRetList(list);

        return ret;
    }

}
