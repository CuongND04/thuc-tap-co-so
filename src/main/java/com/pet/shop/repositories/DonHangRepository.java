package com.pet.shop.repositories;

import com.pet.shop.models.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Integer> {
    List<DonHang> findByKhachHang_MaNguoiDung(Integer maNguoiDung);
    List<DonHang> findByTrangThaiDonHang(String trangThaiDonHang);
    List<DonHang> findByNgayDatHangBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT SUM(d.tongTien) FROM DonHang d WHERE d.trangThaiDonHang = 'Đã thanh toán'")
    Double getTotalRevenue();

    @Query("SELECT COUNT(d) FROM DonHang d WHERE d.ngayDatHang >= :startDate")
    Long countOrdersSince(LocalDateTime startDate);
}

