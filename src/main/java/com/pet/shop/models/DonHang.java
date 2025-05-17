package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "don_hang")
public class DonHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_don_hang")
    private Long maDonHang;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private NguoiDung nguoiDung;

    @Column(name = "ngay_dat_hang")
    private LocalDateTime ngayDatHang;

    @Column(name = "tong_tien", precision = 18, scale = 2, nullable = false)
    private BigDecimal tongTien;

    @Column(name = "trang_thai_don_hang", length = 50)
    private String trangThaiDonHang;

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL)
    private List<ChiTietDonHang> chiTietDonHangs;

    @OneToMany(mappedBy = "donHang", cascade = CascadeType.ALL)
    private List<ThanhToan> thanhToans;

    // No-args constructor
    public DonHang() {
    }

    // All-args constructor
    public DonHang( NguoiDung nguoiDung, LocalDateTime ngayDatHang, BigDecimal tongTien,
                  String trangThaiDonHang, List<ChiTietDonHang> chiTietDonHangs, List<ThanhToan> thanhToans) {
        this.nguoiDung = nguoiDung;
        this.ngayDatHang = ngayDatHang;
        this.tongTien = tongTien;
        this.trangThaiDonHang = trangThaiDonHang;
        this.chiTietDonHangs = chiTietDonHangs;
        this.thanhToans = thanhToans;
    }
}
