package com.mobigen.cdev.poc.module.nw.dto;

import java.util.List;

public class NwEquipNodesDto {
    private List<EquipNodeDto> mmeList;
    private List<EnbNodeDto> enbList;
    private List<TreeNodeDto> mmeTreeList;
    private List<TreeNodeDto> enbTreeList;

    public List<EquipNodeDto> getMmeList() {
        return mmeList;
    }

    public void setMmeList(List<EquipNodeDto> mmeList) {
        this.mmeList = mmeList;
    }

    public List<EnbNodeDto> getEnbList() {
        return enbList;
    }

    public void setEnbList(List<EnbNodeDto> enbList) {
        this.enbList = enbList;
    }

    public List<TreeNodeDto> getMmeTreeList() {
        return mmeTreeList;
    }

    public void setMmeTreeList(List<TreeNodeDto> mmeTreeList) {
        this.mmeTreeList = mmeTreeList;
    }

    public List<TreeNodeDto> getEnbTreeList() {
        return enbTreeList;
    }

    public void setEnbTreeList(List<TreeNodeDto> enbTreeList) {
        this.enbTreeList = enbTreeList;
    }
}
