package com.mobigen.cdev.poc.module.common.dto.common;

public class ValueLabelDto {
    private String value;
    private String label;
    private String text;
    private String description;
    private String group_filter;

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGroup_filter() {
        return group_filter;
    }

    public void setGroup_filter(String group_filter) {
        this.group_filter = group_filter;
    }
}
