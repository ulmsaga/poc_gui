package com.mobigen.cdev.poc.core.util.common;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Iterator;
import java.util.Map;
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

    public static boolean isEmpty(Object param) {
        if(param == null) return true;
        else if(String.valueOf(param).length() == 0) return true;
        else if(String.valueOf(param).trim().length() == 0) return true;
        else return false;
    }

    public static Map<String, Object> sqlInjectionForParam(Map<String, Object> param) {
        Iterator<String> keys = param.keySet().iterator();
        while(keys.hasNext()) {
            String key = keys.next();
            if (param.get(key) instanceof String) {
                param.put(key, sqlInjectionFilter(param.get(key).toString()));
            }
        }
        return param;
    }

    public static Map<String, Object> sqlInjectionAbbrForParam(Map<String, Object> param) {
        Iterator<String> keys = param.keySet().iterator();
        while(keys.hasNext()) {
            String key = keys.next();
            if (param.get(key) instanceof String) {
                param.put(key, sqlInjectionAbbrFilter(param.get(key).toString()));
            }
        }
        return param;
    }

    public static String sqlInjectionFilter(String str){
        // Pattern ptn=Pattern.compile("['\"\\-#()@;=*/+]");
        Pattern ptn=Pattern.compile("['\"\\-#()@;=*+]");
        str=ptn.matcher(str).replaceAll("");
        String str_low=str.toLowerCase();
        if(str_low.contains("union")||str_low.contains("select")||str_low.contains("insert")||str_low.contains("drop")
                ||str_low.contains("update")||str_low.contains("delete")||str_low.contains("join")||str_low.contains("from")
                ||str_low.contains("where")||str_low.contains("substr")||str_low.contains("user_tables")||str_low.contains("user_tab_columns")){

            str=str_low;
            str=str.replaceAll("union", "q-union");
            str=str.replaceAll("select", "q-select");
            str=str.replaceAll("insert", "q-insert");
            // cei column명 중 drop 이 포함 된 경우 때문에 임시 주석처리
            // str=str.replaceAll("drop", "q-drop");
            str=str.replaceAll("update", "q-update");
            str=str.replaceAll("delete", "q-delete");
            str=str.replaceAll("join", "q-join");
            str=str.replaceAll("from", "q-from");
            str=str.replaceAll("where", "q-where");
            str=str.replaceAll("substr", "q-substr");
            str=str.replaceAll("user_tables", "q-user_tables");
            str=str.replaceAll("user_tab_columns", "q-user_tab_columns");
        }
        return str;
    }

    public static String sqlInjectionAbbrFilter(String str){
        Pattern ptn=Pattern.compile("['\"\\#@;=*+]");
        str=ptn.matcher(str).replaceAll("");
        String str_low=str.toLowerCase();
        if(str_low.contains("union")||str_low.contains("select")||str_low.contains("insert")||str_low.contains("drop")
                ||str_low.contains("update")||str_low.contains("delete")||str_low.contains("join")||str_low.contains("from")
                ||str_low.contains("where")||str_low.contains("substr")||str_low.contains("user_tables")||str_low.contains("user_tab_columns")){

            str=str_low;
            str=str.replaceAll("union", "q-union");
            str=str.replaceAll("select", "q-select");
            str=str.replaceAll("insert", "q-insert");
            str=str.replaceAll("drop", "q-drop");
            str=str.replaceAll("update", "q-update");
            str=str.replaceAll("delete", "q-delete");
            str=str.replaceAll("join", "q-join");
            str=str.replaceAll("from", "q-from");
            str=str.replaceAll("where", "q-where");
            str=str.replaceAll("substr", "q-substr");
            str=str.replaceAll("user_tables", "q-user_tables");
            str=str.replaceAll("user_tab_columns", "q-user_tab_columns");
        }
        return str;
    }

    public static String sqlInjectionExceptionEqFilter(String str) {
        // Pattern ptn=Pattern.compile("['\"\\-#()@;*/+]");
        Pattern ptn=Pattern.compile("['\"\\-#()@;*+]");
        str=ptn.matcher(str).replaceAll("");
        String str_low=str.toLowerCase();
        if(str_low.contains("union")||str_low.contains("select")||str_low.contains("insert")||str_low.contains("drop")
                ||str_low.contains("update")||str_low.contains("delete")||str_low.contains("join")||str_low.contains("from")
                ||str_low.contains("where")||str_low.contains("substr")||str_low.contains("user_tables")||str_low.contains("user_tab_columns")){

            str=str_low;
            str=str.replaceAll("union", "q-union");
            str=str.replaceAll("select", "q-select");
            str=str.replaceAll("insert", "q-insert");
            str=str.replaceAll("drop", "q-drop");
            str=str.replaceAll("update", "q-update");
            str=str.replaceAll("delete", "q-delete");
            str=str.replaceAll("join", "q-join");
            str=str.replaceAll("from", "q-from");
            str=str.replaceAll("where", "q-where");
            str=str.replaceAll("substr", "q-substr");
            str=str.replaceAll("user_tables", "q-user_tables");
            str=str.replaceAll("user_tab_columns", "q-user_tab_columns");
        }
        return str;
    }

    public static String lpad(String strSource, int iLength, char cPadder){
        StringBuffer sbBuffer = null;
        if (!isEmpty(strSource)){
            int iByteSize = getByteSize(strSource);
            if (iByteSize > iLength){
                return strSource.substring(0, iLength);
            }else if (iByteSize == iLength){
                return strSource;
            }else{
                int iPadLength = iLength - iByteSize;
                sbBuffer = new StringBuffer();
                for (int j = 0; j < iPadLength; j++){
                    sbBuffer.append(cPadder);
                }
                sbBuffer.append(strSource);
                return sbBuffer.toString();
            }
        }
        //int iPadLength = iLength;
        sbBuffer = new StringBuffer();
        for (int j = 0; j < iLength; j++){
            sbBuffer.append(cPadder);
        }
        return sbBuffer.toString();
    }

    public static String rpad(String strSource, int iLength, char cPadder){
        StringBuffer sbBuffer = null;
        if (!isEmpty(strSource)){
            int iByteSize = getByteSize(strSource);
            if (iByteSize > iLength){
                return strSource.substring(0, iLength);
            }else if (iByteSize == iLength){
                return strSource;
            }else{
                int iPadLength = iLength - iByteSize;
                sbBuffer = new StringBuffer(strSource);
                for (int j = 0; j < iPadLength; j++){
                    sbBuffer.append(cPadder);
                }
                return sbBuffer.toString();
            }
        }
        sbBuffer = new StringBuffer();
        for (int j = 0; j < iLength; j++){
            sbBuffer.append(cPadder);
        }
        return sbBuffer.toString();
    }

    public static int getByteSize(String str){
        if (str == null || str.length() == 0)
            return 0;
        byte[] byteArray = null;
        try{
            byteArray = str.getBytes("UTF-8");
        }catch (UnsupportedEncodingException ex){}

        if (byteArray == null) return 0;
        return byteArray.length;
    }


    public static String NowDateToString(String aFormat){
        SimpleDateFormat formatter_ymdhms = new SimpleDateFormat (aFormat);
        java.util.Date curTime = new java.util.Date();
        return formatter_ymdhms.format(curTime);
    }
}
