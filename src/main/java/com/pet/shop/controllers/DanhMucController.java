package com.pet.shop.controllers;

import com.pet.shop.dto.DanhMucDTO;
import com.pet.shop.services.DanhMucService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class DanhMucController {

    @Autowired
    private DanhMucService danhMucService;

    @GetMapping
    public ResponseEntity<List<DanhMucDTO>> getAllCategories() {
        List<DanhMucDTO> categories = danhMucService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DanhMucDTO> getCategoryById(@PathVariable Integer id) {
        DanhMucDTO category = danhMucService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<DanhMucDTO>> getCategoriesByType(@PathVariable String type) {
        List<DanhMucDTO> categories = danhMucService.getCategoriesByType(type);
        return ResponseEntity.ok(categories);
    }

    @PostMapping
    public ResponseEntity<DanhMucDTO> createCategory(@RequestBody DanhMucDTO categoryDto) {
        DanhMucDTO createdCategory = danhMucService.createCategory(categoryDto);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DanhMucDTO> updateCategory(@PathVariable Integer id, @RequestBody DanhMucDTO categoryDto) {
        DanhMucDTO updatedCategory = danhMucService.updateCategory(id, categoryDto);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        danhMucService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
