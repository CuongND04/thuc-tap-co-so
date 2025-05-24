package com.pet.shop.configuration;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.pet.shop.dto.AuthResponse;
import com.pet.shop.services.AuthService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
@RequiredArgsConstructor
@Component
// Lớp này chịu trách nhiệm tạo và xác thực JWT token
public class UserAuthenticationProvider {

    // Lấy secret key từ file cấu hình (application.properties hoặc application.yml)
    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    // Service dùng để lấy thông tin người dùng khi xác thực token
    private final AuthService authService;

    // Mã hóa secret key thành Base64 sau khi dependency được inject
    @PostConstruct
    protected void init() {
        // Giúp hạn chế việc lộ key dạng thô trong JVM
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * Tạo JWT token từ tên đăng nhập
     * @param login tên đăng nhập
     * @return chuỗi token đã mã hóa
     */
    public String createToken(String login) {
        Date now = new Date(); // thời gian hiện tại
        Date validity = new Date(now.getTime() + 7L * 24 * 60 * 60 * 1000); // 7 ngày

        Algorithm algorithm = Algorithm.HMAC256(secretKey); // sử dụng thuật toán HMAC với secret key

        return JWT.create()
                .withSubject(login)        // chủ thể của token là tên đăng nhập
                .withIssuedAt(now)         // thời điểm phát hành
                .withExpiresAt(validity)   // thời điểm hết hạn
                .sign(algorithm);          // ký token
    }

    /**
     * Xác thực token và trả về thông tin người dùng
     * @param token JWT token từ header
     * @return đối tượng Authentication chứa người dùng đã xác thực
     */
    public Authentication validateToken(String token) {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        // Tạo verifier để kiểm tra token
        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        // Giải mã token
        DecodedJWT decoded = verifier.verify(token);

        // Lấy thông tin người dùng từ service dựa vào subject (tên đăng nhập)
        AuthResponse user = authService.findByTenDangNhap(decoded.getSubject());

        // Gán token nếu cần, cái này chắc hơi thừa nhưng tôi cứ set để tránh thắc mắc tại sao null

//        user.setToken(token);
        // Trả về Authentication object cho Spring Security sử dụng
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}
