package com.mobigen.cdev.poc.core.security.component;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;

import com.mobigen.cdev.poc.core.security.dto.UserDto;

@SuppressWarnings("deprecation")
@Component
public class CustomHttpSessionSecurityContextRepository implements SecurityContextRepository {

    public static final String AUTHORIZED_KEY = "_^AUTHORIZED_POC^_";

    @Override
    public void saveContext(SecurityContext securityContext, HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = securityContext.getAuthentication();
        if (authentication != null) {
            if (authentication.getPrincipal() != null && authentication.getPrincipal() instanceof UserDto) {
                HttpSession httpSession = request.getSession(!response.isCommitted());
                if (httpSession != null) {
                    UserDto userDto = (UserDto) authentication.getPrincipal();
                    setGrantedAuthority(userDto);
                    httpSession.setAttribute(AUTHORIZED_KEY, userDto);
                }
            }
        } else {
            HttpSession httpSession = request.getSession();
            if (httpSession != null) httpSession.removeAttribute(AUTHORIZED_KEY);
        }
    }

    @Override
    public boolean containsContext(HttpServletRequest request) {
        HttpSession httpSession = request.getSession(false);
        if (httpSession == null) return false;
        return httpSession.getAttribute(AUTHORIZED_KEY) != null;
    }

    // deprecated
    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        SecurityContext securityContext = new SecurityContextImpl();
        HttpServletRequest request = requestResponseHolder.getRequest();
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            UserDto userDto = (UserDto) httpSession.getAttribute(AUTHORIZED_KEY);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDto, httpSession.getId(), userDto.getAuthorities());
            securityContext.setAuthentication(token);
        }
        return securityContext;
    }
    
	@Override
    public Supplier<SecurityContext> loadContext(HttpServletRequest request) {
    	Supplier<SecurityContext> supplier = () -> new SecurityContextImpl();
    	SecurityContext securityContext = supplier.get();
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            UserDto userDto = (UserDto) httpSession.getAttribute(AUTHORIZED_KEY);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDto, httpSession.getId(), userDto.getAuthorities());
            securityContext.setAuthentication(token);
        }
        supplier = () -> securityContext;
        return supplier;
    }
	
    public SecurityContext loadContextCust(HttpServletRequest request) {
        SecurityContext securityContext = new SecurityContextImpl();
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            UserDto userDto = (UserDto) httpSession.getAttribute(AUTHORIZED_KEY);
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userDto, httpSession.getId(), userDto.getAuthorities());
            securityContext.setAuthentication(token);
        }
        return securityContext;
    }
    
    // Session 인증
    public boolean isAuthentication(HttpServletRequest request) {
        boolean ret = false;
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            UserDto userDto =  (UserDto) httpSession.getAttribute(AUTHORIZED_KEY);
            if (userDto != null) ret = true;
        }
        return ret;
    }

    // Session 인증 + Second (SMS) 인증
    public boolean isFullAuthentication(HttpServletRequest request) {
    	boolean ret = false;
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            UserDto userDto =  (UserDto) httpSession.getAttribute(AUTHORIZED_KEY);
			if (userDto != null) {
				if (userDto.getSecondaryAuthenticationStatus() == UserDto.AUTH_PASSED_STATUS) {
					// 2차인증 PASSED
					ret = true;
				}
			}
        }
        return ret;
    }
    
    private void setGrantedAuthority(UserDto userDto) {
		List<GrantedAuthority> grantedAuthority = new ArrayList<>();
        // ADMIN_LV / MODULE_A_LV / MODULE_B_LV / MODULE_C_LV
        // grantedAuthority.add(new SimpleGrantedAuthority("ADMIN_LV_" + userDto.getAdmin_lv()));
        // grantedAuthority.add(new SimpleGrantedAuthority("A_LV_" + userDto.getModule_a_lv()));
        // grantedAuthority.add(new SimpleGrantedAuthority("B_LV_" + userDto.getModule_b_lv()));
        // grantedAuthority.add(new SimpleGrantedAuthority("C_LV_" + userDto.getModule_c_lv()));
        userDto.setAuthorities(grantedAuthority);
	}

}
