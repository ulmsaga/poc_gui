package com.mobigen.cdev.poc.module.common.dto.user;

import com.mobigen.cdev.poc.module.common.entity.pemdb1.CmUserEntity;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-04-29T13:59:14+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
public class UserMapperImpl implements UserMapper {

    @Override
    public UserInfoDto userEntityToUserDto(CmUserEntity cmUserEntity) {
        if ( cmUserEntity == null ) {
            return null;
        }

        UserInfoDto userInfoDto = new UserInfoDto();

        userInfoDto.setUser_id( cmUserEntity.getUserId() );
        userInfoDto.setUser_name( cmUserEntity.getUserName() );
        userInfoDto.setEmail( cmUserEntity.getEmail() );
        userInfoDto.setPhone( cmUserEntity.getPhone() );

        return userInfoDto;
    }
}
