package com.pet.shop.controllers;

import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.ThuCung;
import com.pet.shop.models.PhuKien;
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
import java.util.Map;
import java.util.LinkedHashMap;

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
    

    @DeleteMapping("/delete/{id}")
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
    // tao san pham la thu cung va phu kien dung chung api nhe
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createSanPham(@RequestBody SanPham newSanPham) {
        try {
            // Validate required fields
            if (newSanPham.getTenSanPham() == null || newSanPham.getTenSanPham().isEmpty()) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Tên sản phẩm không được để trống", null)
                );
            }

            if (newSanPham.getGiaBan() == null || newSanPham.getGiaBan().compareTo(BigDecimal.ZERO) <= 0) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Giá bán phải lớn hơn 0", null)
                );
            }

            if (newSanPham.getDanhMuc() == null || newSanPham.getDanhMuc().getMaDanhMuc() == null) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Danh mục không được để trống", null)
                );
            }

            // Validate that exactly one of ThuCung or PhuKien is provided
            boolean isThuCung = newSanPham.getThuCung() != null;
            boolean isPhuKien = newSanPham.getPhuKien() != null;

            if (isThuCung == isPhuKien) { // This is true if both are null or both are not null
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Sản phẩm phải là thú cưng hoặc phụ kiện, không thể cả hai hoặc không gì cả", null)
                );
            }

            // Create new product
            SanPham sanPhamToCreate = new SanPham();
            sanPhamToCreate.setTenSanPham(newSanPham.getTenSanPham());
            sanPhamToCreate.setHinhAnh(newSanPham.getHinhAnh());
            sanPhamToCreate.setMoTa(newSanPham.getMoTa());
            sanPhamToCreate.setGiaBan(newSanPham.getGiaBan());
            sanPhamToCreate.setDanhMuc(newSanPham.getDanhMuc());

            // Handle ThuCung relationship
            if (isThuCung) {
                ThuCung thuCung = new ThuCung();
                // Copy ThuCung properties, assuming they are provided in the request body within the sanPham object
                if (newSanPham.getThuCung().getGioiTinh() == null || newSanPham.getThuCung().getGioiTinh().isEmpty() ||
                    newSanPham.getThuCung().getTuoi() == null || newSanPham.getThuCung().getTuoi().isEmpty() ||
                    newSanPham.getThuCung().getTrangThaiTiem() == null || newSanPham.getThuCung().getTrangThaiTiem().isEmpty() ||
                    newSanPham.getThuCung().getSoLuongTonKho() == null || newSanPham.getThuCung().getSoLuongTonKho() < 0) {
                     return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Thông tin thú cưng không đầy đủ hoặc không hợp lệ", null)
                    );
                }

                thuCung.setGioiTinh(newSanPham.getThuCung().getGioiTinh());
                thuCung.setTuoi(newSanPham.getThuCung().getTuoi());
                thuCung.setTrangThaiTiem(newSanPham.getThuCung().getTrangThaiTiem());
                thuCung.setSoLuongTonKho(newSanPham.getThuCung().getSoLuongTonKho());
                thuCung.setSanPham(sanPhamToCreate); // Set the SanPham reference
                sanPhamToCreate.setThuCung(thuCung);
            }

            // Handle PhuKien relationship
            if (isPhuKien) {
                PhuKien phuKien = new PhuKien();
                 if (newSanPham.getPhuKien().getSoLuongTonKho() == null || newSanPham.getPhuKien().getSoLuongTonKho() < 0) {
                     return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Thông tin phụ kiện không đầy đủ hoặc không hợp lệ", null)
                    );
                }
                phuKien.setSoLuongTonKho(newSanPham.getPhuKien().getSoLuongTonKho());
                phuKien.setSanPham(sanPhamToCreate); // Set the SanPham reference
                sanPhamToCreate.setPhuKien(phuKien);
            }

            // Save the product (and cascade saves ThuCung/PhuKien)
            SanPham savedProduct = sanPhamService.save(sanPhamToCreate);

            // Build response data
            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("maSanPham", savedProduct.getMaSanPham());
            responseData.put("tenSanPham", savedProduct.getTenSanPham());
            responseData.put("hinhAnh", savedProduct.getHinhAnh());
            responseData.put("moTa", savedProduct.getMoTa());
            responseData.put("giaBan", savedProduct.getGiaBan());

            if (savedProduct.getDanhMuc() != null) {
                responseData.put("danhMuc", Map.of(
                    "maDanhMuc", savedProduct.getDanhMuc().getMaDanhMuc(),
                    "tenDanhMuc", savedProduct.getDanhMuc().getTenDanhMuc()
                ));
            }

            if (savedProduct.getThuCung() != null) {
                responseData.put("thuCung", Map.of(
                    "maThuCung", savedProduct.getThuCung().getMaThuCung(),
                    "gioiTinh", savedProduct.getThuCung().getGioiTinh(),
                    "tuoi", savedProduct.getThuCung().getTuoi(),
                    "trangThaiTiem", savedProduct.getThuCung().getTrangThaiTiem(),
                    "soLuongTonKho", savedProduct.getThuCung().getSoLuongTonKho()
                ));
            }

            if (savedProduct.getPhuKien() != null) {
                responseData.put("phuKien", Map.of(
                    "maPhuKien", savedProduct.getPhuKien().getMaPhuKien(),
                    "soLuongTonKho", savedProduct.getPhuKien().getSoLuongTonKho()
                ));
            }

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("success", "Thêm sản phẩm thành công", responseData)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("error", "Lỗi khi thêm sản phẩm: " + e.getMessage(), null)
            );
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateSanPham(
            @PathVariable Long id,
            @RequestBody SanPham updatedSanPham) {

        try {
            System.out.println(updatedSanPham);
            SanPham result = sanPhamService.updateSanPham(id, updatedSanPham);

            // Build response data (similar to create, or use a DTO if structure differs)
            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("maSanPham", result.getMaSanPham());
            responseData.put("tenSanPham", result.getTenSanPham());
            responseData.put("hinhAnh", result.getHinhAnh());
            responseData.put("moTa", result.getMoTa());
            responseData.put("giaBan", result.getGiaBan());

            if (result.getDanhMuc() != null) {
                responseData.put("danhMuc", Map.of(
                        "maDanhMuc", result.getDanhMuc().getMaDanhMuc(),
                        "tenDanhMuc", result.getDanhMuc().getTenDanhMuc()
                ));
            }

            if (result.getThuCung() != null) {
                responseData.put("thuCung", Map.of(
                        "maThuCung", result.getThuCung().getMaThuCung(),
                        "gioiTinh", result.getThuCung().getGioiTinh(),
                        "tuoi", result.getThuCung().getTuoi(),
                        "trangThaiTiem", result.getThuCung().getTrangThaiTiem(),
                        "soLuongTonKho", result.getThuCung().getSoLuongTonKho()
                ));
            }

            if (result.getPhuKien() != null) {
                responseData.put("phuKien", Map.of(
                        "maPhuKien", result.getPhuKien().getMaPhuKien(),
                        "soLuongTonKho", result.getPhuKien().getSoLuongTonKho()
                ));
            }

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Cập nhật sản phẩm thành công", responseData)
            );

        } catch (RuntimeException e) { // Catch specific exceptions from service if needed
             return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("failed", e.getMessage(), "")
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi cập nhật sản phẩm: " + e.getMessage(), null)
            );
        }
    }
}