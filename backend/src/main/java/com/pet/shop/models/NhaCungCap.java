package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "nha_cung_cap")
public class NhaCungCap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nha_cung_cap")
    private Long maNhaCungCap;

    @Column(nullable = false, length = 200)
    private String ten;

    @Column(name = "dia_chi",length = 200)
    private String diaChi;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(length = 100)
    private String email;

    @OneToMany(mappedBy = "nhaCungCap", cascade = CascadeType.ALL)
    private List<CungCap> cungCaps;

    // No-args constructor
    public NhaCungCap() {
    }

    // All-args constructor
    public NhaCungCap( String ten, String diaChi, String soDienThoai, 
                     String email, List<CungCap> cungCaps) {
        this.ten = ten;
        this.diaChi = diaChi;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.cungCaps = cungCaps;
    }
}