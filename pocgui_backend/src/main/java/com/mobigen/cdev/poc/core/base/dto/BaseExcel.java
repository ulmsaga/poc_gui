package com.mobigen.cdev.poc.core.base.dto;

import java.io.Serializable;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.core.security.util.aria.ARIAEngine;

public class BaseExcel implements Serializable {
    private static final long serialVersionUID = 6210415775176667711L;

    public static final String FILE_PATH_CREATE_EXCEL = "file.path.create.excel";

    //RESULT EXCEL
    @Deprecated
    protected String target_file_path = "";

    protected String target_path_key = FILE_PATH_CREATE_EXCEL;
    protected String target_file = "";

    protected String file_name = "";
    protected String file_ext = "";

    //PARAM EXCEL
    protected String titleName = "";
    protected String columnId = "";
    protected String groupInfo = "";
    protected String sheetName = "";

    //PARAM EXCEL FILE
    @Deprecated
    protected String targetFilePath = "";
    
    protected String targetPathKey = "";
    protected String targetFile = "";

    protected String fileName = "";
    protected String fileExt = "";

    //RESULT MESSAGE
    protected String result_message = "";

    public String getTarget_file_path() {
        return target_file_path;
    }

    public BaseExcel setTarget_file_path(String target_file_path) {
        this.target_file_path = target_file_path;
        return this;
    }

    public String getFile_name() {
        return file_name;
    }

    public BaseExcel setFile_name(String file_name) {
        this.file_name = file_name;
        return this;
    }

    public String getFile_ext() {
        return file_ext;
    }

    public BaseExcel setFile_ext(String file_ext) {
        this.file_ext = file_ext;
        return this;
    }

    public String getTitleName() {
        return titleName;
    }

    public BaseExcel setTitleName(String titleName) {
        this.titleName = titleName;
        return this;
    }

    public String getColumnId() {
        return columnId;
    }

    public BaseExcel setColumnId(String columnId) {
        this.columnId = columnId;
        return this;
    }

    public String getGroupInfo() {
        return groupInfo;
    }

    public BaseExcel setGroupInfo(String groupInfo) {
        this.groupInfo = groupInfo;
        return this;
    }

    public String getSheetName() {
        return sheetName;
    }

    public BaseExcel setSheetName(String sheetName) {
        this.sheetName = sheetName;
        return this;
    }

    public String getTargetFilePath() {
        return targetFilePath;
    }

    public BaseExcel setTargetFilePath(String targetFilePath) {
        this.targetFilePath = targetFilePath;
        return this;
    }

    public String getFileName() {
        return fileName;
    }

    public BaseExcel setFileName(String fileName) {
        this.fileName = fileName;
        return this;
    }

    public String getFileExt() {
        return fileExt;
    }

    public BaseExcel setFileExt(String fileExt) {
        this.fileExt = fileExt;
        return this;
    }

    public String getResult_message() {
        return result_message;
    }

    public BaseExcel setResult_message(String result_message) {
        this.result_message = result_message;
        return this;
    }

    public String getTarget_path_key() {
        return target_path_key;
    }

    public void setTarget_path_key(String target_path_key) {
        if ("".equals(target_path_key) || target_path_key == null) {
            this.target_path_key = FILE_PATH_CREATE_EXCEL;
        } else {
            this.target_path_key = target_path_key;
        }
    }

    public String getTarget_file() {
        return target_file;
    }

    public void setTarget_file(String target_file) {
        // this.target_file = target_file;
        try {
            this.target_file = ARIAEngine.getEncrypt(target_file, FileDto.FILE_ENC_KEY);
        } catch (Exception e) {
            throw new RsRuntimeException(e);
        }
    }

    public String getTargetPathKey() {
        return targetPathKey;
    }

    public void setTargetPathKey(String targetPathKey) {
        this.targetPathKey = targetPathKey;
    }

    public String getTargetFile() {
        return targetFile;
    }

    public void setTargetFile(String targetFile) {
        this.targetFile = targetFile;
    }
}
