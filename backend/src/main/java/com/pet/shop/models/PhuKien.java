package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "phu_kien")
public class PhuKien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_phu_kien")
    private Long maPhuKien;

    @OneToOne
    @JoinColumn(name = "ma_san_pham", unique = true, nullable = false)
    private SanPham sanPham;

    @Column(name = "so_luong_ton_kho")
    private Integer soLuongTonKho;


    // No-args constructor
    public PhuKien() {
    }

    // All-args constructor
    public PhuKien(SanPham sanPham, Integer soLuongTonKho) {
        this.sanPham = sanPham;
        this.soLuongTonKho = soLuongTonKho;
    }
}