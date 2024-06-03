package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.NwEquipNodesDto;
import com.mobigen.cdev.poc.module.nw.dto.TreeNodeDto;
import com.mobigen.cdev.poc.module.nw.process.NwConfigDemon;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwConfigRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class NwConfigServiceImpl implements NwConfigService {

    private final NwConfigRepository nwConfigRepository;
    private final Environment env;

    private final NwConfigDemon nwConfigDemon;

    @SuppressWarnings("unused")
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public NwConfigServiceImpl(NwConfigRepository nwConfigRepository, NwConfigDemon nwConfigDemon, Environment env) {
        this.nwConfigRepository = nwConfigRepository;
        this.nwConfigDemon = nwConfigDemon;
        this.env = env;
    }

    @PostConstruct
    public void initialize(){
        String envStatus = env.getProperty("spring.profiles.active");


        if ("local".equals(envStatus)) {
            //Run Demon (dev, prod)
            boolean isRun = nwConfigDemon.isRun();
            if(!isRun){
                nwConfigDemon.setRun(true);
                Thread demon = new Thread(nwConfigDemon);
                boolean demonIsAlive = demon.isAlive();
                if(!demonIsAlive) demon.start();
            }
            /*
            isRun = awakenProcess.isRun();
            if(!isRun){
                awakenProcess.setRun(true);
                Thread awakenDemon = new Thread(awakenProcess);
                boolean awakenDemonIsAlive = awakenDemon.isAlive();
                if(!awakenDemonIsAlive) awakenDemon.start();
            }
            */
        }
    }

    @Override
    @EnvStatus
    public List<EquipNodeDto> getMmeList(Map<String, Object> param) {
        List<EquipNodeDto> ret = new ArrayList<>();
        if (param.get("searchType") == null || param.get("searchText") == null) {
            ret = nwConfigDemon.nwEquipNodes().getMmeList();
        } else {

            if ("".equals(param.get("searchText").toString().trim())) {
                ret = nwConfigDemon.nwEquipNodes().getMmeList();
                if (ret.size() == 0) {
                    ret = nwConfigRepository.getMmeList(param);
                }
            } else {
                ret = nwConfigRepository.getMmeList(param);
            }
        }
        return ret;
    }

    @Override
    @EnvStatus
    public List<TreeNodeDto> getMmeTreeList(Map<String, Object> param) {
        List<TreeNodeDto> mtsoList = new ArrayList<>();
        TreeNodeDto mtsoNode = new TreeNodeDto();
        List<TreeNodeDto> mmeList = new ArrayList<>();
        //
        List<EquipNodeDto> list = nwConfigRepository.getMmeList(param);
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

    @Override
    @EnvStatus
    public List<EnbNodeDto> getEnbList(Map<String, Object> param) {
        List<EnbNodeDto> ret = new ArrayList<>();
        if (param.get("searchType") == null || param.get("searchText") == null) {
            ret = nwConfigDemon.nwEquipNodes().getEnbList();
        } else {
            if ("".equals(param.get("searchText").toString().trim())) {
                ret = nwConfigDemon.nwEquipNodes().getEnbList();
                if (ret.size() == 0) {
                    ret = nwConfigRepository.getEnbList(param);
                }
            } else {
                ret = nwConfigRepository.getEnbList(param);
            }
        }
        return ret;
    }

    @Override
    @EnvStatus
    public List<TreeNodeDto> getEnbTreeList(Map<String, Object> param) {
        NwEquipNodesDto nodes = nwConfigDemon.nwEquipNodes();
        if (nodes != null) {
            if (nodes.getEnbTreeList() != null) {
                if (nodes.getEnbTreeList().size() > 0) {
                    return nodes.getEnbTreeList();
                }
            }
        }

        List<TreeNodeDto> branchList = new ArrayList<>();
        TreeNodeDto branchNode = new TreeNodeDto();

        List<TreeNodeDto> opteamList = new ArrayList<>();
        TreeNodeDto opteamNode = new TreeNodeDto();

        List<TreeNodeDto> partList = new ArrayList<>();
        TreeNodeDto partNode = new TreeNodeDto();

        List<TreeNodeDto> enbList = new ArrayList<>();

        // logger.debug("=====================================");
        // logger.debug("01. Before GetEnbList");

        List<EnbNodeDto> list = nwConfigRepository.getEnbList(param);

        // logger.debug("02. After GetEnbList");

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
                // partNode.setId(Integer.parseInt(node.getPart_id()));
                partNode.setName(node.getPart_name());
                partNode.setState(setDefaultState("PART"));

                partNode.setChildren(enbList);
                partList.add(partNode);
            }
            if ("Y".equals(node.getOpteam_last())) {
                opteamNode.setId(node.getOpteam_id());
                // opteamNode.setId(Integer.parseInt(node.getOpteam_id()));
                opteamNode.setName(node.getOpteam_name());
                opteamNode.setState(setDefaultState("OPTEAM"));
                opteamNode.setChildren(partList);

                opteamList.add(opteamNode);
            }
            if ("Y".equals(node.getBranch_last())) {
                branchNode.setId(node.getBranch_id());
                // branchNode.setId(Integer.parseInt(node.getBranch_id()));
                branchNode.setName(node.getBranch_name());
                branchNode.setState(setDefaultState("BRANCH"));
                branchNode.setChildren(opteamList);

                branchList.add(branchNode);
            }

            TreeNodeDto enbNode = new TreeNodeDto();
            enbNode.setId(node.getEnb_id());
            // enbNode.setId(Integer.parseInt(node.getEnb_id()));
            enbNode.setName(node.getBts_name());
            enbNode.setState(setDefaultState("ENB", true));
            enbList.add(enbNode);
        }

        // logger.debug("03. After Make Tree");

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
}
