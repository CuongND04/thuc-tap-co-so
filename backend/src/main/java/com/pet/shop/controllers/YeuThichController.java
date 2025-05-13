package com.pet.shop.controllers;

import com.pet.shop.dto.SanPhamYeuThichDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.models.SanPham;
import com.pet.shop.services.YeuThichService;
import com.pet.shop.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/yeu-thich")
public class YeuThichController {
    private final YeuThichService yeuThichService;
    private final SanPhamService sanPhamService;

    @Autowired
    public YeuThichController(YeuThichService yeuThichService, SanPhamService sanPhamService) {
        this.yeuThichService = yeuThichService;
        this.sanPhamService = sanPhamService;
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
            Optional<SanPham> sanPham = sanPhamService.findById(maSanPham);
            if (!sanPham.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new ResponseObject("error", "Không tìm thấy sản phẩm với mã " + maSanPham, null));
            }
            
            yeuThichService.themYeuThich(maKhachHang, maSanPham);
            
            SanPhamYeuThichDTO dto = new SanPhamYeuThichDTO();
            dto.setMaSanPham(sanPham.get().getMaSanPham());
            dto.setTenSanPham(sanPham.get().getTenSanPham());
            dto.setHinhAnh(sanPham.get().getHinhAnh());
            dto.setMoTa(sanPham.get().getMoTa());
            dto.setGiaBan(sanPham.get().getGiaBan());
            dto.setTenDanhMuc(sanPham.get().getDanhMuc().getTenDanhMuc());
            dto.setThoiGianThem(LocalDateTime.now());
            
            return ResponseEntity.ok(new ResponseObject("success", "Thêm vào danh sách yêu thích thành công", dto));
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
            Optional<SanPham> sanPhamOpt = sanPhamService.findById(maSanPham);
            if (!sanPhamOpt.isPresent()) {
                return ResponseEntity.badRequest()
                        .body(new ResponseObject("error", "Không tìm thấy sản phẩm với mã " + maSanPham, null));
            }
            SanPhamYeuThichDTO dto = mapToYeuThichDTO(sanPhamOpt.get());
            return ResponseEntity.ok(new ResponseObject("success", "Xoá sản phẩm yêu thích thành công", dto));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    private SanPhamYeuThichDTO mapToYeuThichDTO(SanPham sanPham) {
        SanPhamYeuThichDTO dto = new SanPhamYeuThichDTO();
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        return dto;
    }
}