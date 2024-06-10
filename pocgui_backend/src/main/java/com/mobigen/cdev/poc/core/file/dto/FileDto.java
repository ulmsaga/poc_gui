package com.mobigen.cdev.poc.core.file.dto;

import com.mobigen.cdev.poc.core.base.dto.BaseFile;

public class FileDto extends BaseFile {
    private static final long serialVersionUID = -4299942090049957605L;

    public static final String FILE_ENC_KEY = "pocshfkd2023^_";

    private String client_file_name;
    private Long file_size;

    public String getClient_file_name() {
        return client_file_name;
    }
    public void setClient_file_name(String client_file_name) {
        this.client_file_name = client_file_name;
    }
    public Long getFile_size() {
        return file_size;
    }
    public void setFile_size(Long file_size) {
        this.file_size = file_size;
    }
    
    
}
