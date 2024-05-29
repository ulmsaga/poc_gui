package com.mobigen.cdev.poc.module.nw.controller;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import com.mobigen.cdev.poc.module.nw.service.NwAnalysisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("nw/analysis/")
public class NwAnalysisController {
    private final NwAnalysisService nwAnalysisService;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public NwAnalysisController(NwAnalysisService nwAnalysisService) {
        this.nwAnalysisService = nwAnalysisService;
    }

    @RequestMapping(value = "/getKpiAnalysis", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getKpiAnalysis(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        result.setRs(nwAnalysisService.getKpiAnalysis(param));
        return ResponseEntity.ok(result);
    }

}
