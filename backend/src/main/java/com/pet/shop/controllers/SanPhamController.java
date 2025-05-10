package com.pet.shop.controllers;

import com.pet.shop.models.SanPham;
import com.pet.shop.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/san-pham")
public class SanPhamController {

    private final SanPhamService sanPhamService;

    @Autowired
    public SanPhamController(SanPhamService sanPhamService) {
        this.sanPhamService = sanPhamService;
    }

    @GetMapping
    public ResponseEntity<List<SanPham>> getAllSanPham() {
        List<SanPham> sanPhams = sanPhamService.findAll();
        return new ResponseEntity<>(sanPhams, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SanPham> getSanPhamById(@PathVariable Long id) {
        return sanPhamService.findById(id)
                .map(sanPham -> new ResponseEntity<>(sanPham, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<SanPham> createSanPham(@RequestBody SanPham sanPham) {
        SanPham savedSanPham = sanPhamService.save(sanPham);
        return new ResponseEntity<>(savedSanPham, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SanPham> updateSanPham(@PathVariable Long id, @RequestBody SanPham sanPham) {
        return sanPhamService.findById(id)
                .map(existingSanPham -> {
                    sanPham.setMaSanPham(id);
                    SanPham updatedSanPham = sanPhamService.save(sanPham);
                    return new ResponseEntity<>(updatedSanPham, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSanPham(@PathVariable Long id) {
        return sanPhamService.findById(id)
                .map(sanPham -> {
                    sanPhamService.deleteById(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/danh-muc/{maDanhMuc}")
    public ResponseEntity<List<SanPham>> getSanPhamByDanhMuc(@PathVariable Long maDanhMuc) {
        List<SanPham> sanPhams = sanPhamService.findByDanhMuc(maDanhMuc);
        return new ResponseEntity<>(sanPhams, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SanPham>> searchProducts(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) Long maDanhMuc,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        
        // If all parameters are provided
        if (tenSanPham != null && maDanhMuc != null && minPrice != null && maxPrice != null) {
            return new ResponseEntity<>(sanPhamService.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice), HttpStatus.OK);
        }
        
        // Search by name and category
        if (tenSanPham != null && maDanhMuc != null) {
            return new ResponseEntity<>(sanPhamService.searchByTenAndCategory(tenSanPham, maDanhMuc), HttpStatus.OK);
        }
        
        // Search by category and price range
        if (maDanhMuc != null && minPrice != null && maxPrice != null) {
            return new ResponseEntity<>(sanPhamService.searchByCategoryAndPrice(maDanhMuc, minPrice, maxPrice), HttpStatus.OK);
        }
        
        // Search by price range only
        if (minPrice != null && maxPrice != null) {
            return new ResponseEntity<>(sanPhamService.searchByPriceRange(minPrice, maxPrice), HttpStatus.OK);
        }
        
        // Search by name only
        if (tenSanPham != null) {
            return new ResponseEntity<>(sanPhamService.searchByTenSanPham(tenSanPham), HttpStatus.OK);
        }
        
        // If no search parameters provided, return all products
        return new ResponseEntity<>(sanPhamService.findAll(), HttpStatus.OK);
    }
}