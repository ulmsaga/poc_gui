package com.mobigen.cdev.poc.core.util.common;

import com.mobigen.cdev.poc.core.applicationcontext.ApplicationContextProvider;
import org.springframework.context.ApplicationContext;
import org.springframework.core.env.Environment;

/**
 * 
 * component 영역이 아닌 곳에서 기 선언된 @component, @bean, @Environment를 가져오고 싶을 때 사용
 * EX) Cutil.java, ExcelSXSSF.java 같은 곳에서 사용.
 *
 */

public class BeanUtils {
    public static Object getBean(String beanName) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(beanName);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Object getBean(Class c) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(c);
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
	public static Object getBean(Class c, String beanName) {
        ApplicationContext applicationContext = ApplicationContextProvider.getApplicationContext();
        return applicationContext.getBean(c, beanName);
    }

    public static Environment getEnv() {
        return ApplicationContextProvider.getApplicationContext().getEnvironment();
    }
}
