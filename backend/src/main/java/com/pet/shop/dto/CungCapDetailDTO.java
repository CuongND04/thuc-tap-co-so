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
public class CungCapDetailDTO {
    private Long maNhaCungCap;
    private Long maSanPham;
    private BigDecimal giaCungCap;
    private String tenNhaCungCap;
    private String tenSanPham;
} 