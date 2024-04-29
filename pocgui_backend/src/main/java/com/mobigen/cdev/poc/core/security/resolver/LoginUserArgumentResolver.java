package com.mobigen.cdev.poc.core.security.resolver;

import javax.servlet.http.HttpSession;

import com.mobigen.cdev.poc.core.security.annotation.LoginUserParam;
import com.mobigen.cdev.poc.core.security.component.CustomHttpSessionSecurityContextRepository;
import org.springframework.core.MethodParameter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

/**
 * 
   @LoginUserParam Annotation 사용 시 처리
   해당 Annotation은 Parameter Type으로 Controller에서 Map<String, Object> param 형식의 파라미터가 있을 경우 사용 가능
   EX) void Method(@LoginUserParam Map<String, Object> param) {}
 *
 */

@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {
    private final HttpSession httpSession;
    public LoginUserArgumentResolver(HttpSession httpSession) {
        this.httpSession = httpSession;
    }

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        // Annotation 존재 확인
        boolean existAnnotation = parameter.getParameterAnnotation(LoginUserParam.class) != null;
        // UserDetails.class User정보 최상위 Interface (Spring Security UserDetails)
        boolean isUserDetailType = UserDetails.class.isAssignableFrom(parameter.getParameterType());

        return existAnnotation && isUserDetailType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, @Nullable ModelAndViewContainer mavContainer, NativeWebRequest webRequest, @Nullable WebDataBinderFactory binderFactory) throws Exception {
        return httpSession.getAttribute(CustomHttpSessionSecurityContextRepository.AUTHORIZED_KEY);
    }
}
