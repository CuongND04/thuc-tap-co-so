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
public class CungCapId implements Serializable {

    private Long maNhaCungCap;
    private Long maSanPham;
}