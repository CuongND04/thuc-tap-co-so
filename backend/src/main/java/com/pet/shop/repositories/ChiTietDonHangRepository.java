package com.pet.shop.repositories;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.ChiTietDonHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietDonHangRepository extends JpaRepository<ChiTietDonHang, ChiTietDonHangId> {
}
