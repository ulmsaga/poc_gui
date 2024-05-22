package com.mobigen.cdev.poc.module.nw.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.module.common.dto.common.ValueLabelDto;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class EquipNodeDto extends ValueLabelDto {
    private String mtso_id;
    private String mtso_name;
    private String mtso_first;
    private String mtso_last;
    private String node_type;
    private String node_id;
    private String node_exp_id;
    private String node_name;

    public String getMtso_id() {
        return mtso_id;
    }

    public void setMtso_id(String mtso_id) {
        this.mtso_id = mtso_id;
    }

    public String getMtso_name() {
        return mtso_name;
    }

    public void setMtso_name(String mtso_name) {
        this.mtso_name = mtso_name;
    }

    public String getMtso_first() {
        return mtso_first;
    }

    public void setMtso_first(String mtso_first) {
        this.mtso_first = mtso_first;
    }

    public String getMtso_last() {
        return mtso_last;
    }

    public void setMtso_last(String mtso_last) {
        this.mtso_last = mtso_last;
    }

    public String getNode_type() {
        return node_type;
    }

    public void setNode_type(String node_type) {
        this.node_type = node_type;
    }

    public String getNode_id() {
        return node_id;
    }

    public void setNode_id(String node_id) {
        this.node_id = node_id;
    }

    public String getNode_exp_id() {
        return node_exp_id;
    }

    public void setNode_exp_id(String node_exp_id) {
        this.node_exp_id = node_exp_id;
    }

    public String getNode_name() {
        return node_name;
    }

    public void setNode_name(String node_name) {
        this.node_name = node_name;
    }
}
