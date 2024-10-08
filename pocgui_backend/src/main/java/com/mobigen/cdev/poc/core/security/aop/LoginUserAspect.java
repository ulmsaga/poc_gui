package com.mobigen.cdev.poc.core.security.aop;

import com.mobigen.cdev.poc.core.exception.RsResultException;
import com.mobigen.cdev.poc.core.security.component.CustomHttpSessionSecurityContextRepository;
import com.mobigen.cdev.poc.core.security.dto.UserDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;
import java.util.Objects;

@Aspect
@Component
public class LoginUserAspect {

    @SuppressWarnings({"unchecked"})
    @Around("@annotation(com.mobigen.cdev.poc.core.security.annotation.LoginUser)")
    public Object autoAddSessionUserToParam(ProceedingJoinPoint joinPoint) throws Throwable {
        // Before
        Object[] args = joinPoint.getArgs();

        for (Object arg: args) {
            if (arg instanceof Map) {
                HttpServletRequest request = ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
                HttpSession httpSession = request.getSession();
                UserDto userDto = (UserDto) httpSession.getAttribute(CustomHttpSessionSecurityContextRepository.AUTHORIZED_KEY);
                
                if (userDto == null) {
                	throw new RsResultException("message.session.fail");
                }
                
                ((Map<String, Object>) arg).put("userDto", userDto);
                ((Map<String, Object>) arg).put("userId", userDto.getUser_id());
                
            }
        }

        Object result = joinPoint.proceed();

        // After
        return result;
    }
}
