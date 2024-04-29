package com.mobigen.cdev.poc.core.security.dto;

import com.mobigen.cdev.poc.core.base.dto.BaseObject;

public class ExceptionSecondCertiDto extends BaseObject {
  public final static String IS_ALLOW = "Y";
  public final static String IS_NOT_ALLOW = "N";

  private String allow_exception;
  private String expire_cond;
  private String expire_avlue;
  private String compare_time;

  public String getAllow_exception() {
    return allow_exception;
  }
  public void setAllow_exception(String allow_exception) {
    this.allow_exception = allow_exception;
  }
  public String getExpire_cond() {
    return expire_cond;
  }
  public void setExpire_cond(String expire_cond) {
    this.expire_cond = expire_cond;
  }
  public String getExpire_avlue() {
    return expire_avlue;
  }
  public void setExpire_avlue(String expire_avlue) {
    this.expire_avlue = expire_avlue;
  }
  public String getCompare_time() {
    return compare_time;
  }
  public void setCompare_time(String compare_time) {
    this.compare_time = compare_time;
  }
  
}
