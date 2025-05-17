package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamDTO;
import com.pet.shop.services.PhuKienService;
import com.pet.shop.services.ThuCungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class PublicApiController {

    @Autowired
    private ThuCungService thuCungService;

    @Autowired
    private PhuKienService phuKienService;

    /**
     * API lấy tất cả thú cưng và phụ kiện
     */
    @GetMapping("/products")
    public ResponseEntity<Map<String, Object>> getAllProducts() {
        Map<String, Object> response = new HashMap<>();
        response.put("thuCung", thuCungService.getAllPets());
        response.put("phuKien", phuKienService.getAllAccessories());
        return ResponseEntity.ok(response);
    }

    /**
     * API lấy tất cả thú cưng
     */
    @GetMapping("/pets")
    public ResponseEntity<List<SanPhamDTO>> getAllPets() {
        return ResponseEntity.ok(thuCungService.getAllPets());
    }

    /**
     * API lấy tất cả phụ kiện
     */
    @GetMapping("/accessories")
    public ResponseEntity<List<SanPhamDTO>> getAllAccessories() {
        return ResponseEntity.ok(phuKienService.getAllAccessories());
    }

    /**
     * API tìm kiếm sản phẩm
     */
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@RequestParam String keyword) {
        Map<String, Object> response = new HashMap<>();
        response.put("thuCung", thuCungService.searchPets(keyword));
        response.put("phuKien", phuKienService.searchAccessories(keyword));
        return ResponseEntity.ok(response);
    }

    /**
     * API lấy chi tiết thú cưng
     */
    @GetMapping("/pets/{id}")
    public ResponseEntity<SanPhamDTO> getPetDetail(@PathVariable Integer id) {
        return ResponseEntity.ok(thuCungService.getPetById(id));
    }

    /**
     * API lấy chi tiết phụ kiện
     */
    @GetMapping("/accessories/{id}")
    public ResponseEntity<SanPhamDTO> getAccessoryDetail(@PathVariable Integer id) {
        return ResponseEntity.ok(phuKienService.getAccessoryById(id));
    }

    /**
     * API lấy thú cưng theo danh mục
     */
    @GetMapping("/pets/category/{categoryId}")
    public ResponseEntity<List<SanPhamDTO>> getPetsByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(thuCungService.getPetsByCategory(categoryId));
    }

    /**
     * API lấy phụ kiện theo danh mục
     */
    @GetMapping("/accessories/category/{categoryId}")
    public ResponseEntity<List<SanPhamDTO>> getAccessoriesByCategory(@PathVariable Integer categoryId) {
        return ResponseEntity.ok(phuKienService.getAccessoriesByCategory(categoryId));
    }
}

