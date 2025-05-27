package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietDonHangResponseDTO {
    private Long maSanPham;
    private String tenSanPham;
    private int soLuong;
    private BigDecimal donGia;
    private BigDecimal thanhTien; // quantity * price

    // Optional: Include image URL or other product details if needed
    // private String imageUrl;
} 