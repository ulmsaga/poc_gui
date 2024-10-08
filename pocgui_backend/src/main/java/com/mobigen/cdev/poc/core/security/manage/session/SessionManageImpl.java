package com.mobigen.cdev.poc.core.security.manage.session;

import java.util.function.Supplier;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.mobigen.cdev.poc.core.base.dto.RsResultDto;
import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.security.component.CustomAuthenticationProvider;
import com.mobigen.cdev.poc.core.security.component.CustomHttpSessionSecurityContextRepository;
import com.mobigen.cdev.poc.core.security.dto.UserDto;

@Component
public class SessionManageImpl implements SessionManage {

    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final CustomHttpSessionSecurityContextRepository customHttpSessionSecurityContextRepository;

    @Autowired
    public SessionManageImpl(CustomAuthenticationProvider customAuthenticationProvider, CustomHttpSessionSecurityContextRepository customHttpSessionSecurityContextRepository) {
        this.customAuthenticationProvider = customAuthenticationProvider;
        this.customHttpSessionSecurityContextRepository = customHttpSessionSecurityContextRepository;
    }

    @Override
    public boolean authentication(UserDto userDto, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDto.getUser_id(), request.getSession().getId());
        Authentication authentication = customAuthenticationProvider.authenticate(userDto, authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        customHttpSessionSecurityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
        return isAuthorizated(request, response);
    }

    @Override
    public boolean isAuthorizated(HttpServletRequest request, HttpServletResponse response) {
        return customHttpSessionSecurityContextRepository.isAuthentication(request);
    }
    
    @Override
    public boolean isFullAuthentication(HttpServletRequest request, HttpServletResponse response) {
        return customHttpSessionSecurityContextRepository.isFullAuthentication(request);
    }
    
    @Override
    public UserDto getUserByContextRepository(HttpServletRequest request, HttpServletResponse response) {
        UserDto userDto = new UserDto();
        Supplier<SecurityContext> supplier = customHttpSessionSecurityContextRepository.loadContext(request);
        SecurityContext securityContext = supplier.get();
        if (securityContext != null) {
            if (securityContext.getAuthentication() != null) {
                userDto = (UserDto) securityContext.getAuthentication().getPrincipal();
            }
        }
        return userDto;
    }

    @Override
    public void expireAuthorization(HttpServletRequest request, HttpServletResponse response) {
        SecurityContextHolder.clearContext();
        customHttpSessionSecurityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
    }
    
    @Override
    public int updateFirstAuthStatus(int firstAuthenticationStatus, HttpServletRequest request, HttpServletResponse response) {
    	int ret = RsResultDto.RESULT_NONE;
    	try {
    		UserDto userDto = getUserByContextRepository(request, response);
        	userDto.setFirstAuthenticationStatus(firstAuthenticationStatus);
        	customAuthenticationProvider.setUserDto(userDto);
        	ret = RsResultDto.RESULT_SUCCESS;
		} catch (Exception e) {
			ret = RsResultDto.RESULT_FAIL;
			throw new RsRuntimeException("error.common.rsRuntimeException");
		}
    	return ret;
    }
    
    @Override
    public int updateSecondAuthStatus(int secondaryAuthenticationStatus, HttpServletRequest request, HttpServletResponse response) {
    	int ret = RsResultDto.RESULT_NONE;
    	try {
    		UserDto userDto = getUserByContextRepository(request, response);
        	userDto.setSecondaryAuthenticationStatus(secondaryAuthenticationStatus);
        	customAuthenticationProvider.setUserDto(userDto);
        	ret = RsResultDto.RESULT_SUCCESS;
		} catch (Exception e) {
			ret = RsResultDto.RESULT_FAIL;
			throw new RsRuntimeException("error.common.rsRuntimeException");
		}
    	return ret;
    }
    
    @Override
    public int updateUserInfo(UserDto userDto, HttpServletRequest request, HttpServletResponse response) {
    	int ret = RsResultDto.RESULT_NONE;
    	try {
        	customAuthenticationProvider.setUserDto(userDto);
        	ret = RsResultDto.RESULT_SUCCESS;
		} catch (Exception e) {
			ret = RsResultDto.RESULT_FAIL;
			throw new RsRuntimeException("error.common.rsRuntimeException");
		}
    	return ret;
    }
}
