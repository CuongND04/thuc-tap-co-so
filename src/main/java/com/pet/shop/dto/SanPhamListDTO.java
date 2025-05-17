package com.pet.shop.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class SanPhamListDTO {
    private Long maSanPham;
    private String tenSanPham;
    private String hinhAnh;
    private String moTa;
    private BigDecimal giaBan;
    private Long maDanhMuc;
    private String tenDanhMuc;
}
