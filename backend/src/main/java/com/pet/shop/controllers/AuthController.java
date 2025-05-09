package com.pet.shop.controllers;

import com.pet.shop.dto.AuthResponse;
import com.pet.shop.dto.LoginRequest;
import com.pet.shop.dto.RegisterRequest;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.service.AuthService;
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
            return ResponseEntity.ok(new ResponseObject("success", "Đăng nhập thành công", response));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }
}
