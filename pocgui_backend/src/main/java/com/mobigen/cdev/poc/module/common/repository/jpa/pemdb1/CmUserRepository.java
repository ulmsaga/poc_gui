package com.mobigen.cdev.poc.module.common.repository.jpa.pemdb1;

import com.mobigen.cdev.poc.module.common.entity.pemdb1.CmUserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface CmUserRepository extends JpaRepository<CmUserEntity, String> {
}
