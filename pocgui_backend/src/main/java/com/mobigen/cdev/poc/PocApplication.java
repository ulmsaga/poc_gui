package com.mobigen.cdev.poc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class PocApplication {

	public static void main(String[] args) {
		// SpringApplication.run(DatagwApplication.class, args);
		SpringApplication app = new SpringApplication(PocApplication.class);
		app.addListeners(new ApplicationPidFileWriter());
		app.run(args);
	}

}
