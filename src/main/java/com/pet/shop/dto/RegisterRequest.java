package com.pet.shop.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String hoTen;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String matKhau;
    private String tenDangNhap;
    private String quyenTruyCap;
} 