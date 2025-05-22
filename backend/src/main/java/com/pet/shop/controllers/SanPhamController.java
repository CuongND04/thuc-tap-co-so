package com.pet.shop.controllers;

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
    @PutMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateSanPham(
            @PathVariable Long id,
            @RequestBody SanPham updatedSanPham) {

        // Kiểm tra sản phẩm tồn tại
        Optional<SanPham> existingProductOptional = sanPhamService.findById(id);

        if (existingProductOptional.isPresent()) {
            SanPham existingProduct = existingProductOptional.get();

            // Cập nhật thông tin cơ bản
            if (updatedSanPham.getTenSanPham() != null) {
                existingProduct.setTenSanPham(updatedSanPham.getTenSanPham());
            }
            if (updatedSanPham.getHinhAnh() != null) {
                existingProduct.setHinhAnh(updatedSanPham.getHinhAnh());
            }
            if (updatedSanPham.getMoTa() != null) {
                existingProduct.setMoTa(updatedSanPham.getMoTa());
            }
            if (updatedSanPham.getGiaBan() != null) {
                existingProduct.setGiaBan(updatedSanPham.getGiaBan());
            }

            // Cập nhật danh mục nếu được cung cấp trong request body
            if (updatedSanPham.getDanhMuc() != null && updatedSanPham.getDanhMuc().getMaDanhMuc() != null) {
                // Chuyển đổi Long sang Integer cho maDanhMuc
                Integer maDanhMucInteger = updatedSanPham.getDanhMuc().getMaDanhMuc().intValue();
                Optional<com.pet.shop.models.DanhMuc> danhMucOptional = sanPhamService.findDanhMucById(maDanhMucInteger);
                if (danhMucOptional.isPresent()) {
                    existingProduct.setDanhMuc(danhMucOptional.get());
                } else {
                    // Xử lý trường hợp maDanhMuc không tồn tại nếu cần, hiện tại bỏ qua
                    // return ResponseEntity.badRequest().body(new ResponseObject("failed", "Mã danh mục không tồn tại", ""));
                }
            } else if (updatedSanPham.getDanhMuc() != null && updatedSanPham.getDanhMuc().getMaDanhMuc() == null) {
                 // Nếu danhMuc được cung cấp nhưng maDanhMuc là null, set danh muc về null
                 existingProduct.setDanhMuc(null);
            }

            // Lưu sản phẩm đã cập nhật
            SanPham savedProduct = sanPhamService.save(existingProduct);

            // Xây dựng response data theo định dạng yêu cầu (không có tenDanhMuc)
            Map<String, Object> responseData = new LinkedHashMap<>(); // Sử dụng LinkedHashMap để giữ thứ tự các trường
            responseData.put("ma_san_pham", savedProduct.getMaSanPham());
            responseData.put("ten_san_pham", savedProduct.getTenSanPham());

            // Thêm maDanhMuc nếu sản phẩm có danh mục
            if (savedProduct.getDanhMuc() != null) {
                responseData.put("ma_danh_muc", savedProduct.getDanhMuc().getMaDanhMuc());
            } else {
                responseData.put("ma_danh_muc", null); // Hoặc bỏ qua trường này nếu không muốn hiển thị null
            }

            responseData.put("hinh_anh", savedProduct.getHinhAnh());
            responseData.put("mo_ta", savedProduct.getMoTa());
            responseData.put("gia_ban", savedProduct.getGiaBan());

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("success", "Cập nhật sản phẩm thành công", responseData)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("failed", "Không tìm thấy sản phẩm với id = " + id, "")
        );
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
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createSanPham(@RequestBody SanPham newSanPham) {
        try {
            // Kiểm tra các trường bắt buộc
            if (newSanPham.getTenSanPham() == null || newSanPham.getTenSanPham().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Tên sản phẩm không được để trống", null)
                );
            }

            // Tạo sản phẩm mới và gán các thuộc tính từ request body
            SanPham sanPhamToCreate = new SanPham();
            sanPhamToCreate.setTenSanPham(newSanPham.getTenSanPham());
            sanPhamToCreate.setHinhAnh(newSanPham.getHinhAnh());
            sanPhamToCreate.setMoTa(newSanPham.getMoTa());
            sanPhamToCreate.setGiaBan(newSanPham.getGiaBan());
            // Các thuộc tính khác nếu có...

            // Gán danh mục nếu được cung cấp trong request body
            if (newSanPham.getDanhMuc() != null && newSanPham.getDanhMuc().getMaDanhMuc() != null) {
                // Chuyển đổi Long sang Integer cho maDanhMuc
                Integer maDanhMucInteger = newSanPham.getDanhMuc().getMaDanhMuc().intValue();
                Optional<com.pet.shop.models.DanhMuc> danhMucOptional = sanPhamService.findDanhMucById(maDanhMucInteger);
                if (danhMucOptional.isPresent()) {
                    sanPhamToCreate.setDanhMuc(danhMucOptional.get());
                } else {
                    // Xử lý trường hợp maDanhMuc không tồn tại nếu cần, hiện tại bỏ qua
                    // return ResponseEntity.badRequest().body(new ResponseObject("failed", "Mã danh mục không tồn tại", null));
                }
            }

            // Lưu sản phẩm mới
            SanPham savedProduct = sanPhamService.save(sanPhamToCreate);

            // Xây dựng response data theo định dạng yêu cầu (không có tenDanhMuc)
            Map<String, Object> responseData = new LinkedHashMap<>(); // Sử dụng LinkedHashMap để giữ thứ tự các trường
            responseData.put("ma_san_pham", savedProduct.getMaSanPham());
            responseData.put("ten_san_pham", savedProduct.getTenSanPham());

            // Thêm maDanhMuc nếu sản phẩm có danh mục
            if (savedProduct.getDanhMuc() != null) {
                responseData.put("ma_danh_muc", savedProduct.getDanhMuc().getMaDanhMuc());
            } else {
                responseData.put("ma_danh_muc", null); // Hoặc bỏ qua trường này nếu không muốn hiển thị null
            }

            responseData.put("hinh_anh", savedProduct.getHinhAnh());
            responseData.put("mo_ta", savedProduct.getMoTa());
            responseData.put("gia_ban", savedProduct.getGiaBan());

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Thêm sản phẩm thành công", responseData)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi thêm sản phẩm: " + e.getMessage(), null)
            );
        }
    }
}