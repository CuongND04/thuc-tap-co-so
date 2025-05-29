package com.pet.shop.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class DoanhThuDTO {
    private String startDateTime;
    private String endDateTime;
    private BigDecimal tongDoanhThu;
    private long tongDonHang;

    public void setStartDateTime(LocalDateTime dateTime) {
        this.startDateTime = dateTime != null
                ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                : null;
    }

    public void setEndDateTime(LocalDateTime dateTime) {
        this.endDateTime = dateTime != null
                ? dateTime.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
                : null;
    }
}
