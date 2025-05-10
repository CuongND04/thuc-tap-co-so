package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamYeuThichDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.service.YeuThichService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yeu-thich")
public class YeuThichController {
    private final YeuThichService yeuThichService;

    @Autowired
    public YeuThichController(YeuThichService yeuThichService) {
        this.yeuThichService = yeuThichService;
    }

    @GetMapping("/{maKhachHang}")
    public ResponseEntity<ResponseObject> getDanhSachYeuThich(@PathVariable Long maKhachHang) {
        try {
            List<SanPhamYeuThichDTO> danhSach = yeuThichService.getDanhSachYeuThich(maKhachHang);
            return ResponseEntity.ok(new ResponseObject("success", "Lấy danh sách yêu thích thành công", danhSach));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/{maKhachHang}/them/{maSanPham}")
    public ResponseEntity<ResponseObject> themYeuThich(
            @PathVariable Long maKhachHang,
            @PathVariable Long maSanPham) {
        try {
            yeuThichService.themYeuThich(maKhachHang, maSanPham);
            return ResponseEntity.ok(new ResponseObject("success", "Thêm vào danh sách yêu thích thành công", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @DeleteMapping("/{maKhachHang}/xoa/{maSanPham}")
    public ResponseEntity<ResponseObject> xoaYeuThich(
            @PathVariable Long maKhachHang,
            @PathVariable Long maSanPham) {
        try {
            yeuThichService.xoaYeuThich(maKhachHang, maSanPham);
            return ResponseEntity.ok(new ResponseObject("success", "Xóa khỏi danh sách yêu thích thành công", null));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }
} 