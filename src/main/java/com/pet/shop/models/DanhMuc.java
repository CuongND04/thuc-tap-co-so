package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "danh_muc")
public class DanhMuc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_danh_muc")
    private Long maDanhMuc;

    @Column(name = "ten_danh_muc", nullable = false, length = 100)
    private String tenDanhMuc;

    @Column(name = "mo_ta", columnDefinition = "TEXT")
    private String moTa;

    @Column(length = 50)
    private String kieu;

    @OneToMany(mappedBy = "danhMuc", cascade = CascadeType.ALL)
    private List<SanPham> sanPhams;

    // No-args constructor
    public DanhMuc() {
    }

    // All-args constructor
    public DanhMuc( String tenDanhMuc, String moTa, String kieu, List<SanPham> sanPhams) {
        this.tenDanhMuc = tenDanhMuc;
        this.moTa = moTa;
        this.kieu = kieu;
        this.sanPhams = sanPhams;
    }
}