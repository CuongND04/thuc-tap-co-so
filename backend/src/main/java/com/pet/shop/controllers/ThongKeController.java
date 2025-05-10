package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamBanChayDTO;
import com.pet.shop.dto.ThongKeDoanhThuDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/thong-ke")
public class ThongKeController {
    private final ThongKeService thongKeService;

    @Autowired
    public ThongKeController(ThongKeService thongKeService) {
        this.thongKeService = thongKeService;
    }

    @GetMapping("/doanh-thu/quy/{nam}")
    public ResponseEntity<ResponseObject> thongKeTheoQuy(@PathVariable Integer nam) {
        try {
            List<ThongKeDoanhThuDTO> thongKe = thongKeService.thongKeTheoQuy(nam);
            return ResponseEntity.ok(new ResponseObject("success", "Lấy thống kê doanh thu theo quý thành công", thongKe));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    @GetMapping("/doanh-thu/nam")
    public ResponseEntity<ResponseObject> thongKeTheoNam() {
        try {
            List<ThongKeDoanhThuDTO> thongKe = thongKeService.thongKeTheoNam();
            return ResponseEntity.ok(new ResponseObject("success", "Lấy thống kê doanh thu theo năm thành công", thongKe));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", "Có lỗi xảy ra khi thống kê doanh thu", null));
        }
    }

    @GetMapping("/san-pham-ban-chay")
    public ResponseEntity<ResponseObject> thongKeSanPhamBanChay() {
        try {
            List<SanPhamBanChayDTO> sanPhamBanChay = thongKeService.thongKeSanPhamBanChay();
            String message = sanPhamBanChay.size() <= 10 ? 
                           "Lấy thống kê sản phẩm bán chạy thành công" :
                           "Lấy top 10 sản phẩm bán chạy thành công";
            return ResponseEntity.ok(new ResponseObject("success", message, sanPhamBanChay));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", "Có lỗi xảy ra khi thống kê sản phẩm bán chạy", null));
        }
    }
} 