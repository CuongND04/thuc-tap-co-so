package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Data
@Entity
@Table(name = "gio_hang")
public class GioHang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma_gio_hang")
    private Long maGioHang;

    @ManyToOne
    @JoinColumn(name = "ma_khach_hang", nullable = false)
    private NguoiDung nguoiDung;

    @OneToMany(mappedBy = "gioHang", cascade = CascadeType.ALL)
    private List<ChiTietGioHang> chiTietGioHangs;
}