package com.pet.shop.controllers;

import com.pet.shop.configuration.UserAuthenticationProvider;
import com.pet.shop.dto.AuthResponse;
import com.pet.shop.dto.LoginRequest;
import com.pet.shop.dto.RegisterRequest;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    private final UserAuthenticationProvider userAuthenticationProvider;

    public AuthController(UserAuthenticationProvider userAuthenticationProvider) {
        this.userAuthenticationProvider = userAuthenticationProvider;
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            response.setToken(userAuthenticationProvider.createToken(response.getTenDangNhap()));
            return ResponseEntity.ok(new ResponseObject("success", "Đăng ký thành công", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            response.setToken(userAuthenticationProvider.createToken(response.getTenDangNhap()));
            return ResponseEntity.ok(new ResponseObject("success", "Đăng nhập thành công", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    //** TODO: thêm giúp tôi cái api logout đi, vì để người dùng sử dụng tính năng logout thì phải yêu cầu xác thực
}
