package com.mobigen.cdev.poc.module.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.security.util.rsa.RSAUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.security.PrivateKey;
import java.util.Map;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {

    private final MockMvc mockMvc;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public LoginControllerTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    @Test
    public void getRsaKeySetTest() throws Exception {

        MockHttpSession session = new MockHttpSession();

        MvcResult result = mockMvc.perform(
                MockMvcRequestBuilders.get("/login/getRsaKeyset").session(session))
                .andExpect(status().isOk())
                .andReturn();

        ObjectMapper mapper = new ObjectMapper();
        String content = result.getResponse().getContentAsString();
        RsResultDto resultDto = mapper.readValue(content, RsResultDto.class);
        Map<String, Object> rs = (Map<String, Object>) resultDto.getRs();

        String rsaModulus = rs.get("RSAModulus").toString();
        String rsaExponent = rs.get("RSAExponent").toString();

        logger.debug("rsaModulus : {}", rsaModulus);
        logger.debug("rsaExponent : {}", rsaExponent);

        String privateKeyStr = RSAUtil.getPrivateKeyAtSession(session).toString();
        PrivateKey privateKey = RSAUtil.getPrivateKeyAtSession(session);

        logger.debug("privateKeyStr : {}", privateKeyStr);
        logger.debug("privateKey : {}", privateKey);

        Assertions.assertThat(privateKeyStr).contains("SunRsaSign RSA private CRT key, 1024 bits");
    }
}
