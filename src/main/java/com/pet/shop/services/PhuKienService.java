package com.pet.shop.services;

import com.pet.shop.dto.SanPhamDTO;
import com.pet.shop.models.PhuKien;
import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.PhuKienRepository;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PhuKienService {

    @Autowired
    private PhuKienRepository phuKienRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    /**
     * Lấy tất cả phụ kiện
     */
    public List<SanPhamDTO> getAllAccessories() {
        List<PhuKien> phuKienList = phuKienRepository.findAll();
        return phuKienList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy phụ kiện theo ID
     */
    public SanPhamDTO getAccessoryById(Integer id) {
        PhuKien phuKien = phuKienRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phụ kiện với ID: " + id));
        return convertToDto(phuKien);
    }

    /**
     * Lấy phụ kiện theo danh mục
     */
    public List<SanPhamDTO> getAccessoriesByCategory(Integer categoryId) {
        List<PhuKien> phuKienList = phuKienRepository.findBySanPham_DanhMuc_MaDanhMuc(categoryId);
        return phuKienList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy phụ kiện theo loại
     */
    public List<SanPhamDTO> getAccessoriesByType(String type) {
        List<PhuKien> phuKienList = phuKienRepository.findByLoaiPhuKienContaining(type);
        return phuKienList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Tìm kiếm phụ kiện theo từ khóa
     */
    public List<SanPhamDTO> searchAccessories(String keyword) {
        List<PhuKien> phuKienList = phuKienRepository.searchByKeyword(keyword);
        return phuKienList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Chuyển đổi entity thành DTO
     */
    private SanPhamDTO convertToDto(PhuKien phuKien) {
        SanPhamDTO dto = new SanPhamDTO();
        SanPham sanPham = phuKien.getSanPham();

        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());

        dto.setLoaiSanPham("PhuKien");
        dto.setMaPhuKien(phuKien.getMaPhuKien());
        dto.setSoLuongTonKho(phuKien.getSoLuongTonKho());
        dto.setLoaiPhuKien(phuKien.getLoaiPhuKien());

        return dto;
    }
}
