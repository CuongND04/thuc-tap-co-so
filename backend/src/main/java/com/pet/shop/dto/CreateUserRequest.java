package com.pet.shop.dto;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String tenDangNhap;
    private String matKhau;
    private String hoTen;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String quyenTruyCap;
    private String avatar;
}