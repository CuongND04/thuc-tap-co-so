package com.pet.shop.services;

import com.pet.shop.dto.SanPhamYeuThichDTO;
import com.pet.shop.models.*;
import com.pet.shop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class YeuThichService {
    private final YeuThichRepository yeuThichRepository;
    private final SanPhamRepository sanPhamRepository;
    private final NguoiDungRepository nguoiDungRepository;

    @Autowired
    public YeuThichService(YeuThichRepository yeuThichRepository,
                          SanPhamRepository sanPhamRepository,
                          NguoiDungRepository nguoiDungRepository) {
        this.yeuThichRepository = yeuThichRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.nguoiDungRepository = nguoiDungRepository;
    }

    public List<SanPhamYeuThichDTO> getDanhSachYeuThich(Long maKhachHang) {
        return yeuThichRepository.findByNguoiDungMaNguoiDung(maKhachHang).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void themYeuThich(Long maKhachHang, Long maSanPham) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(Math.toIntExact(maKhachHang))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        YeuThichId yeuThichId = new YeuThichId();
        yeuThichId.setMaKhachHang(maKhachHang);
        yeuThichId.setMaSanPham(maSanPham);

        if (yeuThichRepository.existsById(yeuThichId)) {
            throw new RuntimeException("Sản phẩm đã có trong danh sách yêu thích");
        }

        YeuThich yeuThich = new YeuThich();
        yeuThich.setId(yeuThichId);
        yeuThich.setNguoiDung(nguoiDung);
        yeuThich.setSanPham(sanPham);
        yeuThich.setThoiGianThem(LocalDateTime.now());

        yeuThichRepository.save(yeuThich);
    }

    @Transactional
    public void xoaYeuThich(Long maKhachHang, Long maSanPham) {
        YeuThichId yeuThichId = new YeuThichId();
        yeuThichId.setMaKhachHang(maKhachHang);
        yeuThichId.setMaSanPham(maSanPham);

        if (!yeuThichRepository.existsById(yeuThichId)) {
            throw new RuntimeException("Sản phẩm không có trong danh sách yêu thích");
        }

        yeuThichRepository.deleteById(yeuThichId);
    }

    private SanPhamYeuThichDTO convertToDTO(YeuThich yeuThich) {
        SanPhamYeuThichDTO dto = new SanPhamYeuThichDTO();
        SanPham sanPham = yeuThich.getSanPham();
        
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        dto.setThoiGianThem(yeuThich.getThoiGianThem());
        
        return dto;
    }
} 