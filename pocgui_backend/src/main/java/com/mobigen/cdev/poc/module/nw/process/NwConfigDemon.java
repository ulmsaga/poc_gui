package com.mobigen.cdev.poc.module.nw.process;

import com.google.common.collect.Maps;
import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.module.common.dto.common.ThreadCallResult;
import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.NwEquipNodesDto;
import com.mobigen.cdev.poc.module.nw.dto.TreeNodeDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwConfigRepository;
import com.mobigen.cdev.poc.module.nw.thread.KpiAnalysisEquipCauseCntThread;
import com.mobigen.cdev.poc.module.nw.thread.NwEquipNodesThread;
import com.sun.source.tree.Tree;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

@Component
public class NwConfigDemon implements Runnable {

    private volatile boolean isRun = false;

    private ConcurrentMap<String, NwEquipNodesDto> dataMap = Maps.newConcurrentMap();
    private List<NwEquipNodesDto> dataList = new CopyOnWriteArrayList<>();
    private Map<Integer, String> keyMap;

    private int currentIdx = 0;
    private int saveMinCnt = 5;
    private boolean overMax = false;

    private final NwConfigRepository nwConfigRepository;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public NwConfigDemon(NwConfigRepository nwConfigRepository) {
        this.nwConfigRepository = nwConfigRepository;
    }

    public boolean isRun() {
        return isRun;
    }

    public void setRun(boolean run) {
        isRun = run;
    }

    private NwEquipNodesDto getNwEquipNodes() {
        NwEquipNodesDto ret = new NwEquipNodesDto();
        Map<String, Object> param = new HashMap<>();
        ThreadPoolExecutor executor = (ThreadPoolExecutor) Executors.newFixedThreadPool(NwEquipNodesThread.POOL);
        List<Future<ThreadCallResult>> resultList = new ArrayList<>();

        // NwEquipNodesThread nwEquipNodesThread = null;

        NwEquipNodesThread nwEquipNodesThread = new NwEquipNodesThread(nwConfigRepository, NwEquipNodesThread.C_ENB_LIST, param);
        Future<ThreadCallResult> callEnbList = executor.submit(nwEquipNodesThread);
        resultList.add(callEnbList);

        nwEquipNodesThread = new NwEquipNodesThread(nwConfigRepository, NwEquipNodesThread.C_ENB_TREE, param);
        Future<ThreadCallResult> callEnbTree = executor.submit(nwEquipNodesThread);
        resultList.add(callEnbTree);

        nwEquipNodesThread = new NwEquipNodesThread(nwConfigRepository, NwEquipNodesThread.C_MME_LIST, param);
        Future<ThreadCallResult> callMmeList = executor.submit(nwEquipNodesThread);
        resultList.add(callMmeList);

        nwEquipNodesThread = new NwEquipNodesThread(nwConfigRepository, NwEquipNodesThread.C_MME_TREE, param);
        Future<ThreadCallResult> callMmeTree = executor.submit(nwEquipNodesThread);
        resultList.add(callMmeTree);

        for (Future<ThreadCallResult> future: resultList) {
            try {
                ThreadCallResult fget = future.get();
                String sMsgId = fget.getRetMsg();
                switch (sMsgId) {
                    case "ENB_LIST":
                        ret.setEnbList((List<EnbNodeDto>) fget.getRetList());
                        break;
                    case "ENB_TREE":
                        ret.setEnbTreeList((List<TreeNodeDto>) fget.getRetList());
                        break;
                    case "MME_LIST":
                        ret.setMmeList((List<EquipNodeDto>) fget.getRetList());
                        break;
                    case "MME_TREE":
                        ret.setMmeTreeList((List<TreeNodeDto>) fget.getRetList());
                        break;
                    default:
                        break;
                }
            } catch (Exception e) {
                throw new RsRuntimeException("err.common.RsRuntimeException");
            }
            executor.shutdown();;
        }

        logger.debug("Result Equips : {}", "OK!!!");
        return ret;
    }

    public NwEquipNodesDto nwEquipNodes() {
        NwEquipNodesDto ret = new NwEquipNodesDto();

        if (dataList.size() == 0) {
            // ret = getNwEquipNodes();
        } else {
            ret = dataList.get(dataList.size() - 1);
        }

        return ret;
    }

    @Override
    public void run() {
        try {
            while(isRun) {
                logger.debug("current Idx : {}", currentIdx);

                if (currentIdx >= 1) {
                    Thread.currentThread().sleep(120000);
                    continue;
                }
                if (currentIdx >= saveMinCnt) {
                    overMax = true;
                } else {
                    currentIdx++;
                }

                if (overMax) {
                    // remove
                    dataList.remove(0);
                }

                dataList.add(getNwEquipNodes());
            }
        } catch (Exception e) {
            isRun = false;
            e.printStackTrace();
        }
    }


}
