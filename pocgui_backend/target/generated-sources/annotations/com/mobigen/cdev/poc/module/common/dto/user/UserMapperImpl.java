package com.mobigen.cdev.poc.module.common.dto.user;

import com.mobigen.cdev.poc.module.common.entity.pemdb1.CmUserEntity;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-06-15T11:16:10+0900",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 3.38.0.v20240524-2033, environment: Java 17.0.11 (Eclipse Adoptium)"
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
