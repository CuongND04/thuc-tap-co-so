package com.pet.shop.controllers;

import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.NhaCungCap;
import com.pet.shop.services.NhaCungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/nha-cung-cap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    // Regex kiểm tra email và số điện thoại
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10}$");

    @GetMapping
    public ResponseEntity<ResponseObject> getAllNhaCungCap() {
        List<NhaCungCap> list = nhaCungCapService.findAll();
        return ResponseEntity.ok(
                new ResponseObject("success", "Lấy danh sách nhà cung cấp thành công", list)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        Optional<NhaCungCap> ncc = nhaCungCapService.findById(id);
        return ncc.map(value -> ResponseEntity.ok(
                        new ResponseObject("success", "Lấy thông tin nhà cung cấp thành công", value)
                ))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Không tìm thấy nhà cung cấp với ID: " + id, null)
                ));
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createNhaCungCap(@RequestBody NhaCungCap newNCC) {
        try {
            // Validate các trường bắt buộc
            if (newNCC.getTen() == null || newNCC.getTen().isBlank()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Tên nhà cung cấp không được để trống", null)
                );
            }

            // Validate số điện thoại
            if (newNCC.getSoDienThoai() != null && !PHONE_PATTERN.matcher(newNCC.getSoDienThoai()).matches()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Số điện thoại không hợp lệ (phải có 10 chữ số)", null)
                );
            }

            // Validate email
            if (newNCC.getEmail() != null && !EMAIL_PATTERN.matcher(newNCC.getEmail()).matches()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Email không hợp lệ", null)
                );
            }

            NhaCungCap savedNCC = nhaCungCapService.save(newNCC);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Thêm nhà cung cấp thành công", savedNCC)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi thêm nhà cung cấp: " + e.getMessage(), null)
            );
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateNhaCungCap(
            @PathVariable Long id,
            @RequestBody NhaCungCap updatedNCC) {

        try {
            Optional<NhaCungCap> existing = nhaCungCapService.findById(id);
            if (existing.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Không tìm thấy nhà cung cấp với ID: " + id, null)
                );
            }

            // Validate các trường
            if (updatedNCC.getTen() == null || updatedNCC.getTen().isBlank()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("error", "Tên nhà cung cấp không được để trống", null)
                );
            }

            // Cập nhật thông tin
            updatedNCC.setMaNhaCungCap(id);
            NhaCungCap savedNCC = nhaCungCapService.save(updatedNCC);

            return ResponseEntity.ok(
                    new ResponseObject("success", "Cập nhật nhà cung cấp thành công", savedNCC)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi cập nhật: " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteNhaCungCap(@PathVariable Long id) {
        try {
            Optional<NhaCungCap> existing = nhaCungCapService.findById(id);
            if (existing.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Không tìm thấy nhà cung cấp với ID: " + id, null)
                );
            }

            nhaCungCapService.deleteById(id);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Xóa nhà cung cấp thành công", null)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi xóa: " + e.getMessage(), null)
            );
        }
    }
}