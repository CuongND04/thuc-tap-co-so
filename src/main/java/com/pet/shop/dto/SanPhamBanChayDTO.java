package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SanPhamBanChayDTO {
    private Long maSanPham;
    private String tenSanPham;
    private String hinhAnh;
    private String danhMuc;
    private BigDecimal giaBan;
    private Integer soLuongDaBan;
    private BigDecimal tongDoanhThu;
}