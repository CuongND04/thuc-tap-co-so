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

    @Column(length = 200)
    private String diaChi;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(length = 100)
    private String email;

    @OneToMany(mappedBy = "nhaCungCap", cascade = CascadeType.ALL)
    private List<CungCap> cungCaps;
}