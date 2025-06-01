package com.pet.shop.repositories;

import com.pet.shop.models.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang, Long> {

    // Tìm đơn hàng theo trạng thái
    List<DonHang> findByTrangThaiDonHang(String trangThaiDonHang);

    // Tìm đơn hàng theo mã người dùng (qua quan hệ NguoiDung)
    List<DonHang> findByNguoiDung_MaNguoiDung(Long maNguoiDung);

    // Tìm đơn hàng theo khoảng thời gian đặt hàng
    List<DonHang> findByNgayDatHangBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Tìm đơn hàng có tổng tiền lớn hơn hoặc bằng
    List<DonHang> findByTongTienGreaterThanEqual(BigDecimal minAmount);

    // Tìm đơn hàng kết hợp trạng thái và người dùng
    List<DonHang> findByTrangThaiDonHangAndNguoiDung_MaNguoiDung(String trangThaiDonHang, Long maNguoiDung);

    // Sửa lại các phương thức tính toán dùng native query với tên bảng/cột chính xác
    @Query(value = "SELECT COALESCE(SUM(d.tong_tien), 0) FROM don_hang d " +
            "WHERE d.trang_thai_don_hang = N'Đã giao' " +
            "AND (:startDate IS NULL OR d.ngay_dat_hang >= :startDate) " +
            "AND (:endDate IS NULL OR d.ngay_dat_hang <= :endDate)",
            nativeQuery = true)
    BigDecimal calculateTotalRevenue(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query(value = "SELECT COUNT(*) FROM don_hang d " +
            "WHERE d.trang_thai_don_hang = N'Đã giao' " +
            "AND (:startDate IS NULL OR d.ngay_dat_hang >= :startDate) " +
            "AND (:endDate IS NULL OR d.ngay_dat_hang <= :endDate)",
            nativeQuery = true)
    Long countCompletedOrders(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );
}