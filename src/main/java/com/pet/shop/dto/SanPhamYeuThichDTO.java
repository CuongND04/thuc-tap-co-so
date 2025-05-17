package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class SanPhamYeuThichDTO {
    private Long maSanPham;
    private String tenSanPham;
    private String hinhAnh;
    private String moTa;
    private BigDecimal giaBan;
    private String tenDanhMuc;
    private LocalDateTime thoiGianThem;
}