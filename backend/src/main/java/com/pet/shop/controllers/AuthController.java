package com.pet.shop.controllers;

import com.pet.shop.configuration.UserAuthenticationProvider;
import com.pet.shop.dto.AuthResponse;
import com.pet.shop.dto.LoginRequest;
import com.pet.shop.dto.RegisterRequest;
import com.pet.shop.dto.ChangePasswordRequest;
import com.pet.shop.dto.UpdateUserRequest;
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
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);

            // tạo token cho phiên đăng nhập đó
            response.setToken(userAuthenticationProvider.createToken(response.getTenDangNhap()));
            return ResponseEntity.ok(new ResponseObject("success", "Đăng nhập thành công", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<ResponseObject> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            authService.changePassword(request);
            return ResponseEntity.ok(new ResponseObject("success", "Đổi mật khẩu thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PutMapping("/update-info")
    public ResponseEntity<ResponseObject> updateUserInfo(
            @RequestBody UpdateUserRequest request) {
        try {
            AuthResponse response = authService.updateUserInfo(request);
            return ResponseEntity.ok(new ResponseObject("success", "Cập nhật thông tin thành công", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    //** TODO: thêm giúp tôi cái api logout đi, vì để người dùng sử dụng tính năng logout thì phải yêu cầu xác thực
}
