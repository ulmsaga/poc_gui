package com.mobigen.cdev.poc.core.base.dto;

import java.io.Serializable;

public class BasePage implements Serializable {
	private static final long serialVersionUID = -9108678022297963900L;

  // field
  private int row_num;
  private int tot_count;
  private int page_count;
  private int page_per_count;
  private int curr_page;
  private int curr_page_btn_num;
  private int curr_page_group_start;
  private int curr_page_group_end;
  private int first_page_group_start;
  private int first_page_group_end;
  private int last_page_group_start;
  private int last_page_group_end;

  public int getTot_count() {
    return tot_count;
  }
  public void setTot_count(int tot_count) {
    this.tot_count = tot_count;
  }
  public int getPage_count() {
    return page_count;
  }
  public void setPage_count(int page_count) {
    this.page_count = page_count;
  }
  public int getPage_per_count() {
    return page_per_count;
  }
  public void setPage_per_count(int page_per_count) {
    this.page_per_count = page_per_count;
  }
  public int getCurr_page() {
    return curr_page;
  }
  public void setCurr_page(int curr_page) {
    this.curr_page = curr_page;
  }
  public int getCurr_page_group_start() {
    return curr_page_group_start;
  }
  public void setCurr_page_group_start(int curr_page_group_start) {
    this.curr_page_group_start = curr_page_group_start;
  }
  public int getCurr_page_group_end() {
    return curr_page_group_end;
  }
  public void setCurr_page_group_end(int curr_page_group_end) {
    this.curr_page_group_end = curr_page_group_end;
  }
  public int getFirst_page_group_start() {
    return first_page_group_start;
  }
  public void setFirst_page_group_start(int first_page_group_start) {
    this.first_page_group_start = first_page_group_start;
  }
  public int getFirst_page_group_end() {
    return first_page_group_end;
  }
  public void setFirst_page_group_end(int first_page_group_end) {
    this.first_page_group_end = first_page_group_end;
  }
  public int getLast_page_group_start() {
    return last_page_group_start;
  }
  public void setLast_page_group_start(int last_page_group_start) {
    this.last_page_group_start = last_page_group_start;
  }
  public int getLast_page_group_end() {
    return last_page_group_end;
  }
  public void setLast_page_group_end(int last_page_group_end) {
    this.last_page_group_end = last_page_group_end;
  }
  public int getCurr_page_btn_num() {
    return curr_page_btn_num;
  }
  public void setCurr_page_btn_num(int curr_page_btn_num) {
    this.curr_page_btn_num = curr_page_btn_num;
  }
  public int getRow_num() {
    return row_num;
  }
  public void setRow_num(int row_num) {
    this.row_num = row_num;
  }

  // param
  /* 
  private int pagePerCount;
  private int currPage;
  private int pageGroupCount = 5;
  private int limitFrom;
  */
}
