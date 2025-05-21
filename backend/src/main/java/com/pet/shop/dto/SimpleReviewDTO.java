package com.pet.shop.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SimpleReviewDTO {
    private Long maDanhGia;
    private Long maSanPham;
    private Long maKhachHang;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime ngayDanhGia;

    private Integer soSao;
    private String noiDung;
} 