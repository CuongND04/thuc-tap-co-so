package com.pet.shop.controllers;

import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.DonHang;
import com.pet.shop.services.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import com.pet.shop.dto.DonHangListResponseDTO;
import com.pet.shop.dto.DonHangDetailResponseDTO;
import com.pet.shop.dto.ManualTaoDonHangRequestDTO;

@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    // Lấy tất cả đơn hàng
    @GetMapping
    public ResponseEntity<ResponseObject> getAllDonHang() {
        try {
            List<DonHangListResponseDTO> donHangs = donHangService.findAll();
            return ResponseEntity.ok(
                    new ResponseObject("success", "Lấy danh sách đơn hàng thành công", donHangs)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi lấy danh sách đơn hàng: " + e.getMessage(), null)
            );
        }
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        try {
            Optional<DonHangDetailResponseDTO> donHangDetail = donHangService.findDonHangDetailById(id);
            return donHangDetail.map(value -> ResponseEntity.ok(
                            new ResponseObject("success", "Lấy thông tin chi tiết đơn hàng thành công", value)
                    ))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("error", "Không tìm thấy đơn hàng với ID: " + id, null)
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi lấy thông tin chi tiết đơn hàng: " + e.getMessage(), null)
            );
        }
    }

    // Tạo mới đơn hàng (sử dụng DTO với chi tiết được cung cấp thủ công)
    @PostMapping
    public ResponseEntity<ResponseObject> createDonHang(@RequestBody ManualTaoDonHangRequestDTO requestDTO) {
        try {
            // Validate order items are not empty
            if(requestDTO.getChiTietDonHangs() == null || requestDTO.getChiTietDonHangs().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Đơn hàng phải có ít nhất 1 sản phẩm", null)
                );
            }

            DonHangDetailResponseDTO savedDonHang = donHangService.taoDonHangManual(requestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Tạo đơn hàng thành công", savedDonHang)
            );
        } catch (IllegalArgumentException e) {
             return ResponseEntity.badRequest().body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (RuntimeException e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ResponseObject("error", "Lỗi khi tạo đơn hàng: " + e.getMessage(), null)
            );
        }
    }

    // Cập nhật trạng thái đơn hàng
    @PatchMapping("/{id}/trang-thai")
    public ResponseEntity<ResponseObject> updateTrangThai(
            @PathVariable Long id,
            @RequestParam String trangThai) {

        try {
            System.out.println("trangThai " + trangThai);
            System.out.println("id " + id);
            DonHangDetailResponseDTO updated = donHangService.capNhatTrangThai(id, trangThai);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Cập nhật trạng thái thành công", updated)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi cập nhật trạng thái đơn hàng: " + e.getMessage(), null)
            );
        }
    }

    // Hủy đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> huyDonHang(@PathVariable Long id) {
        try {
            donHangService.huyDonHang(id);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Hủy đơn hàng thành công", null)
            );
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi hủy đơn hàng: " + e.getMessage(), null)
            );
        }
    }
}