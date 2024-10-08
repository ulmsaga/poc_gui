package com.mobigen.cdev.poc.config;

import com.mobigen.cdev.poc.core.security.interceptor.AuthInterceptPreHandle;
import com.mobigen.cdev.poc.core.security.resolver.LoginUserArgumentResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
	/**
	 * Interceptor 등록 및 설정
	 * Resolver 등록
	 */
	
    private final AuthInterceptPreHandle authInterceptPreHandle;
    private final LoginUserArgumentResolver loginUserArgumentResolver;
    public WebConfig(AuthInterceptPreHandle authInterceptPreHandle, LoginUserArgumentResolver loginUserArgumentResolver) {
        this.authInterceptPreHandle = authInterceptPreHandle;
        this.loginUserArgumentResolver = loginUserArgumentResolver;
    }

    /**
     * 
     * authInterceptPreHandle: login 모듈을 제외한 모든 api에 대해 세션 유효성, API 유효성 절차를 진행하는 Interceptor
     * 
     */
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptPreHandle)
                .addPathPatterns("/**/")
                .excludePathPatterns("/login/**")
                .excludePathPatterns("/resources/**")
                .excludePathPatterns("/sse/subscribe/**")
                .excludePathPatterns("/notification/retryProcFinished/**")
                .excludePathPatterns("/notification/taskCompletionNotifier/**");
    }

    /**
     *
     * Resolver 등록
     * loginUserArgumentResolver: @LoginUserParam (Parameter Type) Annotation을 제어해 주기 위한 Resolver Handler
     */
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(loginUserArgumentResolver);
    }
}
