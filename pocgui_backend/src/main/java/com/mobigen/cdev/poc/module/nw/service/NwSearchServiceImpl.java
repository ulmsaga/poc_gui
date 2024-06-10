package com.mobigen.cdev.poc.module.nw.service;

import com.mobigen.cdev.poc.core.file.dto.FileDto;
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
