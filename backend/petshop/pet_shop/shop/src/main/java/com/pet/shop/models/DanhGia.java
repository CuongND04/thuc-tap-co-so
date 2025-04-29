package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "danh_gia")
public class DanhGia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_danh_gia")
    private Long maDanhGia;

    @ManyToOne
    @JoinColumn(name = "ma_san_pham", nullable = false)
    private SanPham sanPham;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "ngay_danh_gia")
    private LocalDateTime ngayDanhGia;

    @Column(name = "so_sao")
    private Integer soSao;

    @Column(name = "noi_dung", columnDefinition = "NVARCHAR(MAX)")
    private String noiDung;
}