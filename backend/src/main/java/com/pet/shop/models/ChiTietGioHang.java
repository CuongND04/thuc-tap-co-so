package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_gio_hang")
public class ChiTietGioHang {

    @EmbeddedId
    private ChiTietGioHangId id;

    @ManyToOne
    @MapsId("maGioHang")
    @JoinColumn(name = "ma_gio_hang")
    private GioHang gioHang;

    @ManyToOne
    @MapsId("maSanPham")
    @JoinColumn(name = "ma_san_pham")
    private SanPham sanPham;

    @Column(name = "so_luong")
    private Integer soLuong;
    public ChiTietGioHang(){
    }

    public ChiTietGioHang(GioHang gioHang, SanPham sanPham, Integer soLuong) {
        this.gioHang = gioHang;
        this.sanPham = sanPham;
        this.soLuong = soLuong;
    }
}