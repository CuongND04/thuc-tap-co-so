package com.pet.shop.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ChiTietDonHangId implements Serializable {

    private Long maDonHang;
    private Long maSanPham;
}
