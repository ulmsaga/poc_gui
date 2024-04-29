package com.mobigen.cdev.poc.core.security.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserDto implements UserDetails {
    private static final long serialVersionUID = -4855814495743785060L;

    public static final int AUTH_PASSED_STATUS = 1;
    public static final int AUTH_NOT_AUTHENTICATED_STATUS = 0;
    public static final int AUTH_FAILED_STATUS = -1;

    // User Info
    private String user_id;
    private String user_name;
    private String password;

    // User Info (부가정보)
    private String phone;
    private String email;
    private String insa_team_id;
    private String insa_team_name;

    // AuthenticationStatus (1차, 2차 인증)
    private int firstAuthenticationStatus = AUTH_NOT_AUTHENTICATED_STATUS;
    private int secondaryAuthenticationStatus = AUTH_NOT_AUTHENTICATED_STATUS;
    
    private String authFailMsg = "";

    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.user_name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

    public String getUser_id() {
        return user_id;
    }

    public UserDto setUser_id(String user_id) {
        this.user_id = user_id;
        return this;
    }

    public String getUser_name() {
        return user_name;
    }

    public UserDto setUser_name(String user_name) {
        this.user_name = user_name;
        return this;
    }

    public String getPhone() {
        return phone;
    }

    public UserDto setPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public String getEmail() {
        return email;
    }

    public UserDto setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getInsa_team_id() {
        return insa_team_id;
    }

    public UserDto setInsa_team_id(String insa_team_id) {
        this.insa_team_id = insa_team_id;
        return this;
    }

    public String getInsa_team_name() {
        return insa_team_name;
    }

    public UserDto setInsa_team_name(String insa_team_name) {
        this.insa_team_name = insa_team_name;
        return this;
    }

    public int getFirstAuthenticationStatus() {
        return firstAuthenticationStatus;
    }

    public UserDto setFirstAuthenticationStatus(int firstAuthenticationStatus) {
        this.firstAuthenticationStatus = firstAuthenticationStatus;
        return this;
    }

    public int getSecondaryAuthenticationStatus() {
        return secondaryAuthenticationStatus;
    }

    public UserDto setSecondaryAuthenticationStatus(int secondaryAuthenticationStatus) {
        this.secondaryAuthenticationStatus = secondaryAuthenticationStatus;
        return this;
    }

    public String getAuthFailMsg() {
        return authFailMsg;
    }

    public UserDto setAuthFailMsg(String authFailMsg) {
        this.authFailMsg = authFailMsg;
        return this;
    }
}
