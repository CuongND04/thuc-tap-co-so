package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ThongKeDoanhThuDTO {
    private Integer nam;
    private Integer quy;
    private BigDecimal doanhThu;
    private Integer soDonHang;
    private Integer soSanPhamDaBan;
}