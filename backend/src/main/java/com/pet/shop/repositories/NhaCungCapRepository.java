package com.pet.shop.repositories;

import com.pet.shop.models.NhaCungCap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface NhaCungCapRepository extends JpaRepository<NhaCungCap, Long> {

    // Tìm kiếm theo tên (không phân biệt hoa thường)
    List<NhaCungCap> findByTenContainingIgnoreCase(String ten);

    // Tìm kiếm theo số điện thoại chính xác
    Optional<NhaCungCap> findBySoDienThoai(String soDienThoai);
}