package com.pet.shop.services;

import com.pet.shop.dto.ChiTietSanPhamDTO;
import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SanPhamService {

    private final SanPhamRepository sanPhamRepository;

    @Autowired
    public SanPhamService(SanPhamRepository sanPhamRepository) {
        this.sanPhamRepository = sanPhamRepository;
    }

    public List<SanPham> findAll() {
        return sanPhamRepository.findAll();
    }

    public Optional<SanPham> findById(Long id) {
        return sanPhamRepository.findById(id);
    }

    public SanPham save(SanPham sanPham) {
        return sanPhamRepository.save(sanPham);
    }

    public void deleteById(Long id) {
        sanPhamRepository.deleteById(id);
    }

    public List<SanPham> findByDanhMuc(Long maDanhMuc) {
        return sanPhamRepository.findByDanhMucMaDanhMuc(maDanhMuc);
    }

    public List<SanPham> searchByTenSanPham(String tenSanPham) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCase(tenSanPham);
    }

    public List<SanPham> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByGiaBanBetween(minPrice, maxPrice);
    }

    public List<SanPham> searchByCategoryAndPrice(Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByDanhMucMaDanhMucAndGiaBanBetween(maDanhMuc, minPrice, maxPrice);
    }

    public List<SanPham> searchByTenAndCategory(String tenSanPham, Long maDanhMuc) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCaseAndDanhMucMaDanhMuc(tenSanPham, maDanhMuc);
    }

    public List<SanPham> searchProducts(String tenSanPham, Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
    }

    public Optional<ChiTietSanPhamDTO> getChiTietSanPham(Long maSanPham) {
        return sanPhamRepository.findById(maSanPham)
                .map(this::convertToChiTietSanPhamDTO);
    }

    private ChiTietSanPhamDTO convertToChiTietSanPhamDTO(SanPham sanPham) {
        ChiTietSanPhamDTO dto = new ChiTietSanPhamDTO();
        
        // Basic product information
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());
        
        // Category information
        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        
        // Pet information (if exists)
        if (sanPham.getThuCung() != null) {
            dto.setGiong(sanPham.getThuCung().getGiong());
            dto.setGioiTinh(sanPham.getThuCung().getGioiTinh());
            dto.setTuoi(sanPham.getThuCung().getTuoi());
            dto.setTrangThaiTiem(sanPham.getThuCung().getTrangThaiTiem());
            dto.setSoLuongThuCung(sanPham.getThuCung().getSoLuongTonKho());
        }
        
        // Accessory information (if exists)
        if (sanPham.getPhuKien() != null) {
            dto.setLoaiPhuKien(sanPham.getPhuKien().getLoaiPhuKien());
            dto.setSoLuongPhuKien(sanPham.getPhuKien().getSoLuongTonKho());
        }
        
        // Reviews
        if (sanPham.getDanhGias() != null) {
            dto.setDanhGias(sanPham.getDanhGias().stream()
                    .map(danhGia -> {
                        ChiTietSanPhamDTO.DanhGiaDTO danhGiaDTO = new ChiTietSanPhamDTO.DanhGiaDTO();
                        danhGiaDTO.setMaDanhGia(danhGia.getMaDanhGia());
                        danhGiaDTO.setNoiDung(danhGia.getNoiDung());
                        danhGiaDTO.setSoSao(danhGia.getSoSao()); 
                        danhGiaDTO.setTenNguoiDung(danhGia.getNguoiDung().getHoTen());  
                        danhGiaDTO.setNgayDanhGia(danhGia.getNgayDanhGia().toString());
                        return danhGiaDTO;
                    })
                    .collect(Collectors.toList()));
            
            // Calculate average rating
            double diemTrungBinh = sanPham.getDanhGias().stream()
                    .mapToInt(danhGia -> danhGia.getSoSao())
                    .average()
                    .orElse(0.0);
            dto.setDiemTrungBinh(diemTrungBinh);
        }
        
        return dto;
    }
}