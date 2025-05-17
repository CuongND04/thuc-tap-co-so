package com.pet.shop.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "cung_cap")
public class CungCap {

    @EmbeddedId
    private CungCapId id;

    @ManyToOne
    @MapsId("maNhaCungCap")
    @JoinColumn(name = "ma_nha_cung_cap")
    private NhaCungCap nhaCungCap;

    @ManyToOne
    @MapsId("maSanPham")
    @JoinColumn(name = "ma_san_pham")
    private SanPham sanPham;

    @Column(name = "gia_cung_cap", precision = 18, scale = 2, nullable = false)
    private BigDecimal giaCungCap;

    @Column(name = "ngay_cung_cap")
    private LocalDateTime ngayCungCap;

    public CungCap() {
    }

    public CungCap(NhaCungCap nhaCungCap, SanPham sanPham, BigDecimal giaCungCap, LocalDateTime ngayCungCap) {
        this.nhaCungCap = nhaCungCap;
        this.sanPham = sanPham;
        this.giaCungCap = giaCungCap;
        this.ngayCungCap = ngayCungCap;
    }
}