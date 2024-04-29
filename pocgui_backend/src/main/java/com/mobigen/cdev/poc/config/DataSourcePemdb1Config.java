package com.mobigen.cdev.poc.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@EnableJpaRepositories(
        // basePackages = "{com.mobigen.cdev.poc.module.common.repository.jpa.pemdb1}",
        basePackages = "com.mobigen.cdev.poc",
        entityManagerFactoryRef = "pemdb1EntityManager",
        transactionManagerRef = "pemdb1TransactionManager"
)
public class DataSourcePemdb1Config {

    private final Environment env;

    @Autowired
    public DataSourcePemdb1Config(Environment env) {
        this.env = env;
    }

    /**
     *
     * Mybatis
     * MARIADB
     * pemdb1 설정 (MultiDataSource 적용)
     *
     */
    @Bean
    @ConfigurationProperties(prefix="pemdb1.datasource")
    public DataSource dataSourcePemdb1() {
        return DataSourceBuilder.create().build();
    }

    // Mybatis (sqlSessionFactory, sqlSessionTemplate)
    @Bean
    public SqlSessionFactory sqlSessionFactoryPemdb1(DataSource dataSourcePemdb1, ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        Resource mybatisConfig = applicationContext.getResource("classpath:mybatis/mybatis-config.xml");
        Resource[] resource = new PathMatchingResourcePatternResolver().getResources("classpath:mybatis/mariadb/**/*.xml");

        factoryBean.setDataSource(dataSourcePemdb1);
        factoryBean.setConfigLocation(mybatisConfig);
        factoryBean.setMapperLocations(resource);
        return factoryBean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplatePemdb1(SqlSessionFactory sqlSessionFactoryPemdb1) {
        return new SqlSessionTemplate(sqlSessionFactoryPemdb1);
    }

    @Bean
    public DataSourceTransactionManager dataSourceTransactionManagerPemdb1(DataSource dataSourcePemdb1) {
        return new DataSourceTransactionManager(dataSourcePemdb1);
    }

    /**
     *
     * JPA (사용 계획 없음)
     * MYSQL
     * DGWDB 설정 (MultiDataSource 적용)
     *
     */
    @Bean
    public LocalContainerEntityManagerFactoryBean pemdb1EntityManager() {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSourcePemdb1());
        // em.setPackagesToScan(new String[] {"com.mobigen.cdev.poc.common.entity.collect"});
        em.setPackagesToScan("com.mobigen.cdev.poc");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<>();
        properties.put("hibernate.hbm2ddl.auto", env.getProperty("pemdb1.jpa.hibernate.ddl-auto"));
        properties.put("hibernate.dialect", env.getProperty("pemdb1.properties.hibernate.dialect"));
        em.setJpaPropertyMap(properties);

        return em;
    }

    @Bean
    public PlatformTransactionManager pemdb1TransactionManager() {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(pemdb1EntityManager().getObject());
        return transactionManager;
    }
}
