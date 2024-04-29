package com.mobigen.cdev.poc.core.util.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Map;

@Aspect
@Component
public class EnvStatusAspect {

    private final Environment env;

    @Autowired
    public EnvStatusAspect(Environment env) {
        this.env = env;
    }

    @SuppressWarnings("unchecked")
	@Around("@annotation(com.mobigen.cdev.poc.core.util.annotation.EnvStatus)")
    public Object autoAddEnvStatusToParam(ProceedingJoinPoint joinPoint) throws Throwable {
        // Before
        Object[] args = joinPoint.getArgs();

        String envStatus = env.getProperty("spring.profiles.active");

        for (Object arg: args) {
            if (arg instanceof Map) {
                ((Map<String, Object>) arg).put("envStatus", envStatus);
            }
        }

        Object result = joinPoint.proceed();

        // After
        return result;
    }
}
