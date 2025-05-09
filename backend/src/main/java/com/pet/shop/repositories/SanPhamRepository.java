package com.pet.shop.repositories;

import com.pet.shop.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    List<SanPham> findByDanhMucMaDanhMuc(Long maDanhMuc);
}