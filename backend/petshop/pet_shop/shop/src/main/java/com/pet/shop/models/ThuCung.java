package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "thu_cung")
public class ThuCung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_thu_cung")
    private Long maThuCung;

    @OneToOne
    @JoinColumn(name = "ma_san_pham", unique = true, nullable = false)
    private SanPham sanPham;

    @Column(length = 50)
    private String giong;

    @Column(name = "gioi_tinh", length = 50)
    private String gioiTinh;

    @Column(length = 50)
    private String tuoi;

    @Column(name = "trang_thai_tiem", length = 100)
    private String trangThaiTiem;

    @Column(name = "so_luong_ton_kho")
    private Integer soLuongTonKho;
}
