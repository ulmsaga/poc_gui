package com.mobigen.cdev.poc.core.file.manage.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.mobigen.cdev.poc.core.file.dto.FileDto;

public interface FileManageService {
  List<FileDto> updateMultipartFiles(MultipartFile[] files);
  void finedPath(String path);
  void finedPath(Map<String, Object> path);
  boolean checkValidTargetFileName(String targetFileName);
  boolean checkValidTargetFilePath(String targetFilePath);
}

