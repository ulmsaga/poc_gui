package com.mobigen.cdev.poc.core.file.manage.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.component.ConfigFile;
import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.core.util.common.Cutil;

@Service
public class FileManageServiceImpl implements FileManageService {

  private final Environment env;
  private final ConfigFile configFile;
  private List<String> availablePathList;
  @SuppressWarnings("unused")
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  @Autowired
  public FileManageServiceImpl(Environment env, ConfigFile configFile) {
    this.env = env;
    this.configFile = configFile;
    setAvailablePath();
  }

  @Override
  public List<FileDto> updateMultipartFiles(MultipartFile[] files) {
    String path = env.getProperty("file.path.upload.docu");
    String orgFileName = null;
		String orgFileExtension = null;
		String storedFileName = null;
    List<FileDto> fileList = new ArrayList<FileDto>();
    for (MultipartFile multipartFile : files) {
      if (multipartFile != null && !multipartFile.isEmpty()) {
        orgFileName = multipartFile.getOriginalFilename();
        if (orgFileName != null) orgFileExtension = orgFileName.substring(orgFileName.lastIndexOf("."));

        if(Cutil.chkSpcStr(orgFileName)){
          throw new RsRuntimeException("error.common.file.name");
        }
        if (orgFileExtension != null) {
          if(!Cutil.chkConfirmExt(orgFileExtension.replace(".", "").toLowerCase())){
            throw new RsRuntimeException("error.common.file.ext");
          }
        }

        storedFileName = Cutil.getRandomString() + orgFileExtension;

        
        File file = new File(path);
        if (!file.exists()) {
          file.mkdir();
        }
        file = new File(path + storedFileName);
        try {
          if (!checkValidTargetFilePath(path)) {
            throw new RsRuntimeException("error.common.file.download");
          }
          multipartFile.transferTo(file);
          FileDto fileDto = new FileDto();
          fileDto.setClient_file_name(orgFileName);
          fileDto.setFile_name(storedFileName);
          if (orgFileExtension == null) {
            fileDto.setFile_ext("");
          } else {
            fileDto.setFile_ext(orgFileExtension.replace(".", "").toUpperCase());
          }
          fileDto.setFile_size(multipartFile.getSize());
          fileDto.setTarget_file_path(path);
          fileList.add(fileDto);
        } catch (IllegalStateException e) {
          throw new RsRuntimeException("error.common.file.download");
        } catch (IOException e) {
          throw new RsRuntimeException("error.common.file.download");
        }
      }
    }
    return fileList;
  }

  private void setAvailablePath() {
    // application-context.yml에 설정 되어 있는 file.path.xxx 패턴. (그 외에는 fileDownload 불가)
    availablePathList = new ArrayList<>();
    finedPath(configFile.getPath());
  }

  @SuppressWarnings("unchecked")
  public void finedPath(Map<String, Object> path) {
    for (String key : path.keySet()) {
        if (path.get(key) instanceof LinkedHashMap) {
            finedPath((Map<String, Object>) path.get(key));
        } else if (path.get(key) instanceof String) {
            finedPath(path.get(key).toString());
        }
    }
  }
  public void finedPath(String path) {
    availablePathList.add(path);
  }

  public boolean checkValidTargetFileName(String targetFileName) {
    boolean ret = true;
    if (targetFileName.contains("/") || targetFileName.contains("\\") || targetFileName.contains(".") || targetFileName.contains("%")) {
      ret = false;
    }
    return ret;
  }

  public boolean checkValidTargetFilePath(String targetFilePath) {
    // 정해져 있는 path만 처리 가능 하도록 체크
    boolean ret = false;
    if (!(targetFilePath.contains("\\../") || targetFilePath.contains("\\..") || targetFilePath.contains("\\.")) ||
          targetFilePath.contains("..") || targetFilePath.contains("./") || targetFilePath.contains("%")) {
        for (String s: availablePathList) {
            if (targetFilePath.contains(s)) {
                ret = true;
                break;
            }
        }
    }
    return ret;
  }
}
