package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.exception.RsRuntimeException;
import com.mobigen.cdev.poc.core.file.dto.ExcelDto;
import com.mobigen.cdev.poc.core.file.dto.FileDto;
import com.mobigen.cdev.poc.core.file.excel.handler.ExcelDefaultExceptionHandler;
import com.mobigen.cdev.poc.core.util.annotation.EnvStatus;
import com.mobigen.cdev.poc.module.nw.dto.SignalXdrDto;
import com.mobigen.cdev.poc.module.nw.repository.mybatis.NwSearchRepository;
import org.apache.commons.io.FileUtils;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class NwSearchServiceImpl implements NwSearchService {
    private final NwSearchRepository nwSearchRepository;

    private final Environment env;

    public NwSearchServiceImpl(NwSearchRepository nwSearchRepository, Environment env) {
        this.nwSearchRepository = nwSearchRepository;
        this.env = env;
    }

    @Override
    public List<SignalXdrDto> getSignalCallLogXdr(Map<String, Object> param) {
        return nwSearchRepository.getSignalCallLogXdr(param);
    }

    @Override
    @EnvStatus
    public ExcelDto getSignalCallLogXdrExcel(Map<String, Object> param) {
        ExcelDto excelDto = new ExcelDto();

        try {
            ExcelDefaultExceptionHandler excelDefaultExceptionHandler = new ExcelDefaultExceptionHandler(param);
            nwSearchRepository.getSignalCallLogXdrExcel(param, excelDefaultExceptionHandler);

            if ("".equals(String.valueOf(param.get("sheetName")))) param.put("sheetName", "sheet1");
            if ("".equals(String.valueOf(param.get("fileName")))) param.put("fileName", param.get("sheetName"));
            if ("".equals(String.valueOf(param.get("fileExt")))) param.put("fileExt", "xlsx");

            excelDto.setFile_ext(String.valueOf(param.get("fileExt")));
            excelDto.setFile_name(String.valueOf(param.get("fileName")));
            excelDto.setTarget_path_key(ExcelDto.FILE_PATH_CREATE_EXCEL);
            excelDto.setTarget_file(excelDefaultExceptionHandler.execute());

        } catch (Exception e) {
            throw new RsRuntimeException("error.common.excel.file");
        }

        return excelDto;
    }

    @Override
    @EnvStatus
    public FileDto getPacketFile(Map<String, Object> param) {
        FileDto ret = new FileDto();

        String fileUploadPath = env.getProperty("file.path.upload.docu");
        String pcapFilePath = "";
        String pcapFileName = "";
        List<FileDto> fileList = nwSearchRepository.getPaketTargetFile(param);
        if (fileList.size() > 0) {
            pcapFilePath = fileList.get(0).getTarget_file_path();
            pcapFileName = fileList.get(0).getFile_name();
            File file = new File(pcapFilePath + pcapFileName);
            File newFile = new File(fileUploadPath + pcapFileName);

            try {
                FileUtils.copyFile(file, newFile);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        ret.setFile_ext("pcap");
        ret.setFile_name(String.valueOf(pcapFileName));
        ret.setTarget_file(String.valueOf(pcapFileName));

        return ret;
    }
}
