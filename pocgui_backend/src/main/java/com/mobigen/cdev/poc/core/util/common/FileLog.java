package com.mobigen.cdev.poc.core.util.common;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;

public class FileLog {
	private static FileLog fileLog = null;
  private Environment env;
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
  public FileLog() {
    this.env = BeanUtils.getEnv();
  }

	public static synchronized FileLog getInstance(){
		if(fileLog==null){
			 fileLog=new FileLog();
		}
		return fileLog;
	}
	
	public void writeLog(String log, String logType){
		Calendar cal=Calendar.getInstance();
		SimpleDateFormat formatterDateTime=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		SimpleDateFormat formatterDate=new SimpleDateFormat("yyyyMMdd");
		String currTime=formatterDateTime.format(cal.getTime());
		String currDate=formatterDate.format(cal.getTime());
		
		try {
			log="["+currTime+"] "+log;
      
			String sPath=env.getProperty("file.path.log.etc");
			String sFile=logType+"."+currDate+".log";
			
			BufferedWriter bw=new BufferedWriter(new FileWriter(sPath+sFile, true));
			bw.write(log);
			bw.newLine();
			bw.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}
	
	public void writeCrLf(String logType) {
		Calendar cal=Calendar.getInstance();
		SimpleDateFormat formatterDate=new SimpleDateFormat("yyyyMMdd");
		String currDate=formatterDate.format(cal.getTime());
		
		try {
			String sPath=env.getProperty("file.path.log.etc");
			String sFile=logType+"."+currDate+".log";
			
			BufferedWriter bw=new BufferedWriter(new FileWriter(sPath+sFile, true));
			bw.newLine();
			bw.close();
		} catch (IOException e) {
			logger.error(e.getMessage());
		}
	}
	
	public String getEnvStatus() {
		String envStatus = "";
		envStatus = env.getProperty("env.status");
		return envStatus;
	}
	
	public String allowDaoInterceptor() {
		String ret = "N";
		ret = env.getProperty("poc.config.log.allow-dao");
		return ret;
	}
  
  
}
