package com.pet.shop.repositories;

import com.pet.shop.models.DanhGia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DanhGiaRepository extends JpaRepository<DanhGia,Long> {
    List<DanhGia> findBySanPhamMaSanPham(Long productId);
}
