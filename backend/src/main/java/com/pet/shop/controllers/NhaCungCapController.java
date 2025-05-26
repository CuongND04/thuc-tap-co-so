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
import com.pet.shop.dto.NhaCungCapListDTO;

@RestController
@RequestMapping("/api/nha-cung-cap")
public class NhaCungCapController {

    @Autowired
    private NhaCungCapService nhaCungCapService;

    // Regex kiểm tra email và số điện thoại
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9+_.-]+@(.+)$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^\\d{10,11}$");

    @GetMapping
    public ResponseEntity<ResponseObject> getAllNhaCungCap() {
        List<NhaCungCapListDTO> list = nhaCungCapService.findAll();
        return ResponseEntity.ok(
                new ResponseObject("success", "Lấy danh sách nhà cung cấp thành công", list)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        Optional<NhaCungCap> ncc = nhaCungCapService.findById(id);
        return ncc.map(value -> {
            NhaCungCapListDTO dto = new NhaCungCapListDTO();
            dto.setMaNhaCungCap(value.getMaNhaCungCap());
            dto.setTen(value.getTen());
            dto.setDiaChi(value.getDiaChi());
            dto.setSoDienThoai(value.getSoDienThoai());
            dto.setEmail(value.getEmail());
            return ResponseEntity.ok(
                    new ResponseObject("success", "Lấy thông tin nhà cung cấp thành công", dto)
            );
        })
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
                        new ResponseObject("error", "Số điện thoại không hợp lệ (phải có 10 hoặc 11 chữ số)", null)
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
            Optional<NhaCungCap> existingOptional = nhaCungCapService.findById(id);
            if (existingOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("error", "Không tìm thấy nhà cung cấp với ID: " + id, null)
                );
            }

            NhaCungCap existingNCC = existingOptional.get();

            // Apply updates only for fields present in the request body
            if (updatedNCC.getTen() != null && !updatedNCC.getTen().isBlank()) {
                existingNCC.setTen(updatedNCC.getTen());
            }
            if (updatedNCC.getDiaChi() != null) {
                existingNCC.setDiaChi(updatedNCC.getDiaChi());
            }
            if (updatedNCC.getSoDienThoai() != null) {
                 // Basic validation for phone number if provided
                 if (!PHONE_PATTERN.matcher(updatedNCC.getSoDienThoai()).matches()) {
                     return ResponseEntity.badRequest().body(
                             new ResponseObject("error", "Số điện thoại không hợp lệ (phải có 10 chữ số)", null)
                     );
                 }
                existingNCC.setSoDienThoai(updatedNCC.getSoDienThoai());
            }
            if (updatedNCC.getEmail() != null) {
                // Basic validation for email if provided
                 if (!EMAIL_PATTERN.matcher(updatedNCC.getEmail()).matches()) {
                      return ResponseEntity.badRequest().body(
                              new ResponseObject("error", "Email không hợp lệ", null)
                      );
                 }
                existingNCC.setEmail(updatedNCC.getEmail());
            }

            NhaCungCap savedNCC = nhaCungCapService.save(existingNCC);

            NhaCungCapListDTO dto = new NhaCungCapListDTO();
            dto.setMaNhaCungCap(savedNCC.getMaNhaCungCap());
            dto.setTen(savedNCC.getTen());
            dto.setDiaChi(savedNCC.getDiaChi());
            dto.setSoDienThoai(savedNCC.getSoDienThoai());
            dto.setEmail(savedNCC.getEmail());

            return ResponseEntity.ok(
                    new ResponseObject("success", "Cập nhật nhà cung cấp thành công", dto)
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