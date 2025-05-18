package com.pet.shop.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pet.shop.dto.ErrorDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class UserAuthenticationEntryPoint implements AuthenticationEntryPoint {

    // ObjectMapper để chuyển đối tượng Java thành JSON khi phản hồi lỗi
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        // Thiết lập mã trạng thái HTTP 401 - Unauthorized
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // Thiết lập loại nội dung trả về là JSON
        response.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

        // Ghi đối tượng lỗi dưới dạng JSON vào body của response
        OBJECT_MAPPER.writeValue(response.getOutputStream(), new ErrorDto("Unauthorized path"));
    }
}
