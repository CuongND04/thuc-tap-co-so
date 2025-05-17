package com.pet.shop.configuration;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity // Kích hoạt cấu hình bảo mật của Spring Security
public class SecurityConfig {

    // Entry point xử lý khi request không có hoặc token không hợp lệ
    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    // Provider xử lý logic xác thực JWT
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Xử lý lỗi khi không xác thực được (ví dụ: không có token, token sai, hết hạn)
                .exceptionHandling((exceptions) ->
                        exceptions.authenticationEntryPoint(userAuthenticationEntryPoint)
                )

                // Thêm filter kiểm tra JWT trước khi Spring kiểm tra Basic Auth
                .addFilterBefore(new JwtAuthFilter(userAuthenticationProvider), BasicAuthenticationFilter.class)

                // Vô hiệu hóa CSRF vì ứng dụng không dùng session và form login
                .csrf(csrf -> csrf.disable())

                // Cấu hình không tạo session (vì dùng JWT, mỗi request là độc lập)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Cấu hình quyền truy cập cho các endpoint
                .authorizeHttpRequests((requests) -> requests
//                        // Cho phép truy cập /login và /register mà không cần xác thực
//                        .requestMatchers(HttpMethod.POST, "/login", "/register").permitAll()
//                        // Các request khác yêu cầu xác thực
//                        .anyRequest().authenticated()

                        //**TODO: chỗ này mấy ông thêm xác định giúp tôi những route nào cần token
                                .anyRequest().permitAll() // Cho phép tất cả các request mà không cần xác thực
                );

        return http.build();
    }
}