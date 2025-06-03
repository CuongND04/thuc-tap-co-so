package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KhachHangInfoDTO {
    private Long maKhachHang;
    private String hoTen;
    private String email;
    private String soDienThoai;
    private String diaChi;

    // Constructors, getters, setters
}