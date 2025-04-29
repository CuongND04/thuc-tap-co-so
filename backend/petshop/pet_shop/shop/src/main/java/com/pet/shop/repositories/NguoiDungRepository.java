package com.pet.shop.repositories;


import com.pet.shop.models.NguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface NguoiDungRepository extends JpaRepository<NguoiDung, Long> {
    Optional<NguoiDung> findByTenDangNhap(String tenDangNhap);
}