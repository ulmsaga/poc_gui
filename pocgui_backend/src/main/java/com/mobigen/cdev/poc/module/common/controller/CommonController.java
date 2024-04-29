package com.mobigen.cdev.poc.module.common.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.security.annotation.LoginUser;
import com.mobigen.cdev.poc.core.security.annotation.LoginUserParam;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.module.common.dto.user.UserInfoDto;
import com.mobigen.cdev.poc.module.common.service.CommonService;

@RestController
@RequestMapping("common")
public class CommonController {

    private final CommonService commonService;

    @SuppressWarnings("unused")
    private final Logger logger = LogManager.getLogger(this.getClass());

    public CommonController(CommonService commonService) {
        this.commonService = commonService;
    }

    @RequestMapping(value = "/getUserList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserList(@RequestParam Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<UserInfoDto> list = commonService.getUserList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getAllUserList", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getAllUserList() {
        RsResultDto result = new RsResultDto();
        List<UserInfoDto> list = commonService.getAllUserList();
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getLoginUserByAnnotationParam", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserByAnnotationParam(@LoginUserParam UserInfoDto userInfoDto, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        Map<String, Object> param = new HashMap<>();
        param.put("userId", userInfoDto.getUser_id());
        List<UserInfoDto> list = commonService.getUserList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @LoginUser
    @RequestMapping(value = "/getLoginUserByAnnotationMethod", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserByAnnotationMethod(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        String userId = ((UserDto) param.get("userDto")).getUser_id();
        param.put("userId", userId);
        List<UserInfoDto> list = commonService.getUserList(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/getUserListExcel", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserListExcel(@RequestBody Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        result.setRs(commonService.getUserListExcel(param));
        return ResponseEntity.ok(result);
    }
    
    @GetMapping(value = "/getUserPemdb1List", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserPemdb1List(@RequestParam Map<String, Object> param) {
        RsResultDto result = new RsResultDto();
        List<UserInfoDto> list = commonService.getUserPemdb1List(param);
        result.setRs(list);
        return ResponseEntity.ok(result);
    }
    
    @PostMapping(value = "/mergeUserInfoFromTpani", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RsResultDto> mergeUserInfoFromTpani(@RequestBody Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
		RsResultDto result = new RsResultDto();
		result.setRs(0);
		return ResponseEntity.ok(result);
	}
    
    @PostMapping(value = "/getUserMenuInfoList", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RsResultDto> getUserMenuInfoList(@RequestBody Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
		RsResultDto result = new RsResultDto();
		result.setRs(commonService.getUserMenuInfoList(param));
		return ResponseEntity.ok(result);
	}

    @GetMapping(value = "/isAuthority", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> isAuthority(@RequestParam Map<String, Object> ignoredParam, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        result.setRs(commonService.isAuthoritySession(request, response));
        return ResponseEntity.ok(result);
    }

}
