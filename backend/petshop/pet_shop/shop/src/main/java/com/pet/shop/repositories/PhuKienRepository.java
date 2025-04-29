package com.pet.shop.repositories;

import com.pet.shop.models.PhuKien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhuKienRepository extends JpaRepository<PhuKien,Long> {
}
