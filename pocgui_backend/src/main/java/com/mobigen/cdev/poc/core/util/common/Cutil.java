package com.mobigen.cdev.poc.core.util.common;

import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Cutil {

    public static final int MAX_EXCEL_ROW = 1048576;
    public static final String PROFILE_LOCAL = "local";
    public static final String PROFILE_DEVELOP = "dev";
    public static final String PROFILE_STAGING = "stg";
    public static final String PROFILE_PRODUCTION = "prod";

    private static String[] arrConfirmExt = {"gif", "png", "jpg", "jpeg", "doc", "docx", "xls", "xlsx", "hwp", "pcap", "txt", "ppt", "pptx", "pdf"};

    private static final Logger logger = LoggerFactory.getLogger(Cutil.class);

    public Cutil() {}

    public static boolean isNumeric(String s) {
        try {
            Double.parseDouble(s);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public static void sleep(long millisec) {
		try {
			TimeUnit.MILLISECONDS.sleep(millisec);
		} catch (InterruptedException e) {
		}
	}

    public static String getRandomString() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
    public static Boolean chkSpcStr (String str) {
		Pattern ptn=Pattern.compile("[~!@#$%^&*+|<>?:{}'\"]");
		return ptn.matcher(str).find();
	}
	public static Boolean chkConfirmExt (String ext) {
		logger.debug("=======> ext :: " + ext);
        return Arrays.asList(arrConfirmExt).contains(ext);
	}

}
