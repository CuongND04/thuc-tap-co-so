package com.pet.shop.controllers;

import com.pet.shop.dto.ThanhToanRequestDTO;
import com.pet.shop.dto.ThanhToanResponseDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.ThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thanh-toan")
public class ThanhToanController {
    private final ThanhToanService thanhToanService;

    @Autowired
    public ThanhToanController(ThanhToanService thanhToanService) {
        this.thanhToanService = thanhToanService;
    }

    @PostMapping("/{maKhachHang}")
    public ResponseEntity<ResponseObject> thanhToan(
            @PathVariable Long maKhachHang,
            @RequestBody ThanhToanRequestDTO request) {
        try {
            ThanhToanResponseDTO response = thanhToanService.thanhToan(maKhachHang, request);
            return ResponseEntity.ok(new ResponseObject("success", "Thanh toán thành công", response));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }
} 