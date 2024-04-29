package com.mobigen.cdev.poc.module.common.dto.common;

import java.util.List;

public class CondsDto {
  private List<CondValueTextDto> nmsCondList;
  private List<CondValueTextDto> protocolCondList;
  private List<CondValueTextDto> statusCondList;
  private List<CondValueTextDto> interfaceCycleCondList;

  public List<CondValueTextDto> getNmsCondList() {
    return nmsCondList;
  }
  public void setNmsCondList(List<CondValueTextDto> nmsCondList) {
    this.nmsCondList = nmsCondList;
  }
  public List<CondValueTextDto> getProtocolCondList() {
    return protocolCondList;
  }
  public void setProtocolCondList(List<CondValueTextDto> protocolCondList) {
    this.protocolCondList = protocolCondList;
  }
  public List<CondValueTextDto> getStatusCondList() {
    return statusCondList;
  }
  public void setStatusCondList(List<CondValueTextDto> statusCondList) {
    this.statusCondList = statusCondList;
  }
  public List<CondValueTextDto> getInterfaceCycleCondList() {
    return interfaceCycleCondList;
  }
  public void setInterfaceCycleCondList(List<CondValueTextDto> interfaceCycleCondList) {
    this.interfaceCycleCondList = interfaceCycleCondList;
  }
  
  

}
