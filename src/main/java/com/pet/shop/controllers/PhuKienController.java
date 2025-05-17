package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamDTO;
import com.pet.shop.services.PhuKienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/accessories")
public class PhuKienController {

    @Autowired
    private PhuKienService phuKienService;

    /**
     * Lấy tất cả phụ kiện
     */
    @GetMapping
    public ResponseEntity<List<SanPhamDTO>> getAllAccessories() {
        List<SanPhamDTO> accessories = phuKienService.getAllAccessories();
        return ResponseEntity.ok(accessories);
    }

    /**
     * Lấy phụ kiện theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamDTO> getAccessoryById(@PathVariable Integer id) {
        SanPhamDTO accessory = phuKienService.getAccessoryById(id);
        return ResponseEntity.ok(accessory);
    }

    /**
     * Lấy phụ kiện theo danh mục
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<SanPhamDTO>> getAccessoriesByCategory(@PathVariable Integer categoryId) {
        List<SanPhamDTO> accessories = phuKienService.getAccessoriesByCategory(categoryId);
        return ResponseEntity.ok(accessories);
    }

    /**
     * Lấy phụ kiện theo loại
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<SanPhamDTO>> getAccessoriesByType(@PathVariable String type) {
        List<SanPhamDTO> accessories = phuKienService.getAccessoriesByType(type);
        return ResponseEntity.ok(accessories);
    }

    /**
     * Tìm kiếm phụ kiện theo từ khóa
     */
    @GetMapping("/search")
    public ResponseEntity<List<SanPhamDTO>> searchAccessories(@RequestParam String keyword) {
        List<SanPhamDTO> accessories = phuKienService.searchAccessories(keyword);
        return ResponseEntity.ok(accessories);
    }
}
