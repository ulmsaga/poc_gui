package com.mobigen.cdev.poc.module.nw.repository.mybatis;

import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.module.nw.dto.SignalXdrDto;

import java.util.List;
import java.util.Map;

public interface NwSearchRepository {
    List<SignalXdrDto> getSignalCallLogXdr(Map<String, Object> param);
    void getSignalCallLogXdrExcel(Map<String, Object> param, ExcelDefaultExceptionHandler rh);
    List<FileDto> getPaketTargetFile(Map<String, Object> param);
}
