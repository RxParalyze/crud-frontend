package com.blog;

import com.blog.config.SpringFoxConfig;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

@SpringBootApplication
public class App extends SpringBootServletInitializer {
    public static void main(String[] args) {
		SpringApplication.run(App.class, args);
        AbstractApplicationContext context = new AnnotationConfigApplicationContext
            (SpringFoxConfig.class);
        BasicDataSource ds = (BasicDataSource)context.getBean("dataSource");
	}


	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(SpringFoxConfig.class);
    }
}