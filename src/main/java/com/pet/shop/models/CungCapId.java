package com.pet.shop.models;

import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class CungCapId implements Serializable {

    private Long maNhaCungCap;
    private Long maSanPham;
}