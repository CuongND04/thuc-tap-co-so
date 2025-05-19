package com.pet.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SanPhamDTO {
    private Integer maSanPham;
    private String tenSanPham;
    private Integer maDanhMuc;
    private String tenDanhMuc;
    private String hinhAnh;
    private String moTa;
    private BigDecimal giaBan;
    private String loaiSanPham; // "ThuCung" or "PhuKien"
    private Integer soLuongTonKho;

    // Fields for ThuCung
    private Integer maThuCung;
    private String giong;
    private String gioiTinh;
    private String tuoi;
    private String trangThaiTiem;

    // Fields for PhuKien
    private Integer maPhuKien;
    private String loaiPhuKien;
}
