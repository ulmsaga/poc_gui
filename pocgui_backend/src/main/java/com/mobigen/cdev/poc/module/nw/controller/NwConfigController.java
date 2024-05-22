package com.mobigen.cdev.poc.module.nw.controller;


import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.module.nw.dto.EnbNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.EquipNodeDto;
import com.mobigen.cdev.poc.module.nw.dto.TreeNodeDto;
import com.mobigen.cdev.poc.module.nw.service.NwConfigService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("nw/config/")
public class NwConfigController {

    private final NwConfigService nwConfigService;
    public NwConfigController(NwConfigService nwConfigService) {
        this.nwConfigService = nwConfigService;
    }

    @RequestMapping(value = "/getMmeList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getMmeList(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<EquipNodeDto> list = nwConfigService.getMmeList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getMmeTreeList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getMmeTreeList(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<TreeNodeDto> list = nwConfigService.getMmeTreeList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getEnbList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getEnbList(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<EnbNodeDto> list = nwConfigService.getEnbList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getEnbTreeList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getEnbTreeList(@RequestBody Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<TreeNodeDto> list = nwConfigService.getEnbTreeList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

}
