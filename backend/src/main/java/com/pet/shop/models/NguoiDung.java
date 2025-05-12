package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "nguoi_dung")
public class NguoiDung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_nguoi_dung")
    private Long maNguoiDung;

    @Column(name = "ho_ten", nullable = false, length = 100)
    private String hoTen;

    @Column(name = "so_dien_thoai", length = 20)
    private String soDienThoai;

    @Column(length = 100)
    private String email;

    @Column(name = "dia_chi",length = 200)
    private String diaChi;

    @Column(name = "quyen_truy_cap", length = 50)
    private String quyenTruyCap;

    @Column(name = "mat_khau", length = 100)
    private String matKhau;

    @Column(name = "ten_dang_nhap", unique = true, length = 100)
    private String tenDangNhap;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    private List<GioHang> gioHangs;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    private List<DonHang> donHangs;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    private List<YeuThich> yeuThichs;

    @OneToMany(mappedBy = "nguoiDung", cascade = CascadeType.ALL)
    private List<DanhGia> danhGias;
    public NguoiDung(){}

    public NguoiDung( String hoTen, String soDienThoai, String email, String diaChi, String quyenTruyCap, String matKhau, String tenDangNhap) {
        this.hoTen = hoTen;
        this.soDienThoai = soDienThoai;
        this.email = email;
        this.diaChi = diaChi;
        this.quyenTruyCap = quyenTruyCap;
        this.matKhau = matKhau;
        this.tenDangNhap = tenDangNhap;
    }


}