package com.mobigen.cdev.poc.core.security.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import com.mobigen.cdev.poc.core.security.manage.session.SessionManage;
import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Locale;

@Component
public class AuthInterceptPreHandle implements HandlerInterceptor {
    private final SessionManage sessionManage;
    private final MessageSourceAccessor messageSourceAccessor;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public AuthInterceptPreHandle(SessionManage sessionManage, MessageSourceAccessor messageSourceAccessor) {
        this.sessionManage = sessionManage;
        this.messageSourceAccessor = messageSourceAccessor;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean ret = !(HandlerInterceptor.super.preHandle(request, response, handler));

        //-------------------------------------------------
        // 1. Session 확인 (1차인증 PASSED & 2차인증 PASSED)
        //-------------------------------------------------
        if (sessionManage.isFullAuthentication(request, response)) {
            UserDto userDto = sessionManage.getUserByContextRepository(request, response);
            
            logger.info("firstAuthenticationStatus : {}", userDto.getFirstAuthenticationStatus());
            logger.info("secondaryAuthenticationStatus : {}", userDto.getSecondaryAuthenticationStatus());
            
        	//-------------------------------------------------
            // 2. API 권한 확인 (추후 추가)
            //-------------------------------------------------

            // 인가 성공 확인 : true
            return HandlerInterceptor.super.preHandle(request, response, handler);
        }


        //-------------------------------------------------
        // 인가 실패 시
        //-------------------------------------------------
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        ObjectMapper objectMapper = new ObjectMapper();
        RsResultDto rsResultDto = new RsResultDto();

        String messageKey = "message.session.fail";
        String message = messageSourceAccessor.getMessage(messageKey, Locale.getDefault());
        rsResultDto.setResult(RsResultDto.RESULT_FAIL);
        rsResultDto.setErrorCause(String.valueOf(HttpServletResponse.SC_UNAUTHORIZED));
        rsResultDto.setMessageKey(messageKey);
        rsResultDto.setErrorMessage(message);

        String json = objectMapper.writeValueAsString(rsResultDto);
        PrintWriter out = response.getWriter();
        out.print(json);
        out.flush();
        out.close();

        // 인가 실패 : false
        return ret;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, @Nullable Exception ex) throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }
}
