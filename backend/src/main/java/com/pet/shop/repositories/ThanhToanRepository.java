package com.pet.shop.repositories;

import com.pet.shop.models.ThanhToan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThanhToanRepository extends JpaRepository<ThanhToan,Long> {

    // Kiểm tra xem có thanh toán nào tồn tại với đơn hàng orderId không
    boolean existsByDonHang_MaDonHang(Long orderId);
}
