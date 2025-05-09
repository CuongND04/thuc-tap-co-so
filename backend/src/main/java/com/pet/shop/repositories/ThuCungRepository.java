package com.pet.shop.repositories;

import com.pet.shop.models.ThuCung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThuCungRepository extends JpaRepository<ThuCung,Long> {

}
