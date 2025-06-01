package com.pet.shop.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class DoanhThuDTO {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDateTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDateTime;

    private BigDecimal doanhThuBanHang;
    private BigDecimal tienNhapHang;
    private BigDecimal loiNhuan;
    private long tongDonHang;
}
