package com.mobigen.cdev.poc.module.login.controller;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.security.dto.ResultSmsAuthDto;
import com.mobigen.cdev.poc.core.security.manage.sms.SmsManage;
import com.mobigen.cdev.poc.module.common.service.CommonService;
import com.mobigen.cdev.poc.module.login.dto.LoginResultDto;
import com.mobigen.cdev.poc.module.login.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("login")
public class LoginController {
    private final LoginService loginService;
    private final SmsManage smsManage;
    private final CommonService commonService;

    @SuppressWarnings("unused")
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public LoginController(LoginService loginService, SmsManage smsManage, CommonService commonService) {
        this.loginService = loginService;
        this.smsManage = smsManage;
        this.commonService = commonService;
    }




    @RequestMapping(value = "/loginAuth", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> loginAuth(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
        RsResultDto result = new RsResultDto();
        LoginResultDto loginResultDto = loginService.loginAuth(param, request, response);
        result.setRs(loginResultDto);
        result.setResult(loginResultDto.getResult());
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/isAuthority", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> isAuthority(@RequestParam Map<String, Object> ignoredParam, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        result.setRs(loginService.isAuthoritySession(request, response));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getUserByContextRepository", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getUserByContextRepository(@RequestParam Map<String, Object> ignoredParam, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        result.setRs(loginService.getUserByContextRepository(request, response));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> logOut(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        RsResultDto result = new RsResultDto();
        loginService.logOut(request, response);
        result.setResult(RsResultDto.RESULT_SUCCESS);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/loginProc", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> loginProc(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
        RsResultDto result = new RsResultDto();
        LoginResultDto loginResultDto = loginService.loginProc(param, request, response);
        result.setRs(loginResultDto);
        result.setResult(loginResultDto.getResult());
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/getRsaKeyset", method = {RequestMethod.GET, RequestMethod.POST}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> getRsaKeyset(HttpServletRequest request, HttpServletResponse response) {
        RsResultDto resultDto = new RsResultDto();
        resultDto.setRs(loginService.getRsaKeyset(request, response));
        return ResponseEntity.ok(resultDto);
    }

    @RequestMapping(value = "/sendSmsAuthenticationCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> sendSmsAuthenticationCode(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
        RsResultDto result = new RsResultDto();
        result.setRs(smsManage.sendSmsAuthenticationCode(param, request, response));
        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/verifyAuthenticationCode", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RsResultDto> verifyAuthenticationCode(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) throws Exception {
        RsResultDto result = new RsResultDto();
        ResultSmsAuthDto resultSmsAuthDto = smsManage.verifyAuthenticationCode(param, request, response);
        resultSmsAuthDto.setDefaultMenuInfo(commonService.getDefaultMenuInfo(param));
        result.setRs(resultSmsAuthDto);
        return ResponseEntity.ok(result);
    }
}
