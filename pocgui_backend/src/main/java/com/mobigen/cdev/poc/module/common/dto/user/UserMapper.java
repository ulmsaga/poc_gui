package com.mobigen.cdev.poc.module.common.dto.user;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.mobigen.cdev.poc.core.base.dto.IgnoreUnmappedMapperConfig;
import com.mobigen.cdev.poc.module.common.entity.pemdb1.CmUserEntity;


// JPA용 Mapper (당분간 사용할일 없음)
@Mapper(config = IgnoreUnmappedMapperConfig.class)
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    @Mapping(source = "userId", target = "user_id")
    @Mapping(source = "userName", target = "user_name")
    @Mapping(source = "email", target = "email")
    UserInfoDto userEntityToUserDto(CmUserEntity cmUserEntity);
}
