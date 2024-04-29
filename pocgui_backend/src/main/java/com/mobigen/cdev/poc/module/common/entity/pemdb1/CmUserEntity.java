package com.mobigen.cdev.poc.module.common.entity.pemdb1;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


// JPA용 Primary Entity (당분간 사용할 일 없음)
@Entity
@Table(name="cm_user")
public class CmUserEntity {
    @Id
    @Column(name="user_id")
    private String userId;
    @Column(name="user_name")
    private String userName;
    @Column(name="phone")
    private String phone;
    @Column(name="email")
    private String email;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
