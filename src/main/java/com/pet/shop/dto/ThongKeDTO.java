package com.pet.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ThongKeDTO {
    private Long tongSoDonHang;
    private Long tongSoKhachHang;
    private Long tongSoSanPham;
    private BigDecimal tongDoanhThu;
    private Long donHangMoi;
    private Long sanPhamHetHang;
}

