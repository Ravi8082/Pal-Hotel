package com.dailycodework.PalHotel.Security.User;

import com.dailycodework.PalHotel.Jwt.AuthTokenFilter;
import com.dailycodework.PalHotel.Jwt.JwtAuthEntryPoint;
import com.dailycodework.PalHotel.Jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig {

    private final HotelUserDetailsService userDetailsService;
    private final JwtAuthEntryPoint jwtAuthEntryPoint;
    private final JwtUtils jwtUtils;  // Inject JwtUtils for JWT-based authentication

    // Custom Authentication Token Filter (configured with JwtUtils and UserDetailsService)
    @Bean
    public AuthTokenFilter authenticationTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);  // Pass dependencies to AuthTokenFilter
    }

    // Password Encoder (use BCrypt for password encryption)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();  // Secure password encoding
    }

    // Authentication Provider (DaoAuthenticationProvider configuration)
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        var authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);  // Set the custom UserDetailsService
        authProvider.setPasswordEncoder(passwordEncoder());  // Set the password encoder
        return authProvider;
    }

    // AuthenticationManager (handles authentication flow)
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();  // Retrieve AuthenticationManager from AuthenticationConfiguration
    }

    // Security Filter Chain (configure stateless session and JWT validation)
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()  // Disable CSRF protection for stateless JWT authentication
                .exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthEntryPoint))  // Handle unauthorized access
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // Stateless session
                .authorizeRequests(auth -> auth
                        .requestMatchers("/auth/**", "/rooms/**", "/bookings/**")  // Public access to these paths
                        .permitAll()
                        .requestMatchers("/roles/**").hasRole("ADMIN")  // Access restricted to users with ADMIN role
                        .anyRequest().authenticated());  // Require authentication for all other requests

        http.authenticationProvider(authenticationProvider());  // Register the custom authentication provider
        http.addFilterBefore(authenticationTokenFilter(), UsernamePasswordAuthenticationFilter.class);  // Add the JWT filter before Spring Security's default filter

        return http.build();  // Return the configured HttpSecurity bean
    }
}
