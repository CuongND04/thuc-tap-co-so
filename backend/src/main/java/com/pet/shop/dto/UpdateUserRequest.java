package com.pet.shop.dto;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private String hoTen;
    private String soDienThoai;
    private String email;
    private String diaChi;
}