package com.mobigen.cdev.poc.core.util.common;

import java.io.IOException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.SSLContext;

import com.mobigen.cdev.poc.core.security.dto.RestResultDto;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.config.Registry;
import org.apache.http.config.RegistryBuilder;
import org.apache.http.conn.socket.ConnectionSocketFactory;
import org.apache.http.conn.socket.PlainConnectionSocketFactory;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.protocol.HttpContext;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.ssl.TrustStrategy;
import org.apache.http.util.EntityUtils;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RestUtil {
	@SuppressWarnings("unchecked")
	public static RestResultDto requestGet(String url) throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		
		HttpClient httpClient = RestUtil.getHttpClient();
		HttpGet request = new HttpGet(url);
		HttpResponse result = httpClient.execute(request);

		Map<String, Object> map = null;
		if(result.getEntity() != null) {
			String responseBody = EntityUtils.toString(result.getEntity(), "UTF-8");
			if(StringUtils.isNotBlank(responseBody)) {
				map = mapper.readValue(responseBody, HashMap.class);
			}
		}
		
		RestResultDto restResultDto = new RestResultDto();
		restResultDto.setStatus(result.getStatusLine().getStatusCode());
		restResultDto.setData(map);
		
		return restResultDto;
	}
	
	@SuppressWarnings("unchecked")
	public static RestResultDto requestPost(String url, Map<String, Object> paramMap) throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(Include.NON_EMPTY);
		String body = mapper.writeValueAsString(paramMap);
		
		HttpClient httpClient = RestUtil.getHttpClient();
		HttpPost request = new HttpPost(url);
		StringEntity params = new StringEntity(body, "utf-8");
		request.addHeader("content-type", "application/json");
		request.setEntity(params);
		
		
		HttpResponse result = httpClient.execute(request);
		
		Map<String, Object> map = null;
		if(result.getEntity() != null) {
			String responseBody = EntityUtils.toString(result.getEntity(), "UTF-8");
			if(StringUtils.isNotBlank(responseBody) && !"OK".equals(responseBody)) {
				map = mapper.readValue(responseBody, HashMap.class);
			}
		}
		
		RestResultDto restResultDto = new RestResultDto();
		restResultDto.setStatus(result.getStatusLine().getStatusCode());
		restResultDto.setData(map);
		
		return restResultDto;
	}
	
	@SuppressWarnings("unchecked")
	public static RestResultDto requestPut(String url, Map<String, Object> paramMap) throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		mapper.setSerializationInclusion(Include.NON_EMPTY);
		String body = mapper.writeValueAsString(paramMap);
		
		HttpClient httpClient = RestUtil.getHttpClient();
		HttpPut request = new HttpPut(url);
		StringEntity params = new StringEntity(body, "utf-8");
		request.addHeader("content-type", "application/json");
		request.setEntity(params);
		
		
		HttpResponse result = httpClient.execute(request);
		
		Map<String, Object> map = null;
		if(result.getEntity() != null) {
			String responseBody = EntityUtils.toString(result.getEntity(), "UTF-8");
			if(StringUtils.isNotBlank(responseBody) && !"OK".equals(responseBody)) {
				map = mapper.readValue(responseBody, HashMap.class);
			}
		}
		
		RestResultDto restResultDto = new RestResultDto();
		restResultDto.setStatus(result.getStatusLine().getStatusCode());
		restResultDto.setData(map);
		
		return restResultDto;
	}

	@SuppressWarnings("unchecked")
	public static RestResultDto requestDelete(String url) throws Exception {

		ObjectMapper mapper = new ObjectMapper();
		
		HttpClient httpClient = RestUtil.getHttpClient();
		HttpDelete request = new HttpDelete(url);
		request.addHeader("content-type", "application/json");
		HttpResponse result = httpClient.execute(request);
		
		Map<String, Object> map = null;
		if(result.getEntity() != null) {
			String responseBody = EntityUtils.toString(result.getEntity(), "UTF-8");
			if(StringUtils.isNotBlank(responseBody)) {
				map = mapper.readValue(responseBody, HashMap.class);
			}
		}
		
		RestResultDto restResultDto = new RestResultDto();
		restResultDto.setStatus(result.getStatusLine().getStatusCode());
		restResultDto.setData(map);
		
		return restResultDto;
	}
	
	public static HttpClient getHttpClient() throws Exception {
		
		HttpRequestRetryHandler httpRequestRetryHandler = new HttpRequestRetryHandler() {
			@Override
			public boolean retryRequest(IOException exception, int executionCount, HttpContext context) {
				if (executionCount >= 3) {
					return false;
				}
		
				return true;
			}
		};
		
		SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
			@Override
			public boolean isTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
				return true;
			}
		}).build();
		
		SSLConnectionSocketFactory sslConnectionSocketFactory = new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());
		Registry<ConnectionSocketFactory> connectionSocketFactoryRegistry = RegistryBuilder.<ConnectionSocketFactory>create()
				.register("http", PlainConnectionSocketFactory.getSocketFactory())
				.register("https", sslConnectionSocketFactory)
				.build();
		
		
		PoolingHttpClientConnectionManager poolingHttpClientConnectionManager = new PoolingHttpClientConnectionManager(connectionSocketFactoryRegistry);
		
		int timeout = 60;
		RequestConfig config = RequestConfig.custom()
				.setConnectTimeout(timeout * 1000)
				.setConnectionRequestTimeout(timeout * 1000)
				.setSocketTimeout(timeout * 1000).build();
		
		CloseableHttpClient httpClient = HttpClientBuilder
				.create()
				.setDefaultRequestConfig(config)
				.setRetryHandler(httpRequestRetryHandler)
				.setSSLContext(sslContext)
				.setConnectionManager(poolingHttpClientConnectionManager)
				.build();
		
		return httpClient;
	}
}
