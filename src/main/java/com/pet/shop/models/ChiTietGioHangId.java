package com.pet.shop.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class ChiTietGioHangId implements Serializable {

    private Long maGioHang;
    private Long maSanPham;
}