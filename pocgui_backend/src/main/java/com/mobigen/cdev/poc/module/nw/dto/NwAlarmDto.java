package com.mobigen.cdev.poc.module.nw.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class NwAlarmDto extends BaseObject {
    private static final long serialVersionUID = -2585586016808266698L;

    private String grade;
    private String event_time;
    private String event_exp_time;
    private String graph_type;
    private String location;
    private String node1_type;
    private String node1_id;
    private String node1_name;
    private String node1_org;
    private String node2_type;
    private String node2_id;
    private String node2_name;
    private String node2_org;
    private String call_type;
    private String alarm_type_code;
    private String alarm_subtype_code;
    private String alarm_class;
    private String alarm_name;
    private String operator_result;
    private String current_value;
    private String threshold_level;
    private String normal_case;
    private String current_expression;
    private String continue_cnt;
    private String alarm_yn;

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getEvent_time() {
        return event_time;
    }

    public void setEvent_time(String event_time) {
        this.event_time = event_time;
    }

    public String getEvent_exp_time() {
        return event_exp_time;
    }

    public void setEvent_exp_time(String event_exp_time) {
        this.event_exp_time = event_exp_time;
    }

    public String getGraph_type() {
        return graph_type;
    }

    public void setGraph_type(String graph_type) {
        this.graph_type = graph_type;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getNode1_type() {
        return node1_type;
    }

    public void setNode1_type(String node1_type) {
        this.node1_type = node1_type;
    }

    public String getNode1_id() {
        return node1_id;
    }

    public void setNode1_id(String node1_id) {
        this.node1_id = node1_id;
    }

    public String getNode1_name() {
        return node1_name;
    }

    public void setNode1_name(String node1_name) {
        this.node1_name = node1_name;
    }

    public String getNode1_org() {
        return node1_org;
    }

    public void setNode1_org(String node1_org) {
        this.node1_org = node1_org;
    }

    public String getNode2_type() {
        return node2_type;
    }

    public void setNode2_type(String node2_type) {
        this.node2_type = node2_type;
    }

    public String getNode2_id() {
        return node2_id;
    }

    public void setNode2_id(String node2_id) {
        this.node2_id = node2_id;
    }

    public String getNode2_name() {
        return node2_name;
    }

    public void setNode2_name(String node2_name) {
        this.node2_name = node2_name;
    }

    public String getNode2_org() {
        return node2_org;
    }

    public void setNode2_org(String node2_org) {
        this.node2_org = node2_org;
    }

    public String getCall_type() {
        return call_type;
    }

    public void setCall_type(String call_type) {
        this.call_type = call_type;
    }

    public String getAlarm_type_code() {
        return alarm_type_code;
    }

    public void setAlarm_type_code(String alarm_type_code) {
        this.alarm_type_code = alarm_type_code;
    }

    public String getAlarm_subtype_code() {
        return alarm_subtype_code;
    }

    public void setAlarm_subtype_code(String alarm_subtype_code) {
        this.alarm_subtype_code = alarm_subtype_code;
    }

    public String getAlarm_class() {
        return alarm_class;
    }

    public void setAlarm_class(String alarm_class) {
        this.alarm_class = alarm_class;
    }

    public String getAlarm_name() {
        return alarm_name;
    }

    public void setAlarm_name(String alarm_name) {
        this.alarm_name = alarm_name;
    }

    public String getOperator_result() {
        return operator_result;
    }

    public void setOperator_result(String operator_result) {
        this.operator_result = operator_result;
    }

    public String getCurrent_value() {
        return current_value;
    }

    public void setCurrent_value(String current_value) {
        this.current_value = current_value;
    }

    public String getThreshold_level() {
        return threshold_level;
    }

    public void setThreshold_level(String threshold_level) {
        this.threshold_level = threshold_level;
    }

    public String getNormal_case() {
        return normal_case;
    }

    public void setNormal_case(String normal_case) {
        this.normal_case = normal_case;
    }

    public String getCurrent_expression() {
        return current_expression;
    }

    public void setCurrent_expression(String current_expression) {
        this.current_expression = current_expression;
    }

    public String getContinue_cnt() {
        return continue_cnt;
    }

    public void setContinue_cnt(String continue_cnt) {
        this.continue_cnt = continue_cnt;
    }

    public String getAlarm_yn() {
        return alarm_yn;
    }

    public void setAlarm_yn(String alarm_yn) {
        this.alarm_yn = alarm_yn;
    }
}
