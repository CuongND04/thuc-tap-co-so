package com.pet.shop.repositories;

import com.pet.shop.models.YeuThich;
import com.pet.shop.models.YeuThichId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface YeuThichRepository extends JpaRepository<YeuThich, YeuThichId> {
    List<YeuThich> findByNguoiDungMaNguoiDung(Long maKhachHang);
}
