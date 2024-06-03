package com.mobigen.cdev.poc.module.nw.thread;

import com.mobigen.cdev.poc.module.common.dto.common.ThreadCallResult;
import com.mobigen.cdev.poc.module.nw.dto.*;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwConfigRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.TimeUnit;

public class NwEquipNodesThread implements Callable<ThreadCallResult> {

    private final NwConfigRepository nwConfigRepository;
    private Map<String, Object> param = new HashMap<String, Object>();

    private final String sid;

    public static String C_ENB_LIST = "ENB_LIST";
    public static String C_ENB_TREE = "ENB_TREE";
    public static String C_MME_LIST = "MME_LIST";
    public static String C_MME_TREE = "MME_TREE";

    public static final int POOL = 10;

    public NwEquipNodesThread(NwConfigRepository nwConfigRepository, String sid, Map<String, Object> param) {
        this.nwConfigRepository = nwConfigRepository;
        this.sid = sid;
        this.param = param;
    }

    private List<TreeNodeDto> getEquipTree(List<EquipNodeDto> list) {
        List<TreeNodeDto> mtsoList = new ArrayList<>();
        TreeNodeDto mtsoNode = new TreeNodeDto();
        List<TreeNodeDto> mmeList = new ArrayList<>();
        //
        for (EquipNodeDto node: list) {
            if ("Y".equals(node.getMtso_first())) {
                mtsoNode = new TreeNodeDto();
                mmeList = new ArrayList<>();
            }
            if ("Y".equals(node.getMtso_last())) {
                mtsoNode.setId(node.getMtso_id());
                // mtsoNode.setId(Integer.parseInt(node.getMtso_id()));
                mtsoNode.setName(node.getMtso_name());
                mtsoNode.setState(setDefaultState("MTSO"));
                mtsoNode.setChildren(mmeList);

                mtsoList.add(mtsoNode);
            }
            //
            TreeNodeDto mmeNode = new TreeNodeDto();
            mmeNode.setId(node.getNode_exp_id());
            // mmeNode.setId(Integer.parseInt(node.getNode_id()));
            mmeNode.setName(node.getNode_exp_id());
            mmeNode.setState(setDefaultState("MME", true));

            mmeList.add(mmeNode);
        }

        return mtsoList;
    }

    public List<TreeNodeDto> getEnbTreeList(List<EnbNodeDto> list) {
        List<TreeNodeDto> branchList = new ArrayList<>();
        TreeNodeDto branchNode = new TreeNodeDto();

        List<TreeNodeDto> opteamList = new ArrayList<>();
        TreeNodeDto opteamNode = new TreeNodeDto();

        List<TreeNodeDto> partList = new ArrayList<>();
        TreeNodeDto partNode = new TreeNodeDto();

        List<TreeNodeDto> enbList = new ArrayList<>();

        for (EnbNodeDto node: list) {

            if ("Y".equals(node.getBranch_first())) {
                branchNode = new TreeNodeDto();
                opteamList = new ArrayList<>();
            }
            if ("Y".equals(node.getOpteam_first())) {
                opteamNode = new TreeNodeDto();
                partList = new ArrayList<>();
            }
            if ("Y".equals(node.getPart_first())) {
                partNode = new TreeNodeDto();
                enbList = new ArrayList<>();
            }

            if ("Y".equals(node.getPart_last())) {
                partNode.setId(node.getPart_id());
                partNode.setName(node.getPart_name());
                partNode.setState(setDefaultState("PART"));

                partNode.setChildren(enbList);
                partList.add(partNode);
            }
            if ("Y".equals(node.getOpteam_last())) {
                opteamNode.setId(node.getOpteam_id());
                opteamNode.setName(node.getOpteam_name());
                opteamNode.setState(setDefaultState("OPTEAM"));
                opteamNode.setChildren(partList);

                opteamList.add(opteamNode);
            }
            if ("Y".equals(node.getBranch_last())) {
                branchNode.setId(node.getBranch_id());
                branchNode.setName(node.getBranch_name());
                branchNode.setState(setDefaultState("BRANCH"));
                branchNode.setChildren(opteamList);

                branchList.add(branchNode);
            }

            TreeNodeDto enbNode = new TreeNodeDto();
            enbNode.setId(node.getEnb_id());
            enbNode.setName(node.getBts_name());
            enbNode.setState(setDefaultState("ENB", true));
            enbList.add(enbNode);
        }

        return branchList;
    }

    private Map<String, Object> setDefaultState(String nodeType) {
        Map<String, Object> state = new HashMap<>();

        state.put("expanded", false);
        state.put("deletable", false);
        state.put("favorite", false);
        state.put("lastDepth", false);
        state.put("nodeType", nodeType);
        state.put("alarmGrade", "NR");

        return state;
    }

    private Map<String, Object> setDefaultState(String nodeType, Boolean isLastDepth) {
        Map<String, Object> state = new HashMap<>();

        state.put("expanded", false);
        state.put("deletable", false);
        state.put("favorite", false);
        state.put("lastDepth", isLastDepth);
        state.put("nodeType", nodeType);
        state.put("alarmGrade", "NR");

        return state;
    }

    @Override
    public ThreadCallResult call() throws Exception {
        TimeUnit.MILLISECONDS.sleep(40);

        ThreadCallResult ret = new ThreadCallResult();

        switch (sid) {
            case "ENB_LIST":
                List<EnbNodeDto> enbList = nwConfigRepository.getEnbList(param);
                ret.setRetType(KpiAnalysisEquipCauseCntThread.LIST_TYPE);
                ret.setRetMsg(NwEquipNodesThread.C_ENB_LIST);
                ret.setRetList(enbList);
                break;
            case "MME_LIST":
                List<EquipNodeDto> mmeList = nwConfigRepository.getMmeList(param);
                ret.setRetType(KpiAnalysisEquipCauseCntThread.LIST_TYPE);
                ret.setRetMsg(NwEquipNodesThread.C_MME_LIST);
                ret.setRetList(mmeList);
                break;
            case "ENB_TREE":
                List<TreeNodeDto> enbTree = getEnbTreeList(nwConfigRepository.getEnbList(param));
                ret.setRetType(KpiAnalysisEquipCauseCntThread.LIST_TYPE);
                ret.setRetMsg(NwEquipNodesThread.C_ENB_TREE);
                ret.setRetList(enbTree);
                break;
            case "MME_TREE":
                List<TreeNodeDto> mmeTree = getEquipTree(nwConfigRepository.getMmeList(param));
                ret.setRetType(KpiAnalysisEquipCauseCntThread.LIST_TYPE);
                ret.setRetMsg(NwEquipNodesThread.C_MME_TREE);
                ret.setRetList(mmeTree);
                break;
            default:
                break;
        }

        return ret;
    }
}
