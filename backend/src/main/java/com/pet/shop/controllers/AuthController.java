package com.pet.shop.controllers;

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

    @PostMapping("/register")
    public ResponseEntity<ResponseObject> register(@RequestBody RegisterRequest request) {
        try {
            AuthResponse response = authService.register(request);
            return ResponseEntity.ok(new ResponseObject("success", "Đăng ký thành công", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody LoginRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(new ResponseObject("success", "Đăng nhập thành công", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/changepassword")
    public ResponseEntity<ResponseObject> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            authService.changePassword(request);
            return ResponseEntity.ok(new ResponseObject("success", "Đổi mật khẩu thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PutMapping("/update-info/{tenDangNhap}")
    public ResponseEntity<ResponseObject> updateUserInfo(
            @PathVariable String tenDangNhap,
            @RequestBody UpdateUserRequest request) {
        try {
            AuthResponse response = authService.updateUserInfo(tenDangNhap, request);
            return ResponseEntity.ok(new ResponseObject("success", "Cập nhật thông tin thành công", response));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }
}
