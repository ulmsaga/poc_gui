package com.mobigen.cdev.poc.core.file.component;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@ConfigurationProperties(prefix = "file")
public class ConfigFile {
    private Map<String, Object> path;

    public Map<String, Object> getPath() {
        return path;
    }

    public ConfigFile setPath(Map<String, Object> path) {
        this.path = path;
        return this;
    }
}
