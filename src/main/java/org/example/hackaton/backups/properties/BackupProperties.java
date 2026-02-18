package org.example.hackaton.backups.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "backup")
public class BackupProperties {
    private String directory = "./backups";
    private String databaseName = "Hackaton";
    private String filenamePrefix = "backup";
    private int retentionDays = 7;

    private Schedule schedule = new Schedule();

    @Getter
    @Setter
    public static class Schedule {
        private long initialDelay = 10000;
        private long fixedDelay = 86400000; // 24 часа в миллисекундах
    }
}
