package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "yeu_thich")
public class YeuThich {

    @EmbeddedId
    private YeuThichId id;

    @ManyToOne
    @MapsId("maKhachHang")
    @JoinColumn(name = "ma_khach_hang")
    private NguoiDung nguoiDung;

    @ManyToOne
    @MapsId("maSanPham")
    @JoinColumn(name = "ma_san_pham")
    private SanPham sanPham;

    @Column(name = "thoi_gian_them")
    private LocalDateTime thoiGianThem;
}
