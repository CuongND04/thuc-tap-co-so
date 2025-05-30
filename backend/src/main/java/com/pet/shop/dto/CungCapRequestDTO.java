package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CungCapRequestDTO {
    private Long maNhaCungCap;
    private Long maSanPham;
    private BigDecimal giaCungCap;
    private Integer soLuong;
    private LocalDateTime ngayCungCap;
} 