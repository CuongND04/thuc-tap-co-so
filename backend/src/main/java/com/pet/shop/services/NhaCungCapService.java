package com.pet.shop.services;

import com.pet.shop.models.NhaCungCap;
import com.pet.shop.repositories.NhaCungCapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NhaCungCapService {

    private final NhaCungCapRepository nhaCungCapRepository;

    @Autowired
    public NhaCungCapService(NhaCungCapRepository nhaCungCapRepository) {
        this.nhaCungCapRepository = nhaCungCapRepository;
    }

    // Lấy tất cả nhà cung cấp
    public List<NhaCungCap> findAll() {
        return nhaCungCapRepository.findAll();
    }

    // Tìm nhà cung cấp theo ID
    public Optional<NhaCungCap> findById(Long id) {
        return nhaCungCapRepository.findById(id);
    }

    // Lưu hoặc cập nhật nhà cung cấp
    public NhaCungCap save(NhaCungCap nhaCungCap) {
        return nhaCungCapRepository.save(nhaCungCap);
    }

    // Xóa nhà cung cấp theo ID
    public void deleteById(Long id) {
        nhaCungCapRepository.deleteById(id);
    }

    // Tìm kiếm theo tên (ví dụ mở rộng)
    public List<NhaCungCap> findByTenContaining(String ten) {
        return nhaCungCapRepository.findByTenContainingIgnoreCase(ten);
    }

    // Tìm kiếm theo số điện thoại (ví dụ mở rộng)
    public Optional<NhaCungCap> findBySoDienThoai(String soDienThoai) {
        return nhaCungCapRepository.findBySoDienThoai(soDienThoai);
    }
}