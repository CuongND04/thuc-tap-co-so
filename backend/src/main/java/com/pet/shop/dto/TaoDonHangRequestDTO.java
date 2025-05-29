package com.pet.shop.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TaoDonHangRequestDTO {
    private Long maNguoiDung;
    private Long maNhaCungCap;
    private List<ChiTietDonHangRequestItemDTO> chiTietDonHangs;
    // Note: diaChiGiaoHang and soDienThoai were removed per user request
    // Note: ghiChu was removed per user request
} 