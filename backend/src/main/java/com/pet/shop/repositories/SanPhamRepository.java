package com.pet.shop.repositories;

import com.pet.shop.models.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
    List<SanPham> findByDanhMucMaDanhMuc(Long maDanhMuc);
    
    // Search by name (case-insensitive)
    List<SanPham> findByTenSanPhamContainingIgnoreCase(String tenSanPham);

    @Query("SELECT s FROM SanPham s WHERE LOWER(s.tenSanPham) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<SanPham> searchByKeyword(String keyword);
    // Search by price range
    List<SanPham> findByGiaBanBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    // Search by category and price range
    List<SanPham> findByDanhMucMaDanhMucAndGiaBanBetween(Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice);
    
    // Search by name and category
    List<SanPham> findByTenSanPhamContainingIgnoreCaseAndDanhMucMaDanhMuc(String tenSanPham, Long maDanhMuc);
    
    // Search by name, category and price range
    @Query("SELECT s FROM SanPham s WHERE LOWER(s.tenSanPham) LIKE LOWER(CONCAT('%', :tenSanPham, '%')) " +
           "AND s.danhMuc.maDanhMuc = :maDanhMuc AND s.giaBan BETWEEN :minPrice AND :maxPrice")
    List<SanPham> searchProducts(@Param("tenSanPham") String tenSanPham,
                                @Param("maDanhMuc") Long maDanhMuc,
                                @Param("minPrice") BigDecimal minPrice,
                                @Param("maxPrice") BigDecimal maxPrice);
}