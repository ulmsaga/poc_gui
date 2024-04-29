package com.mobigen.cdev.poc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class SecurityConfig {
	
	/**
	 * 
	 * Spring Security Filter
	 * 등록된 Api Module Path만 허용
	 * 추가되는 Module Path는 이곳에 등록 (필수)
	 * 그 외 Path는 차단
	 * (참고 Session / Api 검사는 이후 interceptor Hanlder를 통해 진행)
	 * 
	 */
	
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/login/**").permitAll()
                .antMatchers("/common/**").permitAll()
                .antMatchers("/usermanage/**").permitAll()
                .antMatchers("/sse/subscribe/**").permitAll()
                .antMatchers("/notification/**").permitAll()
                .antMatchers("/test/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .csrf().disable();

        // for clickjacking
        http.headers().frameOptions().sameOrigin();
        return http.build();
    }

    /*@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers("**");
    }*/
}
