package com.pet.shop.controllers;

import com.pet.shop.models.SanPham;
import com.pet.shop.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
}