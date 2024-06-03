package com.mobigen.cdev.poc.module.nw.controller;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.module.nw.service.NwMonitorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("nw/monitor/")
public class NwMonitorController {
    private final NwMonitorService nwMonitorService;

    public NwMonitorController(NwMonitorService nwMonitorService) {
        this.nwMonitorService = nwMonitorService;
    }

    @RequestMapping(value = "/getLastStatusTime")
    public ResponseEntity<RsResultDto> getLastStatusTime(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        result.setRs(nwMonitorService.getLastStatusTime(param));
        return ResponseEntity.ok(result);
    }
}
