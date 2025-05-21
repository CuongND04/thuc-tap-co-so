package com.pet.shop.services;

import com.pet.shop.dto.DanhMucDTO;
import com.pet.shop.models.DanhMuc;
import com.pet.shop.repositories.DanhMucRepository;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhMucService {

    @Autowired
    private DanhMucRepository danhMucRepository;
    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<DanhMucDTO> getAllCategories() {
        return danhMucRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DanhMucDTO getCategoryById(Integer id) {
        return danhMucRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));
    }

    public List<DanhMucDTO> getCategoriesByType(String type) {
        return danhMucRepository.findByKieu(type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public DanhMucDTO createCategory(DanhMucDTO categoryDto) {
        // Kiểm tra đầu vào
        if (categoryDto.getTenDanhMuc() == null || categoryDto.getTenDanhMuc().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên danh mục không được để trống.");
        }
        if (categoryDto.getKieu() == null || categoryDto.getKieu().trim().isEmpty()) {
            throw new IllegalArgumentException("Kiểu danh mục không được để trống.");
        }

        String tenDanhMuc = categoryDto.getTenDanhMuc().trim();

        // Kiểm tra trùng tên
        if (danhMucRepository.existsByTenDanhMucIgnoreCase(tenDanhMuc)) {
            throw new IllegalArgumentException("Tên danh mục đã tồn tại.");
        }

        try {
            DanhMuc danhMuc = new DanhMuc();
            danhMuc.setTenDanhMuc(tenDanhMuc);
            danhMuc.setMoTa(categoryDto.getMoTa());
            danhMuc.setKieu(categoryDto.getKieu().trim());

            DanhMuc savedDanhMuc = danhMucRepository.save(danhMuc);
            return convertToDto(savedDanhMuc);
        } catch (Exception e) {
            throw new RuntimeException("Đã xảy ra lỗi khi tạo danh mục.");
        }
    }

    // khi mà dùng tính năng này mình sẽ gửi tất cả thông tin của danh mục lên kể cả những thông tin không thay đổi
    @Transactional
    public DanhMucDTO updateCategory(Integer id, DanhMucDTO categoryDto) {
        // Kiểm tra đầu vào
        if (categoryDto.getTenDanhMuc() == null || categoryDto.getTenDanhMuc().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên danh mục không được để trống.");
        }
        if (categoryDto.getKieu() == null || categoryDto.getKieu().trim().isEmpty()) {
            throw new IllegalArgumentException("Kiểu danh mục không được để trống.");
        }

        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));

        String newTenDanhMuc = categoryDto.getTenDanhMuc().trim();

        // Kiểm tra nếu tên mới đã tồn tại và không phải là chính danh mục đang chỉnh sửa
        boolean isDuplicate = danhMucRepository.existsByTenDanhMucIgnoreCase(newTenDanhMuc)
                && !newTenDanhMuc.equalsIgnoreCase(danhMuc.getTenDanhMuc());

        if (isDuplicate) {
            throw new IllegalArgumentException("Tên danh mục đã tồn tại.");
        }

        danhMuc.setTenDanhMuc(newTenDanhMuc);
        danhMuc.setMoTa(categoryDto.getMoTa());
        danhMuc.setKieu(categoryDto.getKieu().trim());

        DanhMuc updatedDanhMuc = danhMucRepository.save(danhMuc);
        return convertToDto(updatedDanhMuc);
    }



    @Transactional
    public void deleteCategory(Integer id) {
        if (!danhMucRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy danh mục với ID: " + id);
        }

        // Kiểm tra xem có sản phẩm nào thuộc danh mục này không
        long count = sanPhamRepository.countByDanhMuc_MaDanhMuc(id);
        if (count > 0) {
            throw new RuntimeException("Không thể xóa danh mục vì đang có " + count + " sản phẩm thuộc danh mục này.");
        }

        danhMucRepository.deleteById(id);
    }


    private DanhMucDTO convertToDto(DanhMuc danhMuc) {
        DanhMucDTO dto = new DanhMucDTO();
        dto.setMaDanhMuc(Math.toIntExact(danhMuc.getMaDanhMuc()));
        dto.setTenDanhMuc(danhMuc.getTenDanhMuc());
        dto.setMoTa(danhMuc.getMoTa());
        dto.setKieu(danhMuc.getKieu());
        return dto;
    }
}


