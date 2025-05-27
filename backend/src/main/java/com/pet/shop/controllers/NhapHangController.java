package com.pet.shop.controllers;

import com.pet.shop.dto.NhapHangRequestDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.NhapHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/nhap-hang")
public class NhapHangController {

    private final NhapHangService nhapHangService;

    @Autowired
    public NhapHangController(NhapHangService nhapHangService) {
        this.nhapHangService = nhapHangService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject> nhapHang(@RequestBody NhapHangRequestDTO requestDTO) {
        try {
            nhapHangService.nhapHang(requestDTO);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Nhập hàng thành công. Số lượng tồn kho đã cập nhật.", null)
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (RuntimeException e) { // Catching RuntimeException for specific errors like supplier/product not found
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body( // Using BAD_REQUEST for business logic errors
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi nhập hàng: " + e.getMessage(), null)
            );
        }
    }
}