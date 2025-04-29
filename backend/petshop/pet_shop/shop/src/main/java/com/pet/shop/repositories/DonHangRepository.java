package com.pet.shop.repositories;

import com.pet.shop.models.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonHangRepository extends JpaRepository<DonHang,Long> {

}
