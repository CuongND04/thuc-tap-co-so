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

    // Pet information (if applicable)
    private String giong;
    private String gioiTinh;
    private String tuoi;
    private String trangThaiTiem;
    private Integer soLuongThuCung;

    // Accessory information (if applicable)
    private String loaiPhuKien;
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