package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ThanhToanResponseDTO {
    private Long maGiaoDich;
    private Long maDonHang;
    private String phuongThucThanhToan;
    private BigDecimal soTien;
    private LocalDateTime thoiGianThanhToan;
    private String trangThaiGiaoDich;
    private String diaChiGiaoHang;
    private String soDienThoai;
    private String ghiChu;
}
