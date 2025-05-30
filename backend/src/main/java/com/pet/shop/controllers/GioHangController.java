package com.pet.shop.controllers;

import com.pet.shop.dto.GioHangDTO;
import com.pet.shop.dto.ThemGioHangDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gio-hang")
public class GioHangController {
    private final GioHangService gioHangService;

    @Autowired
    public GioHangController(GioHangService gioHangService) {
        this.gioHangService = gioHangService;
    }

    @GetMapping("/{maKhachHang}")
    public ResponseEntity<ResponseObject> getGioHang(@PathVariable Long maKhachHang) {
        try {
            GioHangDTO gioHang = gioHangService.getGioHang(maKhachHang);
            return ResponseEntity.ok(new ResponseObject("success", "Lấy thông tin giỏ hàng thành công", gioHang));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PutMapping("/{maKhachHang}/cap-nhat/{maSanPham}")
    public ResponseEntity<ResponseObject> capNhatSoLuong(
            @PathVariable Long maKhachHang,
            @PathVariable Long maSanPham,
            @RequestBody ThemGioHangDTO capNhatGioHangDTO) {
        try {
            capNhatGioHangDTO.setMaSanPham(maSanPham);
            GioHangDTO gioHang = gioHangService.capNhatSoLuong(maKhachHang, capNhatGioHangDTO);
            return ResponseEntity.ok(new ResponseObject("success", "Cập nhật số lượng sản phẩm thành công", gioHang));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @DeleteMapping("/{maKhachHang}/xoa/{maSanPham}")
    public ResponseEntity<ResponseObject> xoaSanPham(
            @PathVariable Long maKhachHang,
            @PathVariable Long maSanPham) {
        try {
            GioHangDTO gioHang = gioHangService.xoaSanPham(maKhachHang, maSanPham);
            return ResponseEntity.ok(new ResponseObject("success", "Xóa sản phẩm khỏi giỏ hàng thành công", gioHang));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @PostMapping("/them-vao-gio")
    public ResponseEntity<ResponseObject> themSanPhamVaoGioHangChiDinh(
            @RequestParam Long maGioHang,
            @RequestParam Long maSanPham,
            @RequestParam Integer soLuong) {
        try {
            GioHangDTO gioHang = gioHangService.themSanPhamVaoGioHang(maGioHang, maSanPham, soLuong);
            return ResponseEntity.ok(new ResponseObject("success", "Thêm sản phẩm vào giỏ hàng thành công", gioHang));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }
}