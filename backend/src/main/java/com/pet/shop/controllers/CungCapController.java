package com.pet.shop.controllers;

import com.pet.shop.dto.CungCapRequestDTO;
import com.pet.shop.dto.CungCapListDTO;
import com.pet.shop.dto.CungCapDetailDTO;
import com.pet.shop.models.CungCap;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.CungCapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cung-cap")
public class CungCapController {

    private final CungCapService cungCapService;

    @Autowired
    public CungCapController(CungCapService cungCapService) {
        this.cungCapService = cungCapService;
    }

    @PostMapping
    public ResponseEntity<ResponseObject> createCungCap(@RequestBody CungCapRequestDTO requestDTO) {
        try {
            CungCapDetailDTO newCungCap = cungCapService.createCungCap(requestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("success", "Liên kết Cung cấp đã được tạo thành công", newCungCap)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi tạo liên kết Cung cấp: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllCungCap() {
        try {
            List<CungCapListDTO> cungCaps = cungCapService.getAllCungCap();
            return ResponseEntity.ok(
                    new ResponseObject("success", "Lấy danh sách liên kết Cung cấp thành công", cungCaps)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi lấy danh sách liên kết Cung cấp: " + e.getMessage(), null)
            );
        }
    }

    @GetMapping("/{maNhaCungCap}/{maSanPham}")
    public ResponseEntity<ResponseObject> getCungCapById(@PathVariable Long maNhaCungCap, @PathVariable Long maSanPham) {
        try {
            return cungCapService.getCungCapById(maNhaCungCap, maSanPham)
                    .map(cungCapDetailDTO -> ResponseEntity.ok(
                            new ResponseObject("success", "Lấy thông tin liên kết Cung cấp thành công", cungCapDetailDTO)
                    ))
                    .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            new ResponseObject("error", "Không tìm thấy liên kết Cung cấp với ID đã cho", null)
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi lấy thông tin liên kết Cung cấp: " + e.getMessage(), null)
            );
        }
    }

    @PutMapping("/{maNhaCungCap}/{maSanPham}")
    public ResponseEntity<ResponseObject> updateCungCap(@PathVariable Long maNhaCungCap, @PathVariable Long maSanPham, @RequestBody CungCapRequestDTO requestDTO) {
        try {
            CungCapDetailDTO updatedCungCap = cungCapService.updateCungCap(maNhaCungCap, maSanPham, requestDTO);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Cập nhật liên kết Cung cấp thành công", updatedCungCap)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi cập nhật liên kết Cung cấp: " + e.getMessage(), null)
            );
        }
    }

    @DeleteMapping("/{maNhaCungCap}/{maSanPham}")
    public ResponseEntity<ResponseObject> deleteCungCap(@PathVariable Long maNhaCungCap, @PathVariable Long maSanPham) {
        try {
            cungCapService.deleteCungCap(maNhaCungCap, maSanPham);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Xóa liên kết Cung cấp thành công", null)
            );
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("error", e.getMessage(), null)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("error", "Lỗi khi xóa liên kết Cung cấp: " + e.getMessage(), null)
            );
        }
    }
} 