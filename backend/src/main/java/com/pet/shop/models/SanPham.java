package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
@Table(name = "san_pham")
public class SanPham {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_san_pham")
    private Long maSanPham;

    @Column(name = "ten_san_pham", nullable = false, length = 200)
    private String tenSanPham;

    @ManyToOne
    @JoinColumn(name = "ma_danh_muc", nullable = false)
    private DanhMuc danhMuc;

    @Column(name = "hinh_anh", columnDefinition = "NVARCHAR(MAX)")
    private String hinhAnh;

    @Column(name = "mo_ta", columnDefinition = "NVARCHAR(MAX)")
    private String moTa;

    @Column(name = "gia_ban", precision = 18, scale = 2, nullable = false)
    private BigDecimal giaBan;

    @OneToOne(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private ThuCung thuCung;

    @OneToOne(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private PhuKien phuKien;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<ChiTietGioHang> chiTietGioHangs;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<ChiTietDonHang> chiTietDonHangs;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<CungCap> cungCaps;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<YeuThich> yeuThichs;

    @OneToMany(mappedBy = "sanPham", cascade = CascadeType.ALL)
    private List<DanhGia> danhGias;

    // No-args constructor
    public SanPham() {
    }

    // All-args constructor
    public SanPham(String tenSanPham, DanhMuc danhMuc, String hinhAnh, String moTa, 
                  BigDecimal giaBan, ThuCung thuCung, PhuKien phuKien, List<ChiTietGioHang> chiTietGioHangs,
                  List<ChiTietDonHang> chiTietDonHangs, List<CungCap> cungCaps, List<YeuThich> yeuThichs,
                  List<DanhGia> danhGias) {
        this.tenSanPham = tenSanPham;
        this.danhMuc = danhMuc;
        this.hinhAnh = hinhAnh;
        this.moTa = moTa;
        this.giaBan = giaBan;
        this.thuCung = thuCung;
        this.phuKien = phuKien;
        this.chiTietGioHangs = chiTietGioHangs;
        this.chiTietDonHangs = chiTietDonHangs;
        this.cungCaps = cungCaps;
        this.yeuThichs = yeuThichs;
        this.danhGias = danhGias;
    }
    public boolean isThuCung() {
        return this.thuCung != null;
    }

    public boolean isPhuKien() {
        return this.phuKien != null;
    }
}