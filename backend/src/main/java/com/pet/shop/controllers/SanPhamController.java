package com.pet.shop.controllers;

import com.pet.shop.dto.ChiTietSanPhamDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.SanPham;
import com.pet.shop.dto.SanPhamListDTO;
import com.pet.shop.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        List<SanPhamListDTO> sanPhams = sanPhamService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Get all products successfully", sanPhams)
        );
    }

    @GetMapping("/danh-muc/{maDanhMuc}")
    public ResponseEntity<ResponseObject> getSanPhamByDanhMuc(@PathVariable Long maDanhMuc) {
        List<SanPham> sanPhams = sanPhamService.findByDanhMuc(maDanhMuc);
        List<SanPhamListDTO> sanPhamDTOs = sanPhams.stream()
                .map(sanPham -> {
                    SanPhamListDTO dto = new SanPhamListDTO();
                    dto.setMaSanPham(sanPham.getMaSanPham());
                    dto.setTenSanPham(sanPham.getTenSanPham());
                    dto.setHinhAnh(sanPham.getHinhAnh());
                    dto.setMoTa(sanPham.getMoTa());
                    dto.setGiaBan(sanPham.getGiaBan());
                    if (sanPham.getDanhMuc() != null) {
                        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
                        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
                    }
                    return dto;
                })
                .collect(Collectors.toList());
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("success", "Get products by category successfully", sanPhamDTOs)
        );
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseObject> searchProducts(
            @RequestParam(required = false) String tenSanPham,
            @RequestParam(required = false) Long maDanhMuc,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {

        List<SanPham> searchResults;
        List<SanPhamListDTO> results;

        // If all parameters are provided
        if (tenSanPham != null && maDanhMuc != null && minPrice != null && maxPrice != null) {
            searchResults = sanPhamService.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
        }
        // Search by name and category
        else if (tenSanPham != null && maDanhMuc != null) {
            searchResults = sanPhamService.searchByTenAndCategory(tenSanPham, maDanhMuc);
        }
        // Search by category and price range
        else if (maDanhMuc != null && minPrice != null && maxPrice != null) {
            searchResults = sanPhamService.searchByCategoryAndPrice(maDanhMuc, minPrice, maxPrice);
        }
        // Search by price range only
        else if (minPrice != null && maxPrice != null) {
            searchResults = sanPhamService.searchByPriceRange(minPrice, maxPrice);
        }
        // Search by name only
        else if (tenSanPham != null) {
            searchResults = sanPhamService.searchByTenSanPham(tenSanPham);
        }
        // If no search parameters provided, return all products
        else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Search products successfully", sanPhamService.findAll())
            );
        }

        // Convert SanPham list to SanPhamListDTO list
        results = searchResults.stream()
                .map(sanPham -> {
                    SanPhamListDTO dto = new SanPhamListDTO();
                    dto.setMaSanPham(sanPham.getMaSanPham());
                    dto.setTenSanPham(sanPham.getTenSanPham());
                    dto.setHinhAnh(sanPham.getHinhAnh());
                    dto.setMoTa(sanPham.getMoTa());
                    dto.setGiaBan(sanPham.getGiaBan());
                    if (sanPham.getDanhMuc() != null) {
                        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
                        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
                    }
                    return dto;
                })
                .collect(Collectors.toList());

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
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateSanPham(
            @PathVariable Long id,
            @RequestBody SanPham updatedSanPham) {

        // Kiểm tra sản phẩm tồn tại
        Optional<SanPham> existingProduct = sanPhamService.findById(id);

        if (existingProduct.isPresent()) {
            // Cập nhật thông tin
            updatedSanPham.setMaSanPham(id); // Đảm bảo ID consistency
            SanPham savedProduct = sanPhamService.save(updatedSanPham);

            // Convert sang DTO
            ChiTietSanPhamDTO dto = sanPhamService.convertToChiTietSanPhamDTO(savedProduct);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Cập nhật sản phẩm thành công", dto)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Không tìm thấy sản phẩm với id = " + id, "")
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteSanPham(@PathVariable Long id) {
        Optional<SanPham> product = sanPhamService.findById(id);

        if (product.isPresent()) {
            sanPhamService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Xóa sản phẩm thành công", "")
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Không tìm thấy sản phẩm với id = " + id, "")
        );
    }
    @PostMapping
    public ResponseEntity<ResponseObject> createSanPham(@RequestBody SanPham newSanPham) {
        try {
            // Kiểm tra các trường bắt buộc
            if (newSanPham.getTenSanPham() == null || newSanPham.getTenSanPham().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Tên sản phẩm không được để trống", null)
                );
            }

            // Lưu sản phẩm mới
            SanPham savedProduct = sanPhamService.save(newSanPham);

            // Convert sang DTO
            ChiTietSanPhamDTO dto = sanPhamService.convertToChiTietSanPhamDTO(savedProduct);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Thêm sản phẩm thành công", dto)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi thêm sản phẩm: " + e.getMessage(), null)
            );
        }
    }
}