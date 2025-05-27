package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NhapHangRequestDTO {
    private Long maNhaCungCap;
    private Long maSanPham;
    private int soLuongNhap;
}