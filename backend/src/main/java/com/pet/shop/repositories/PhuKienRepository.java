package com.pet.shop.repositories;

import com.pet.shop.models.PhuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhuKienRepository extends JpaRepository<PhuKien, Integer> {
    Optional<PhuKien> findBySanPham_MaSanPham(Integer maSanPham);
    List<PhuKien> findBySanPham_DanhMuc_MaDanhMuc(Integer maDanhMuc);
    long countBySoLuongTonKho(Integer soLuongTonKho);

    @Query("SELECT p FROM PhuKien p JOIN p.sanPham s WHERE " +
            "LOWER(s.tenSanPham) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PhuKien> searchByKeyword(String keyword);
}
