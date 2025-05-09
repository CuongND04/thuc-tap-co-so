package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "chi_tiet_don_hang")
public class ChiTietDonHang {

    @EmbeddedId
    private ChiTietDonHangId id;

    @ManyToOne
    @MapsId("maDonHang")
    @JoinColumn(name = "ma_don_hang")
    private DonHang donHang;

    @ManyToOne
    @MapsId("maSanPham")
    @JoinColumn(name = "ma_san_pham")
    private SanPham sanPham;

    @Column(name = "so_luong")
    private Integer soLuong;

    @Column(name = "don_gia", precision = 18, scale = 2, nullable = false)
    private BigDecimal donGia;

    public ChiTietDonHang() {
    }

    public ChiTietDonHang( DonHang donHang, SanPham sanPham, Integer soLuong, BigDecimal donGia) {
        this.donHang = donHang;
        this.sanPham = sanPham;
        this.soLuong = soLuong;
        this.donGia = donGia;
    }
}
