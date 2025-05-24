package com.pet.shop.controllers;

import com.pet.shop.dto.SimpleReviewDTO;
import com.pet.shop.dto.ReviewDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.DanhGia;
import com.pet.shop.services.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
public class DanhGiaController {

    private final DanhGiaService danhGiaService;

    @Autowired
    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    // Lấy tất cả đánh giá
    @GetMapping
    public ResponseEntity<ResponseObject> getAllReviews() {
        try {
            List<SimpleReviewDTO> reviews = danhGiaService.getAllReviews();
            return ResponseEntity.ok(new ResponseObject("success", "Lấy tất cả đánh giá thành công", reviews));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    // Thêm đánh giá mới
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            // Validate required fields
            if (reviewDTO.getMaSanPham() == null || reviewDTO.getMaKhachHang() == null || 
                reviewDTO.getSoSao() == null || reviewDTO.getNoiDung() == null) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Vui lòng điền đầy đủ thông tin đánh giá", null)
                );
            }

            // Validate rating range
            if (reviewDTO.getSoSao() < 1 || reviewDTO.getSoSao() > 5) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Số sao phải từ 1 đến 5", null)
                );
            }

            DanhGia savedReview = danhGiaService.createReview(reviewDTO);

            // Build response data according to DanhGia model
            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("maDanhGia", savedReview.getMaDanhGia());
            responseData.put("sanPham", Map.of(
                "maSanPham", savedReview.getSanPham().getMaSanPham(),
                "tenSanPham", savedReview.getSanPham().getTenSanPham()
            ));
            responseData.put("nguoiDung", Map.of(
                "maNguoiDung", savedReview.getNguoiDung().getMaNguoiDung(),
                "hoTen", savedReview.getNguoiDung().getHoTen()
            ));
            responseData.put("soSao", savedReview.getSoSao());
            responseData.put("noiDung", savedReview.getNoiDung());
            responseData.put("ngayDanhGia", savedReview.getNgayDanhGia());

            return ResponseEntity.status(HttpStatus.CREATED).body(
                new ResponseObject("success", "Thêm đánh giá thành công", responseData)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("error", "Lỗi khi thêm đánh giá: " + e.getMessage(), null)
            );
        }
    }

    // Xóa đánh giá
    @DeleteMapping("/{maDanhGia}")
    public ResponseEntity<ResponseObject> deleteReview(@PathVariable Long maDanhGia) {
        try {
            danhGiaService.deleteReview(maDanhGia);
            return ResponseEntity.ok(
                new ResponseObject("success", "Xóa đánh giá thành công", null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("error", "Lỗi khi xóa đánh giá: " + e.getMessage(), null)
            );
        }
    }

    // Cập nhật đánh giá
    @PutMapping("/{maDanhGia}")
    public ResponseEntity<ResponseObject> updateReview(
            @PathVariable Long maDanhGia,
            @RequestBody ReviewDTO reviewDTO) {
        try {
            // Validate required fields
            if (reviewDTO.getSoSao() == null || reviewDTO.getNoiDung() == null) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Vui lòng điền đầy đủ thông tin đánh giá", null)
                );
            }

            // Validate rating range
            if (reviewDTO.getSoSao() < 1 || reviewDTO.getSoSao() > 5) {
                return ResponseEntity.badRequest().body(
                    new ResponseObject("error", "Số sao phải từ 1 đến 5", null)
                );
            }

            DanhGia updatedReview = danhGiaService.updateReview(maDanhGia, reviewDTO);

            // Build response data
            Map<String, Object> responseData = new LinkedHashMap<>();
            responseData.put("maDanhGia", updatedReview.getMaDanhGia());
            responseData.put("sanPham", Map.of(
                "maSanPham", updatedReview.getSanPham().getMaSanPham(),
                "tenSanPham", updatedReview.getSanPham().getTenSanPham()
            ));
            responseData.put("nguoiDung", Map.of(
                "maNguoiDung", updatedReview.getNguoiDung().getMaNguoiDung(),
                "hoTen", updatedReview.getNguoiDung().getHoTen()
            ));
            responseData.put("soSao", updatedReview.getSoSao());
            responseData.put("noiDung", updatedReview.getNoiDung());
            responseData.put("ngayDanhGia", updatedReview.getNgayDanhGia());

            return ResponseEntity.ok(
                new ResponseObject("success", "Cập nhật đánh giá thành công", responseData)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("error", "Lỗi khi cập nhật đánh giá: " + e.getMessage(), null)
            );
        }
    }
} 