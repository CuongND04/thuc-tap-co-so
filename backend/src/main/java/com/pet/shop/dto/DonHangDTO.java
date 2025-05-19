package com.pet.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonHangDTO {
    private Integer maDonHang;
    private Integer maKhachHang;
    private String tenKhachHang;
    private LocalDateTime ngayDatHang;
    private BigDecimal tongTien;
    private String trangThaiDonHang;
    private List<ChiTietDonHangDTO> chiTietDonHang;
}
