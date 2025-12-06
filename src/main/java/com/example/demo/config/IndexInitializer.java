package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class IndexInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public IndexInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        try {
            // 1. Enable PostGIS Extension (Required for 'geometry' type)
            jdbcTemplate.execute("CREATE EXTENSION IF NOT EXISTS postgis");
            System.out.println("✅ Enabled PostGIS extension");

            // 2. Create Hash Index for City
            String sqlHash = "CREATE INDEX IF NOT EXISTS idx_city_hash ON transactions USING HASH (city)";
            jdbcTemplate.execute(sqlHash);
            System.out.println("✅ Executed SQL: " + sqlHash);

            // 3. Create GiST Index for Location
            String sqlGist = "CREATE INDEX IF NOT EXISTS idx_location_gist ON transactions USING GIST (location)";
            jdbcTemplate.execute(sqlGist);
            System.out.println("✅ Executed SQL: " + sqlGist);

        } catch (Exception e) {
            System.err.println("❌ Failed to initialize DB artifacts.");
            System.err.println("Error: " + e.getMessage());
            if (e.getCause() != null) {
                System.err.println("Cause: " + e.getCause().getMessage());
            }
            // Often, if the table 'transactions' doesn't exist despite ddl-auto=update,
            // it's because the 'geometry' type caused table creation to fail *before* this
            // script ran.
            // Restarting the app AFTER PostGIS is enabled usually fixes it.
        }
    }
}
