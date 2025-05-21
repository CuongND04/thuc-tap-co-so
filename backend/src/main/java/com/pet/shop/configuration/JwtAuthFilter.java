package com.pet.shop.configuration;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;


@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    // Inject provider để xử lý xác thực từ token
    private final UserAuthenticationProvider userAuthenticationProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        // Lấy header Authorization từ request
        String header = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        // Nếu header có tồn tại
        if (header != null) {
            // Tách token theo khoảng trắng (thường có dạng: "Bearer <token>")
            String[] authElements = header.split(" ");

            // Kiểm tra định dạng hợp lệ: phải có 2 phần và bắt đầu bằng "Bearer"
            if (authElements.length == 2 && "Bearer".equals(authElements[0])) {
                try {
                    // Xác thực token và gán vào SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthenticationProvider.validateToken(authElements[1])
                    );
                } catch (RuntimeException e) {
                    // Nếu token không hợp lệ → xóa thông tin context để tránh lỗi xác thực giả
                    SecurityContextHolder.clearContext();

                    // Ghi log hoặc debug nếu cần
                    // logger.warn("Invalid or expired token", e);

                    // Thêm: Trả lỗi 401 cho client với thông báo cụ thể
                    httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401
                    httpServletResponse.setContentType("application/json");
                    httpServletResponse.setCharacterEncoding("UTF-8");

                    // Viết JSON response
                    httpServletResponse.getWriter().write(
                            String.format("{\"error\": \"%s\"}", e.getMessage())
                    );
                    return; // Dừng filter chain tại đây nếu lỗi xác thực
                }
            }
        }

        // Cho phép request tiếp tục đi qua filter chain nếu không có lỗi
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }
}
