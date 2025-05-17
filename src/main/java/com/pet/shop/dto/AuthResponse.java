package com.pet.shop.dto;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class AuthResponse {
    private String token;
    private String tenDangNhap;
    private String hoTen;
    private String quyenTruyCap;
} 