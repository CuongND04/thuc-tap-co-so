package com.pet.shop.dto;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManualChiTietDonHangItemDTO {
    private Long maSanPham;
    private Integer soLuong;
    private BigDecimal donGia;
} 