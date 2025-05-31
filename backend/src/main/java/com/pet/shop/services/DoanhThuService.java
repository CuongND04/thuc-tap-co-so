package com.pet.shop.services;

import com.pet.shop.dto.DoanhThuDTO;
import com.pet.shop.repositories.CungCapRepository;
import com.pet.shop.repositories.DonHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class DoanhThuService {

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private CungCapRepository cungCapRepository;

    public DoanhThuDTO getDoanhThu(LocalDateTime startDate, LocalDateTime endDate) {
        DoanhThuDTO dto = new DoanhThuDTO();

        // Xử lý ngày
        if (startDate != null) {
            startDate = startDate.with(LocalTime.MIN);
        }
        if (endDate != null) {
            endDate = endDate.with(LocalTime.MAX);
        }

        // Tính toán các chỉ số
        BigDecimal doanhThuBanHang = donHangRepository.calculateTotalRevenue(startDate, endDate);
        BigDecimal tienNhapHang = cungCapRepository.calculateTotalImportCost(startDate, endDate);
        Long tongDonHang = donHangRepository.countCompletedOrders(startDate, endDate);

        // Tính lợi nhuận
        BigDecimal loiNhuan = BigDecimal.ZERO;
        if (doanhThuBanHang != null) {
            loiNhuan = doanhThuBanHang.subtract(tienNhapHang != null ? tienNhapHang : BigDecimal.ZERO);
        }

        // Set giá trị cho DTO
        dto.setStartDateTime(startDate);
        dto.setEndDateTime(endDate);
        dto.setDoanhThuBanHang(doanhThuBanHang != null ? doanhThuBanHang : BigDecimal.ZERO);
        dto.setTienNhapHang(tienNhapHang != null ? tienNhapHang : BigDecimal.ZERO);
        dto.setLoiNhuan(loiNhuan);
        dto.setTongDonHang(tongDonHang != null ? tongDonHang : 0L);

        return dto;
    }
}
