package com.pet.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NguoiDungDTO {
    private Integer maNguoiDung;
    private String hoTen;
    private String soDienThoai;
    private String email;
    private String diaChi;
    private String quyenTruyCap;
    private String tenDangNhap;
    // Không bao gồm mật khẩu trong DTO trả về
}

