package com.mobigen.cdev.poc.core.security.util.tangosso;



import java.io.IOException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mobigen.cdev.poc.core.util.common.RestUtil;

//import com.skt.e2e.util.exception.GlobalException;

@Component
public class TangoSSO {
	
	public static final String SYSTEM_ID="85";
	
	private static String LOGIN_URL = null;
	private static String TOKEN_URL = null;
	private static String LOGOUT_URL = null;
    
	private final MessageSourceAccessor messageSourceAccessor;
	
	@Autowired
    public TangoSSO(Environment env, MessageSourceAccessor messageSourceAccessor) {
		LOGIN_URL = env.getProperty("tango.sso.login.url");
    	TOKEN_URL = env.getProperty("tango.sso.token.url");
    	LOGOUT_URL = env.getProperty("tango.sso.logout.url");
    	this.messageSourceAccessor = messageSourceAccessor;
	}
    
	
    /**
	 * @param systemId
	 * @param userId
	 * @param userPwd
	 * @return TangoLoginEntity
	 */
	@SuppressWarnings("rawtypes")
	public Map loginSha512(String systemId, String userId, String userPwd){
		Map login = null;
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("systmId", systemId);
		params.put("userId", userId);
		params.put("userPwd", encryptSHA512(userPwd + userId));
		params.put("userPwdEx", encryptSHA512(userPwd));
		
		login = certificationTangoSSO(TangoSSO.LOGIN_URL, params);
		
		return login;
	}
		
	/**
	 * @param systemId
	 * @param userId
	 * @param userPwd
	 * @param userPwdEx
	 * @return TangoLoginEntity
	 */
	@SuppressWarnings("rawtypes")
	public Map login(String systemId, String userId, String userPwd, String userPwdEx) {
		Map login = null;
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("systmId", systemId);
		params.put("userId", userId);
		params.put("userPwd", userPwd);
		params.put("userPwdEx", userPwdEx);
		
		login = certificationTangoSSO(TangoSSO.LOGIN_URL, params);
    	
		return login;
	}
		
	/**
	 * @param systemId
	 * @param tokenId
	 * @return TangoLoginEntity
	 */
	@SuppressWarnings("rawtypes")
	public Map certificateToken(String systemId, String tokenId) {
		Map login = null;
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("systmId", systemId);
		params.put("tokenId", tokenId);
		
		login = certificationTangoSSO(TangoSSO.TOKEN_URL, params);
		
		return login;
	}
		
	/**
	 * @param tokenId
	 */
	public void logout(String tokenId) {
		ObjectMapper mapper = new ObjectMapper();
		
		Map<String, String> params = new HashMap<String, String>();
		
		params.put("tokenId", tokenId);
		
    	mapper.setSerializationInclusion(Include.NON_EMPTY);
    	String body;
		try {
			body = mapper.writeValueAsString(params);
			
			org.apache.http.client.HttpClient httpClient = RestUtil.getHttpClient();
	    	
			HttpPost req = new HttpPost(TangoSSO.LOGOUT_URL);
	    	StringEntity param = new StringEntity(body, "utf-8");
	    	req.addHeader("content-type", "application/json");
	    	req.setEntity(param);
	    	
	    	httpClient.execute(req);
	    	
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@SuppressWarnings("rawtypes")
	private Map certificationTangoSSO(String url, Map<String, String> params){
		Map login = null;
		
		ObjectMapper mapper = new ObjectMapper();
    	mapper.setSerializationInclusion(Include.NON_EMPTY);
    	String body;
		try {
			body = mapper.writeValueAsString(params);
			
			HttpClient httpClient = RestUtil.getHttpClient();
	    	
			HttpPost req = new HttpPost(url);
	    	StringEntity param = new StringEntity(body, "utf-8");
	    	req.addHeader("content-type", "application/json");
	    	req.setEntity(param);
	    	
	    	HttpResponse res = httpClient.execute(req);
	    	
	    	if (res.getEntity() != null) {
	    		String responseBody = EntityUtils.toString(res.getEntity(), "UTF-8");
	    		if (StringUtils.isNotBlank(responseBody) && !"OK".equals(responseBody)) {
	    			login = mapper.readValue(responseBody, Map.class);
	    		}
	    	}
	    	
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
    	
		return login;
	}
	
	public String ErrorMsg(int code){
		return messageSourceAccessor.getMessage(ErrorMsgResouce(code));
	}
	
	public String ErrorMsgResouce(int code){
		String result = null;
		
		switch(code){
		case -1000:
			result = "message.login.fail.incorrect";
			break;
		case -1001:
			result = "message.login.fail.impossible";
			break;
		case -1002:
			result = "message.login.fail.locked";
			break;
		case -1003:
			result = "message.login.fail";
			break;
		case -1004:
			result = "message.login.fail";
			break;
		case -1005:
			result = "message.login.fail";
			break;
		case -1006:
			result = "message.login.fail";
			break;
		case -1007:
			result = "message.login.fail";
			break;
		case -1008:
			result = "message.login.fail";
			break;
		case -1009:
			result = "message.login.fail";
			break;
		case -1010:
			result = "message.login.fail.none.auth";
			break;
		case -1011:
			result = "message.login.fail.incorrect";
			break;
		case -9000:
			result = "message.login.fail.unknown";
			break;
		}
		
		return result;
	}
	
	private final String encryptSHA512(String str){
		try{
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(str.getBytes());
			byte byteData[] = md.digest();
			
			StringBuffer hashCodeBuffer = new StringBuffer();
			for(int i=0; i<byteData.length; i++){
				hashCodeBuffer.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			return hashCodeBuffer.toString();
		}catch(NoSuchAlgorithmException e){
			throw new RuntimeException(e);
		}
	}
	
}

