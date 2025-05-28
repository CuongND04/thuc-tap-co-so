package com.pet.shop.services;

import com.pet.shop.dto.DoanhThuDTO;
import com.pet.shop.repositories.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DoanhThuService {

    @Autowired
    private DonHangRepository donHangRepository;

    public DoanhThuDTO getDoanhThu(LocalDateTime startDate, LocalDateTime endDate) {
        DoanhThuDTO dto = new DoanhThuDTO();

        BigDecimal tongDoanhThu = donHangRepository.calculateTotalRevenue(startDate, endDate);
        Long tongDonHang = donHangRepository.countCompletedOrders(startDate, endDate);

        // Set ngày giờ nếu có
        if (startDate != null) dto.setStartDateTime(startDate);
        if (endDate != null) dto.setEndDateTime(endDate);

        dto.setTongDoanhThu(tongDoanhThu != null ? tongDoanhThu : BigDecimal.ZERO);
        dto.setTongDonHang(tongDonHang != null ? tongDonHang : 0L);

        return dto;
    }
}
