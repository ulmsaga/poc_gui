package com.mobigen.cdev.poc.module.common.dto.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.mobigen.cdev.poc.core.base.dto.BaseObject;

@JsonInclude(JsonInclude.Include.ALWAYS)
public class TrendChartDto extends BaseObject {
    private static final long serialVersionUID = -8103395030853760551L;
    private String event_time;
    private String event_exp_time;
    private String data1;
    private String data2;
    private String max_data;

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

    public String getData1() {
        return data1;
    }

    public void setData1(String data1) {
        this.data1 = data1;
    }

    public String getData2() {
        return data2;
    }

    public void setData2(String data2) {
        this.data2 = data2;
    }

    public String getMax_data() {
        return max_data;
    }

    public void setMax_data(String max_data) {
        this.max_data = max_data;
    }
}
