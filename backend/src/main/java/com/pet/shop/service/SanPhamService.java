package com.pet.shop.service;

import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
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

    public List<SanPham> searchByTenSanPham(String tenSanPham) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCase(tenSanPham);
    }

    public List<SanPham> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByGiaBanBetween(minPrice, maxPrice);
    }

    public List<SanPham> searchByCategoryAndPrice(Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByDanhMucMaDanhMucAndGiaBanBetween(maDanhMuc, minPrice, maxPrice);
    }

    public List<SanPham> searchByTenAndCategory(String tenSanPham, Long maDanhMuc) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCaseAndDanhMucMaDanhMuc(tenSanPham, maDanhMuc);
    }

    public List<SanPham> searchProducts(String tenSanPham, Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
    }
}