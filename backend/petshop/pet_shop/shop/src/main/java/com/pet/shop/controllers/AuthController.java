package com.pet.shop.controllers;


import com.pet.shop.models.NguoiDung;
import com.pet.shop.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // API Đăng ký
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody NguoiDung nguoiDung) {
        try {
            NguoiDung newUser = authService.register(nguoiDung);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // API Đăng nhập
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody NguoiDung loginRequest) {
        boolean success = authService.login(loginRequest.getTenDangNhap(), loginRequest.getMatKhau());
        if (success) {
            return ResponseEntity.ok("Đăng nhập thành công");
        } else {
            return ResponseEntity.status(401).body("Tên đăng nhập hoặc mật khẩu không đúng");
        }
    }
}
