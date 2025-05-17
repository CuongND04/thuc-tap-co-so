package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class GioHangItemDTO {
    private Long maSanPham;
    private String tenSanPham;
    private String hinhAnh;
    private BigDecimal giaBan;
    private Integer soLuong;
    private BigDecimal thanhTien;
}