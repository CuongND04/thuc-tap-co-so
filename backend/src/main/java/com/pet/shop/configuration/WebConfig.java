package com.pet.shop.configuration;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.Arrays;

@Configuration
@EnableWebMvc
// Lớp cấu hình CORS cho phép frontend (ví dụ: React chạy ở localhost:5173) gọi API từ backend
public class WebConfig {

    // Thời gian tối đa (giây) trình duyệt cache lại cấu hình CORS
    private static final Long MAX_AGE = 3600L; // 1 giờ

    // Đặt thứ tự ưu tiên filter (nên nhỏ hơn filter của Spring Security)
    private static final int CORS_FILTER_ORDER = -102;

    /**
     * Cấu hình CORS filter thủ công bằng FilterRegistrationBean
     * @return FilterRegistrationBean<CorsFilter>
     */
    @Bean
    public FilterRegistrationBean corsFilter() {
        // Nguồn cấu hình URL cho CORS
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Cho phép gửi cookie và header Authorization qua cross-origin
        config.setAllowCredentials(true);

        // Chỉ cho phép origin từ frontend đang chạy ở localhost:5173
        config.addAllowedOrigin("http://localhost:5173");

        // Cho phép các header cụ thể
        config.setAllowedHeaders(Arrays.asList(
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT));

        // Cho phép các HTTP method cụ thể
        config.setAllowedMethods(Arrays.asList(
                HttpMethod.GET.name(),
                HttpMethod.POST.name(),
                HttpMethod.PUT.name(),
                HttpMethod.DELETE.name()));

        // Cho phép trình duyệt cache preflight response trong 1 giờ
        config.setMaxAge(MAX_AGE);

        // Đăng ký cấu hình CORS cho tất cả các URL
        source.registerCorsConfiguration("/**", config);

        // Tạo Filter bean với CORS config
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));

        // Đảm bảo filter này chạy trước Spring Security filter
        bean.setOrder(CORS_FILTER_ORDER);

        return bean;
    }
}
