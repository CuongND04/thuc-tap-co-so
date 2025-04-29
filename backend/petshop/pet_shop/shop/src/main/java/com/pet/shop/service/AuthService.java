package com.pet.shop.service;


import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    // Đăng ký
    public NguoiDung register(NguoiDung nguoiDung) {
        Optional<NguoiDung> existing = nguoiDungRepository.findByTenDangNhap(nguoiDung.getTenDangNhap());
        if (existing.isPresent()) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        // Mã hóa mật khẩu trước khi lưu
        String hash = BCrypt.hashpw(nguoiDung.getMatKhau(), BCrypt.gensalt());
        nguoiDung.setMatKhau(hash);

        return nguoiDungRepository.save(nguoiDung);
    }

    // Đăng nhập
    public boolean login(String tenDangNhap, String matKhau) {
        Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findByTenDangNhap(tenDangNhap);
        if (nguoiDungOpt.isPresent()) {
            NguoiDung nguoiDung = nguoiDungOpt.get();
            return BCrypt.checkpw(matKhau, nguoiDung.getMatKhau());
        }
        return false;
    }
}

