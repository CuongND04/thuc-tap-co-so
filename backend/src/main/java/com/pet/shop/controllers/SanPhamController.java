package com.pet.shop.controllers;

import com.pet.shop.dto.ChiTietSanPhamDTO;
import com.pet.shop.models.ResponseObject;
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
    public ResponseEntity<ResponseObject> getAllSanPham() {
        List<SanPham> sanPhams = sanPhamService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("success", "Get all products successfully", sanPhams)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getSanPhamById(@PathVariable Long id) {
        return sanPhamService.findById(id)
                .map(sanPham -> ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get product successfully", sanPham)
                ))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find product with id = " + id, "")
                ));
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createSanPham(@RequestBody SanPham sanPham) {
        SanPham savedSanPham = sanPhamService.save(sanPham);
        return ResponseEntity.status(HttpStatus.CREATED).body(
            new ResponseObject("success", "Create product successfully", savedSanPham)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateSanPham(@PathVariable Long id, @RequestBody SanPham sanPham) {
        return sanPhamService.findById(id)
                .map(existingSanPham -> {
                    sanPham.setMaSanPham(id);
                    SanPham updatedSanPham = sanPhamService.save(sanPham);
                    return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Update product successfully", updatedSanPham)
                    );
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find product with id = " + id, "")
                ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteSanPham(@PathVariable Long id) {
        return sanPhamService.findById(id)
                .map(sanPham -> {
                    sanPhamService.deleteById(id);
                    return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("success", "Delete product successfully", "")
                    );
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find product with id = " + id, "")
                ));
    }

    @GetMapping("/danh-muc/{maDanhMuc}")
    public ResponseEntity<ResponseObject> getSanPhamByDanhMuc(@PathVariable Long maDanhMuc) {
        List<SanPham> sanPhams = sanPhamService.findByDanhMuc(maDanhMuc);
        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("success", "Get products by category successfully", sanPhams)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchProducts(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) Long maDanhMuc,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        
        List<SanPham> results;
        
        // If all parameters are provided
        if (tenSanPham != null && maDanhMuc != null && minPrice != null && maxPrice != null) {
            results = sanPhamService.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
        }
        // Search by name and category
        else if (tenSanPham != null && maDanhMuc != null) {
            results = sanPhamService.searchByTenAndCategory(tenSanPham, maDanhMuc);
        }
        // Search by category and price range
        else if (maDanhMuc != null && minPrice != null && maxPrice != null) {
            results = sanPhamService.searchByCategoryAndPrice(maDanhMuc, minPrice, maxPrice);
        }
        // Search by price range only
        else if (minPrice != null && maxPrice != null) {
            results = sanPhamService.searchByPriceRange(minPrice, maxPrice);
        }
        // Search by name only
        else if (tenSanPham != null) {
            results = sanPhamService.searchByTenSanPham(tenSanPham);
        }
        // If no search parameters provided, return all products
        else {
            results = sanPhamService.findAll();
        }
        
        return ResponseEntity.status(HttpStatus.OK).body(
            new ResponseObject("success", "Search products successfully", results)
        );
    }

    @GetMapping("/{id}/chi-tiet")
    public ResponseEntity<ResponseObject> getChiTietSanPham(@PathVariable Long id) {
        return sanPhamService.getChiTietSanPham(id)
                .map(dto -> ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Get product detail successfully", dto)
                ))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", "Cannot find product detail with id = " + id, "")
                ));
    }
}