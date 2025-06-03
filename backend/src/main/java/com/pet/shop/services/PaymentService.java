package com.pet.shop.services;

import com.pet.shop.repositories.ThanhToanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    @Autowired
    private ThanhToanRepository thanhToanRepository;

    public boolean isOrderPaid(Long orderId) {
        return thanhToanRepository.existsByDonHang_MaDonHang(orderId);
    }
}