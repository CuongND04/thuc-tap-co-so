package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHangDetailResponseDTO {
    private Long maDonHang;
    private KhachHangInfoDTO khachHang;
    private LocalDateTime ngayDatHang;
    private BigDecimal tongTien;
    private String trangThaiDonHang;
    private List<ChiTietDonHangResponseDTO> chiTietDonHangs;

    // Optional: include shipping address or other details
    // private String diaChiGiaoHang;
} 