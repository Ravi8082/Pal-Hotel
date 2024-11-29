package com.dailycodework.PalHotel.Security.User;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    private static final Long MAX_AGE = 3600L;  // Cache preflight requests for 1 hour
    private static final int CORS_FILTER_ORDER = -102;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        // Create a CORS configuration object
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Allow credentials (cookies, authentication headers, etc.)
        config.setAllowCredentials(true);

        // Set the allowed origin
        config.addAllowedOrigin("http://localhost:5173");  // Update this if you need more origins

        // Set allowed headers
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT
        ));

        // Set allowed methods (you can adjust this if needed)
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name()
        ));

        // Set the cache duration for the CORS preflight response
        config.setMaxAge(MAX_AGE);

        // Register the CORS configuration for all paths (or you can specify more specific paths)
        source.registerCorsConfiguration("/**", config);

        // Register and apply the filter
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(CORS_FILTER_ORDER);  // Ensure this filter is applied first
        return bean;
    }
}
