package com.pet.shop.service;

import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SanPhamService {

    private final SanPhamRepository sanPhamRepository;

    @Autowired
    public SanPhamService(SanPhamRepository sanPhamRepository) {
        this.sanPhamRepository = sanPhamRepository;
    }

    public List<SanPham> findAll() {
        return sanPhamRepository.findAll();
    }

    public Optional<SanPham> findById(Long id) {
        return sanPhamRepository.findById(id);
    }

    public SanPham save(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    public void deleteById(Long id) {
        sanPhamRepository.deleteById(id);
    }

    public List<SanPham> findByDanhMuc(Long maDanhMuc) {
        return sanPhamRepository.findByDanhMucMaDanhMuc(maDanhMuc);
    }
}