package com.pet.shop.controllers;

import com.pet.shop.dto.DanhMucDTO;
import com.pet.shop.models.ResponseObject;
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
    public ResponseEntity<ResponseObject> getAllCategories() {
        try {
            List<DanhMucDTO> categories = danhMucService.getAllCategories();
            return ResponseEntity.ok(new ResponseObject("success", "Lấy danh sách danh mục thành công", categories));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getCategoryById(@PathVariable Integer id) {
        try {
            DanhMucDTO category = danhMucService.getCategoryById(id);
            return ResponseEntity.ok(new ResponseObject("success", "Lấy danh mục theo ID thành công", category));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<ResponseObject> getCategoriesByType(@PathVariable String type) {
        try {
            List<DanhMucDTO> categories = danhMucService.getCategoriesByType(type);
            return ResponseEntity.ok(new ResponseObject("success", "Lấy danh sách danh mục theo kiểu thành công", categories));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createCategory(@RequestBody DanhMucDTO categoryDto) {
        try {
            DanhMucDTO createdCategory = danhMucService.createCategory(categoryDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseObject("success", "Tạo danh mục thành công", createdCategory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateCategory(@PathVariable Integer id, @RequestBody DanhMucDTO categoryDto) {
        try {
            DanhMucDTO updatedCategory = danhMucService.updateCategory(id, categoryDto);
            return ResponseEntity.ok(new ResponseObject("success", "Cập nhật danh mục thành công", updatedCategory));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> deleteCategory(@PathVariable Integer id) {
        try {
            danhMucService.deleteCategory(id);
            return ResponseEntity.ok(new ResponseObject("success", "Xóa danh mục thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }
}