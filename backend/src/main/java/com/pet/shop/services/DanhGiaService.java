package com.pet.shop.services;

import com.pet.shop.dto.SimpleReviewDTO;
import com.pet.shop.dto.ReviewDTO;
import com.pet.shop.models.DanhGia;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.DanhGiaRepository;
import com.pet.shop.repositories.SanPhamRepository;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhGiaService {

    private final DanhGiaRepository danhGiaRepository;
    private final SanPhamRepository sanPhamRepository;
    private final NguoiDungRepository nguoiDungRepository;

    @Autowired
    public DanhGiaService(DanhGiaRepository danhGiaRepository,
                         SanPhamRepository sanPhamRepository,
                         NguoiDungRepository nguoiDungRepository) {
        this.danhGiaRepository = danhGiaRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.nguoiDungRepository = nguoiDungRepository;
    }

    // Lấy tất cả đánh giá
    public List<SimpleReviewDTO> getAllReviews() {
        List<DanhGia> danhGias = danhGiaRepository.findAll();
        return danhGias.stream()
                       .map(this::convertToSimpleReviewDTO)
                       .collect(Collectors.toList());
    }

    // Thêm đánh giá mới
    @Transactional
    public DanhGia createReview(ReviewDTO reviewDTO) {
        // Find product and customer
        SanPham sanPham = sanPhamRepository.findById(reviewDTO.getMaSanPham())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        
        NguoiDung nguoiDung = nguoiDungRepository.findById(reviewDTO.getMaKhachHang().intValue())
            .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        // Create new review
        DanhGia danhGia = new DanhGia();
        danhGia.setSanPham(sanPham);
        danhGia.setNguoiDung(nguoiDung);
        danhGia.setSoSao(reviewDTO.getSoSao());
        danhGia.setNoiDung(reviewDTO.getNoiDung());
        danhGia.setNgayDanhGia(LocalDateTime.now());

        return danhGiaRepository.save(danhGia);
    }

    // Xóa đánh giá
    @Transactional
    public void deleteReview(Long maDanhGia) {
        DanhGia danhGia = danhGiaRepository.findById(maDanhGia)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá"));
        danhGiaRepository.delete(danhGia);
    }

    // Cập nhật đánh giá
    @Transactional
    public DanhGia updateReview(Long maDanhGia, ReviewDTO reviewDTO) {
        DanhGia danhGia = danhGiaRepository.findById(maDanhGia)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy đánh giá"));

        // Update review fields
        danhGia.setSoSao(reviewDTO.getSoSao());
        danhGia.setNoiDung(reviewDTO.getNoiDung());
        danhGia.setNgayDanhGia(LocalDateTime.now());

        return danhGiaRepository.save(danhGia);
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
