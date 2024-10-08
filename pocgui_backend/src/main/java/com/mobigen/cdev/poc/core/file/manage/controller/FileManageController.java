package com.mobigen.cdev.poc.core.file.manage.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.core.file.manage.service.FileManageService;
import com.mobigen.cdev.poc.core.security.util.aria.ARIAEngine;

@RestController
@RequestMapping("/common/filemanage")
public class FileManageController {
    
    private final FileManageService fileManageService;
    private final Environment env;
    @SuppressWarnings("unused")
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public FileManageController(FileManageService fileManageService, Environment env) {
        this.fileManageService = fileManageService;
        this.env = env;
    }

    @RequestMapping(value = "/fileDownload", method = {RequestMethod.GET, RequestMethod.POST}, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void getFileDownLoad(@RequestParam Map<String, Object> param, HttpServletRequest request, HttpServletResponse response) {
        //
        String targetFile = param.get("targetFile").toString();
        if (!fileManageService.checkValidTargetFileName(targetFile)) {
            throw new RsRuntimeException("error.common.file.download");
        }

        String targetPathKey = param.get("targetPathKey").toString();
        if ("".equals(targetPathKey)) targetPathKey = FileDto.FILE_PATH_UPLOAD_DOCU;
        String targetPath = env.getProperty(targetPathKey);
        // String targetFilePath = param.get("targetFilePath").toString();

        String targetFileDecrypt = "";
        try {
            targetFileDecrypt = ARIAEngine.getDecrypt(targetFile, FileDto.FILE_ENC_KEY);    
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.file.download");
        }

        // String targetFilePath = targetPath + targetFile;
        String targetFilePath = targetPath + targetFileDecrypt;
        //
        String protectFile = "N";
        if (param.get("protectFile") != null) {
            protectFile = param.get("protectFile").toString();
        }

        try {
            if (!fileManageService.checkValidTargetFilePath(targetFilePath)) {
                throw new RsRuntimeException("error.common.file.download");
            }
        } catch (Exception e) {
            throw new RsRuntimeException("error.common.file.download");
        }

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        String fileTime = simpleDateFormat.format(new Date());


        String fileFullName = param.get("fileName").toString() + "_" + fileTime + "." + param.get("fileExt").toString();
        FileInputStream fileInputStream = null;
        try {
            response.setHeader("Content-Disposition", "attachment;filename=\"" + URLEncoder.encode(fileFullName, StandardCharsets.UTF_8) + "\";");
            response.setHeader("Content-transfer-Encoding", "binary");
            response.setContentType("application/octet-stream");

            OutputStream outputStream = response.getOutputStream();
            fileInputStream = new FileInputStream(targetFilePath);
            FileCopyUtils.copy(fileInputStream, outputStream);
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RsRuntimeException("error.common.file.download");
        } finally {
            if (fileInputStream != null) {
                try {
                    fileInputStream.close();
                } catch (Exception e) {
                    throw new RsRuntimeException("error.common.file.download");
                }
            }
        }

        String createExcelFilePath = env.getProperty("file.path.create.excel");
        String fileType = param.get("fileExt").toString().toLowerCase();
        if (fileType.contains("xls")) fileType = "xlsx";

        // Excel 파일이고, ProtectFile(보관용) 아닐경우 바로 지워 준다.
        if (createExcelFilePath != null && "xlsx".equals(fileType) && targetFilePath.contains("xls") && targetFilePath.contains(createExcelFilePath) && "N".equals(protectFile)) {
            File file = null;
            try {
                file = new File(targetFilePath);
            } catch (Exception e) {
                throw new RsRuntimeException("error.common.file.download");
            } finally {
                if (file != null) {
                    file.delete();
                }
            }
        }
    }
    
}
