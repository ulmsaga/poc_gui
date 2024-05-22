package com.mobigen.cdev.poc.module.nw.dto;

import java.util.List;
import java.util.Map;

public class TreeNodeDto {
    // private String id;
    private int id;
    private String name;
    private Map<String, Object> state;
    private List<TreeNodeDto> children;

//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Map<String, Object> getState() {
        return state;
    }

    public void setState(Map<String, Object> state) {
        this.state = state;
    }

    public List<TreeNodeDto> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNodeDto> children) {
        this.children = children;
    }
}
