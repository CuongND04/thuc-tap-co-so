package com.pet.shop.repositories;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.ChiTietGioHangId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChiTietGioHangRepository extends JpaRepository<ChiTietDonHang, ChiTietGioHangId> {

}
