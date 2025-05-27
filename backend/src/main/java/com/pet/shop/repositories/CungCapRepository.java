package com.pet.shop.repositories;

import com.pet.shop.models.CungCap;
import com.pet.shop.models.CungCapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CungCapRepository extends JpaRepository<CungCap, CungCapId> {

    Optional<CungCap> findByNhaCungCap_MaNhaCungCapAndSanPham_MaSanPham(Long maNhaCungCap, Long maSanPham);
}