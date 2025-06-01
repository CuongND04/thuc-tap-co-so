package com.pet.shop.repositories;

import com.pet.shop.models.CungCap;
import com.pet.shop.models.CungCapId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface CungCapRepository extends JpaRepository<CungCap, CungCapId> {

    Optional<CungCap> findByNhaCungCap_MaNhaCungCapAndSanPham_MaSanPham(Long maNhaCungCap, Long maSanPham);
    @Query("SELECT SUM(cc.giaCungCap) FROM CungCap cc " + // Sửa vì không có trường soLuong
            "WHERE (:startDate IS NULL OR cc.ngayCungCap >= :startDate) " +
            "AND (:endDate IS NULL OR cc.ngayCungCap <= :endDate)")
    BigDecimal calculateTotalImportCost(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}