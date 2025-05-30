package com.pet.shop.repositories;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.ChiTietDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, ChiTietDonHangId> {
    List<ChiTietDonHang> findByDonHang_MaDonHang(Long maDonHang);
}

