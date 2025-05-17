package com.pet.shop.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class ChiTietDonHangId implements Serializable {

    private Long maDonHang;
    private Long maSanPham;
}
