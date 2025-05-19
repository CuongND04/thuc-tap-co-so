package com.pet.shop.services;

import com.pet.shop.dto.DanhMucDTO;
import com.pet.shop.models.DanhMuc;
import com.pet.shop.repositories.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DanhMucService {

    @Autowired
    private DanhMucRepository danhMucRepository;

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
        DanhMuc danhMuc = new DanhMuc();
        danhMuc.setTenDanhMuc(categoryDto.getTenDanhMuc());
        danhMuc.setMoTa(categoryDto.getMoTa());
        danhMuc.setKieu(categoryDto.getKieu());

        DanhMuc savedDanhMuc = danhMucRepository.save(danhMuc);
        return convertToDto(savedDanhMuc);
    }

    @Transactional
    public DanhMucDTO updateCategory(Integer id, DanhMucDTO categoryDto) {
        DanhMuc danhMuc = danhMucRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy danh mục với ID: " + id));

        danhMuc.setTenDanhMuc(categoryDto.getTenDanhMuc());
        danhMuc.setMoTa(categoryDto.getMoTa());
        danhMuc.setKieu(categoryDto.getKieu());

        DanhMuc updatedDanhMuc = danhMucRepository.save(danhMuc);
        return convertToDto(updatedDanhMuc);
    }

    @Transactional
    public void deleteCategory(Integer id) {
        if (!danhMucRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy danh mục với ID: " + id);
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


