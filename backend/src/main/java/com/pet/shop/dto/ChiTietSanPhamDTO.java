package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ChiTietSanPhamDTO {
    private Long maSanPham;
    private String tenSanPham;
    private String hinhAnh;
    private String moTa;
    private BigDecimal giaBan;
    
    // Category information
    private Long maDanhMuc;
    private String tenDanhMuc;
    
    // New fields for product type and related entity ID
    private String loaiSanPham; // "ThuCung" or "PhuKien"
    private Long maLoaiSanPham; // ID of ThuCung or PhuKien
    
    // Unified inventory field
    private Integer soLuongTonKho;
    
    // Keep pet-specific details if needed for product detail view, otherwise remove.
    // Based on SanPhamService, these are currently being set, so keep them for now.
    private String gioiTinh;
    private String tuoi;
    private String trangThaiTiem;
    
    // Accessory information (if applicable)
    private Integer soLuongPhuKien;
    
    // Reviews
    private List<DanhGiaDTO> danhGias;
    
    // Average rating
    private Double diemTrungBinh;
    
    @Data
    public static class DanhGiaDTO {
        private Long maDanhGia;
        private String noiDung;
        private Integer soSao;
        private String tenNguoiDung;
        private String ngayDanhGia;
    }
} 