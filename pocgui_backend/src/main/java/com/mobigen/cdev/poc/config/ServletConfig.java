package com.mobigen.cdev.poc.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

@Configuration
public class ServletConfig implements ServletContextListener {
	private final Environment env;
	
	@Autowired
	public ServletConfig(Environment env) {
		this.env = env;
	}
	
	/**
	 * 
	 * ServletContextConfig
	 * log4jdbc.log4j2.properties 기본 위치가 classpath: 최상단 Default 고정 이기 때문에
	 * log4j2 properties와 같은 위치로 관리 해 주기 위해 경로 변경
	 * 
	 */
	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		// ServletContext sc = sce.getServletContext();
		String log4jdbcLoc = env.getProperty("log4jdbc.location");
		
		if (log4jdbcLoc != null) {
			System.setProperty("log4jdbc.log4j2.properties.file", log4jdbcLoc);
		} else {
			System.setProperty("log4jdbc.log4j2.properties.file", "/log4j2/log4jdbc.log4j2.properties");
		}
		
		ServletContextListener.super.contextInitialized(sce);
	}
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		ServletContextListener.super.contextDestroyed(sce);
	}
}
