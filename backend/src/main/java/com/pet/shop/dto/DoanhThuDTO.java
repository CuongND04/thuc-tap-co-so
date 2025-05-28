package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class DoanhThuDTO {
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private BigDecimal tongDoanhThu;
    private long tongDonHang;

    // Thêm phương thức để lấy ngày dưới dạng chuỗi đẹp
    public String getFormattedStartDate() {
        return startDateTime != null
                ? startDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE)
                : "";
    }

    public String getFormattedEndDate() {
        return endDateTime != null
                ? endDateTime.format(DateTimeFormatter.ISO_LOCAL_DATE)
                : "";
    }
}
