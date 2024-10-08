package com.mobigen.cdev.poc.config;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.core.io.*;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.web.context.support.ServletContextResource;

import java.io.IOException;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Configuration
public class MessageSourceConfig {
	
	/**
	 * 
	 * MessageSource Config
	 * 
	 */
    private final String LOCALE_DELIMETER = "-";
    private final String PROPERTIES_EXT = ".properties";
    private final String MSGSOURCE_GRP = "i18n/";
    private final String CLASSPATH_PREFIX = "classpath:";

    @Bean
    public MessageSource messageSource() throws IOException {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();

        // messageSource.setBasenames(new String[] {"classpath:/i18n/messages/error/error", "classpath:/i18n/messages/label/label", "classpath:/i18n/messages/message/message"});
        String[] basenames = this.setWildBaseNames("classpath*:i18n/messages/**/*.properties");
        messageSource.setBasenames(basenames);

        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setDefaultLocale(Locale.getDefault());
        messageSource.setFallbackToSystemLocale(false);
        return messageSource;
    }

    @Bean
    public MessageSourceAccessor messageSourceAccessor() throws IOException {
        return new MessageSourceAccessor(messageSource());
    }

    /**
     *
     * setWildBaseNames를 이용 하여 basenames를 자동 설정
	 * 정해진 Pattern으로 MessageSource properties를 일괄 읽어들여서 basenames를 지정하기 위함
	 * 
     */
    private String[] setWildBaseNames(String locationPattern) throws IOException {
        Set<String> baseNames = new HashSet<>();

        ClassLoader classLoader = this.getClass().getClassLoader();
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(classLoader);
        Resource[] resources = resolver.getResources(locationPattern);

        String fullPath = "";
        if (resources != null) {
            for (Resource temp: resources) {
                if (temp instanceof ServletContextResource) {
                    fullPath = ((ServletContextResource) temp).getPath();
                } else if (temp instanceof FileSystemResource) {
                    fullPath = ((FileSystemResource) temp).getPath();
                    fullPath = StringUtils.substringAfterLast(fullPath, MSGSOURCE_GRP);
                    fullPath = CLASSPATH_PREFIX + MSGSOURCE_GRP + fullPath;
                } else if (temp instanceof  ClassPathResource) {
                    fullPath = CLASSPATH_PREFIX +  ((ClassPathResource) temp).getPath();
                } else if (temp instanceof UrlResource) {
                    fullPath = ((UrlResource) temp).getURL().getPath();
                    fullPath = StringUtils.substringAfterLast(fullPath, MSGSOURCE_GRP);
                    fullPath = CLASSPATH_PREFIX + MSGSOURCE_GRP + fullPath;
                } else if (temp instanceof VfsResource) {
                    fullPath = ((VfsResource) temp).getURL().getPath();
                    fullPath = StringUtils.substringAfterLast(fullPath, MSGSOURCE_GRP);
                    fullPath = CLASSPATH_PREFIX + MSGSOURCE_GRP + fullPath;
                }

                String fileName = org.springframework.util.StringUtils.getFilename(fullPath);
                fileName = StringUtils.substringBefore(fileName, PROPERTIES_EXT);
                String purePath = StringUtils.substringBeforeLast(fullPath, fileName);
                String resFilename = StringUtils.substringBefore(fileName, LOCALE_DELIMETER);
                String resPath = purePath + resFilename;
                baseNames.add(resPath);
            }
        }

        return baseNames.toArray(new String[baseNames.size()]);
    }
}
