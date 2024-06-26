package com.mobigen.cdev.poc.module.nw.controller;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.module.nw.service.NwSearchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("nw/search/")
public class NwSearchController {
    private final NwSearchService nwSearchService;

    public NwSearchController(NwSearchService nwSearchService) {
        this.nwSearchService = nwSearchService;
    }

    @RequestMapping(value = "/getSignalCallLogXdr")
    public ResponseEntity<RsResultDto> getSignalCallLogXdr(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        result.setRs(nwSearchService.getSignalCallLogXdr(param));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getSignalCallLogXdrExcel")
    public ResponseEntity<RsResultDto> getSignalCallLogXdrExcel(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        result.setRs(nwSearchService.getSignalCallLogXdrExcel(param));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getPacketFile")
    public ResponseEntity<RsResultDto> getPacketFile(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        result.setRs(nwSearchService.getPacketFile(param));
        return ResponseEntity.ok(result);
    }
}
