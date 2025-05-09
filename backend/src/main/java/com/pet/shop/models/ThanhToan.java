package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "thanh_toan")
public class ThanhToan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_giao_dich")
    private Long maGiaoDich;

    @ManyToOne
    @JoinColumn(name = "ma_don_hang", nullable = false)
    private DonHang donHang;

    @Column(name = "phuong_thuc_thanh_toan", length = 50)
    private String phuongThucThanhToan;

    @Column(name = "so_tien", precision = 18, scale = 2, nullable = false)
    private BigDecimal soTien;

    @Column(name = "thoi_gian_thanh_toan")
    private LocalDateTime thoiGianThanhToan;

    @Column(name = "trang_thai_giao_dich", length = 50)
    private String trangThaiGiaoDich;
}