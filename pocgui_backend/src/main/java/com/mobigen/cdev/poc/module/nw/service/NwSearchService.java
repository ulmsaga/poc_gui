package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.module.nw.dto.SignalXdrDto;

import java.util.List;
import java.util.Map;

public interface NwSearchService {
    List<SignalXdrDto> getSignalCallLogXdr(Map<String, Object> param);
    FileDto getPacketFile(Map<String, Object> param);
}
