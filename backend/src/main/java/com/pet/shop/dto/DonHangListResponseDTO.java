package com.pet.shop.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DonHangListResponseDTO {
    private Long maDonHang;
    private Long maKhachHang; 
    private LocalDateTime ngayDatHang;
    private BigDecimal tongTien;
    private String trangThaiDonHang;
} 