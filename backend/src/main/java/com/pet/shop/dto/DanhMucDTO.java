package com.pet.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DanhMucDTO {
    private Integer maDanhMuc;
    private String tenDanhMuc;
    private String moTa;
    private String kieu;
}

