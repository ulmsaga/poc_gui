package com.mobigen.cdev.poc.core.security.component;

import com.mobigen.cdev.poc.core.security.dto.UserDto;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;


@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private UserDto userDto;
    
    public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}

	public Authentication authenticate(UserDto userDto, Authentication authentication) {
        this.userDto = userDto;
        return this.authenticate(authentication);
    }

    @SuppressWarnings("unused")
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String principal = authentication.getPrincipal().toString();
        String credential = authentication.getCredentials().toString();
        return new UsernamePasswordAuthenticationToken(userDto, credential, userDto.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return false;
    }
}
