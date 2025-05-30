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
public class ManualTaoDonHangRequestDTO {
    private Long maNguoiDung;
    private List<ManualChiTietDonHangItemDTO> chiTietDonHangs;
} 