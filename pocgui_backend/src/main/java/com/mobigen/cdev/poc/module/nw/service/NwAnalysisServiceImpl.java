package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.security.annotation.LoginUser;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.core.util.common.Cutil;
import com.mobigen.cdev.poc.module.common.dto.common.ThreadCallResult;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipCaseCauseResultDto;
import com.mobigen.cdev.poc.module.nw.dto.KpiAnalysisResultDto;
import com.mobigen.cdev.poc.module.nw.dto.RootCauseForPivotDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwAnalysisRepository;
import com.mobigen.cdev.poc.module.nw.thread.KpiAnalysisEquipCauseCntThread;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.ThreadPoolExecutor;

@Service
public class NwAnalysisServiceImpl implements NwAnalysisService {

    private final NwAnalysisRepository nwAnalysisRepository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public NwAnalysisServiceImpl(NwAnalysisRepository nwAnalysisRepository) {
        this.nwAnalysisRepository = nwAnalysisRepository;
    }

    @Override
    public KpiAnalysisResultDto getKpiAnalysis(Map<String, Object> param) {
        KpiAnalysisResultDto ret = new KpiAnalysisResultDto();
        setKpiAnalysisParam(param);

        List<String> tmpCallTypeList = (List<String>) param.get("callTypeList");
        logger.debug("tmpCallTypeList [0], {}", tmpCallTypeList.get(0));

        List<?> list = nwAnalysisRepository.getKpiAnalysis(param);
        ret.setList(list);
        ret.setCauseList((List<RootCauseForPivotDto>)param.get("causeList"));
        return ret;
    }

    @Override
    @EnvStatus
    @LoginUser
    public EquipCaseCauseResultDto getKpiAnalysisEquipCauseCnt(Map<String, Object> param){
        EquipCaseCauseResultDto ret = new EquipCaseCauseResultDto();

        String[] sArr;
        sArr = new String[]{"IMSI", "ENB", "MME", "SGW", "PGW"};
        param = Cutil.sqlInjectionForParam(param);

        logger.info("before set Executor");

        ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(KpiAnalysisEquipCauseCntThread.POOL);
        List<Future<ThreadCallResult>> resultList = new ArrayList<Future<ThreadCallResult>>();

        logger.info("before Loop sArr");

        for (String sId : sArr) {
            param.put("targetNodeType", sId);
            KpiAnalysisEquipCauseCntThread threadImsi = new KpiAnalysisEquipCauseCntThread(nwAnalysisRepository, param, sId);
            Future<ThreadCallResult> callRetImsi = executor.submit(threadImsi);
            resultList.add(callRetImsi);
        }

        logger.info("before Future");
        for (Future<ThreadCallResult> future : resultList) {
            try {
                ThreadCallResult fget = future.get();
                String sMsgId = fget.getRetMsg();
                switch (sMsgId) {
                    case "IMSI":
                        ret.setImsi((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("IMSI : OK");
                        break;
                    case "UEM":
                        ret.setUem((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("UEM : OK");
                        break;
                    case "ENB":
                        ret.setEnb((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("ENB : OK");
                        break;
                    case "VLAN":
                        ret.setVlan((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("VLAN : OK");
                        break;
                    case "MME":
                        ret.setMme((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("MME : OK");
                        break;
                    case "SGW":
                        ret.setSgw((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("SGW : OK");
                        break;
                    case "PGW":
                        ret.setPgw((List<EquipCaseCauseDto>)fget.getRetList());
                        logger.info("PGW : OK");
                        break;
                    default:
                        break;
                }
            } catch (Exception e) {
                throw new RsRuntimeException("error.common.NasfBizException");
            }
            executor.shutdown();
        }
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
