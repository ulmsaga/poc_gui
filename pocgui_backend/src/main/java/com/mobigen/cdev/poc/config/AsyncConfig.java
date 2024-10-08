package com.mobigen.cdev.poc.config;

import java.util.concurrent.Executor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
@EnableAsync
public class AsyncConfig {

  private static int TASK_CORE_POOL_SIZE = 10;
	private static int TASK_MAX_POOL_SIZE = 50;
	private static int TASK_QUEUE_CAPACITY = 30;
	private final String EXECUTOR_BEAN_NAME = "Executor-";

  private Logger logger = LoggerFactory.getLogger(this.getClass());

  // @Resource(name = "threadPoolTaskExecutorResource")
  private ThreadPoolTaskExecutor threadPoolTaskExecutorResource;

  @Bean(name = "threadPoolTaskExecutor")
  public Executor threadPoolTaskExecutor() {
    ThreadPoolTaskExecutor threadPoolTaskExecutor = new ThreadPoolTaskExecutor();
    threadPoolTaskExecutor.setCorePoolSize(TASK_CORE_POOL_SIZE);
    threadPoolTaskExecutor.setMaxPoolSize(TASK_MAX_POOL_SIZE);
    threadPoolTaskExecutor.setQueueCapacity(TASK_QUEUE_CAPACITY);
    threadPoolTaskExecutor.setThreadNamePrefix(EXECUTOR_BEAN_NAME);
    threadPoolTaskExecutor.initialize();
    this.threadPoolTaskExecutorResource = threadPoolTaskExecutor;
    return threadPoolTaskExecutor;
  }
  
  public boolean chkValidTaskCondition() {
		boolean ret = true;
		int activeCount = threadPoolTaskExecutorResource.getActiveCount();
		logger.info("threadPoolTaskExecutor =================================================");
		logger.info("threadPoolTaskExecutor : Get Active Count : {}", activeCount);
		logger.info("threadPoolTaskExecutor : Max Pool Size : {}", TASK_CORE_POOL_SIZE + TASK_QUEUE_CAPACITY);
		if (activeCount > TASK_CORE_POOL_SIZE + TASK_QUEUE_CAPACITY) ret = false;
		logger.info("threadPoolTaskExecutor : checkTaskExecute : {}", ret);
		logger.info("threadPoolTaskExecutor =================================================");
		return ret;
	}
  
}
