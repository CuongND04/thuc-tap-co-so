package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class GioHangDTO {
    private Long maGioHang;
    private Long maKhachHang;
    private String tenKhachHang;
    private List<GioHangItemDTO> items;
    private BigDecimal tongTien;
} 