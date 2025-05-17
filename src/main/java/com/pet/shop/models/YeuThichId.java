package com.pet.shop.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class YeuThichId implements Serializable {

    private Long maKhachHang;
    private Long maSanPham;
}
