package com.pet.shop.services;

import com.pet.shop.dto.SimpleReviewDTO;
import com.pet.shop.models.DanhGia;
import com.pet.shop.repositories.DanhGiaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhGiaService {

    private final DanhGiaRepository danhGiaRepository;

    @Autowired
    public DanhGiaService(DanhGiaRepository danhGiaRepository) {
        this.danhGiaRepository = danhGiaRepository;
    }

    // Lấy tất cả đánh giá
    public List<SimpleReviewDTO> getAllReviews() {
        List<DanhGia> danhGias = danhGiaRepository.findAll();
        return danhGias.stream()
                       .map(this::convertToSimpleReviewDTO)
                       .collect(Collectors.toList());
    }

    private SimpleReviewDTO convertToSimpleReviewDTO(DanhGia danhGia) {
        SimpleReviewDTO dto = new SimpleReviewDTO();
        dto.setMaDanhGia(danhGia.getMaDanhGia());
        dto.setMaSanPham(danhGia.getSanPham() != null ? danhGia.getSanPham().getMaSanPham() : null);
        dto.setMaKhachHang(danhGia.getNguoiDung() != null ? danhGia.getNguoiDung().getMaNguoiDung() : null);
        dto.setNgayDanhGia(danhGia.getNgayDanhGia());
        dto.setSoSao(danhGia.getSoSao());
        dto.setNoiDung(danhGia.getNoiDung());
        return dto;
    }

    
} 