package com.pet.shop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ManualTaoDonHangRequestDTO {
    private Long maNguoiDung;
    private List<ManualChiTietDonHangItemDTO> chiTietDonHangs;
} 