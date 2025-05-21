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

@RestController
@RequestMapping("/api/don-hang")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    // Lấy tất cả đơn hàng
    @GetMapping
    public ResponseEntity<ResponseObject> getAllDonHang() {
        List<DonHang> list = donHangService.findAll();
        return ResponseEntity.ok(
                new ResponseObject("success", "Lấy danh sách đơn hàng thành công", list)
        );
    }

    // Lấy đơn hàng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        Optional<DonHang> donHang = donHangService.findById(id);
        return donHang.map(value -> ResponseEntity.ok(
                        new ResponseObject("success", "Lấy thông tin đơn hàng thành công", value)
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Không tìm thấy đơn hàng", "")
                ));
    }

    // Tạo mới đơn hàng
    @PostMapping
    public ResponseEntity<ResponseObject> createDonHang(@RequestBody DonHang newDonHang) {
        try {
            // Validate
            if(newDonHang.getChiTietDonHangs().isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Đơn hàng phải có ít nhất 1 sản phẩm", "")
                );
            }

            DonHang savedDonHang = donHangService.taoDonHang(newDonHang);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Tạo đơn hàng thành công", savedDonHang)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ResponseObject("error", "Lỗi khi tạo đơn hàng: " + e.getMessage(), "")
            );
        }
    }

    // Cập nhật trạng thái đơn hàng
    @PatchMapping("/{id}/trang-thai")
    public ResponseEntity<ResponseObject> updateTrangThai(
            @PathVariable Long id,
            @RequestParam String trangThai) {

        Optional<DonHang> existing = donHangService.findById(id);
        if(existing.isPresent()) {
            DonHang updated = donHangService.capNhatTrangThai(id, trangThai);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Cập nhật trạng thái thành công", updated)
            );
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("error", "Không tìm thấy đơn hàng", "")
        );
    }

    // Hủy đơn hàng
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> huyDonHang(@PathVariable Long id) {
        Optional<DonHang> existing = donHangService.findById(id);
        if(existing.isPresent()) {
            donHangService.huyDonHang(id);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Hủy đơn hàng thành công", "")
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("error", "Không tìm thấy đơn hàng", "")
        );
    }
}