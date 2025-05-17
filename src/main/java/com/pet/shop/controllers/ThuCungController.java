package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamDTO;
import com.pet.shop.services.ThuCungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/pets")
public class ThuCungController {

    @Autowired
    private ThuCungService thuCungService;

    /**
     * Lấy tất cả thú cưng
     */
    @GetMapping
    public ResponseEntity<List<SanPhamDTO>> getAllPets() {
        List<SanPhamDTO> pets = thuCungService.getAllPets();
        return ResponseEntity.ok(pets);
    }

    /**
     * Lấy thú cưng theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<SanPhamDTO> getPetById(@PathVariable Integer id) {
        SanPhamDTO pet = thuCungService.getPetById(id);
        return ResponseEntity.ok(pet);
    }

    /**
     * Lấy thú cưng theo danh mục
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<SanPhamDTO>> getPetsByCategory(@PathVariable Integer categoryId) {
        List<SanPhamDTO> pets = thuCungService.getPetsByCategory(categoryId);
        return ResponseEntity.ok(pets);
    }

    /**
     * Lấy thú cưng theo giống
     */
    @GetMapping("/breed/{breed}")
    public ResponseEntity<List<SanPhamDTO>> getPetsByBreed(@PathVariable String breed) {
        List<SanPhamDTO> pets = thuCungService.getPetsByBreed(breed);
        return ResponseEntity.ok(pets);
    }

    /**
     * Lấy thú cưng theo giới tính
     */
    @GetMapping("/gender/{gender}")
    public ResponseEntity<List<SanPhamDTO>> getPetsByGender(@PathVariable String gender) {
        List<SanPhamDTO> pets = thuCungService.getPetsByGender(gender);
        return ResponseEntity.ok(pets);
    }

    /**
     * Tìm kiếm thú cưng theo từ khóa
     */
    @GetMapping("/search")
    public ResponseEntity<List<SanPhamDTO>> searchPets(@RequestParam String keyword) {
        List<SanPhamDTO> pets = thuCungService.searchPets(keyword);
        return ResponseEntity.ok(pets);
    }
}
