package com.pet.shop.service;

import com.pet.shop.dto.AuthResponse;
import com.pet.shop.dto.LoginRequest;
import com.pet.shop.dto.RegisterRequest;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate input
        if (request.getTenDangNhap() == null || request.getTenDangNhap().trim().isEmpty()) {
            throw new IllegalArgumentException("Tên đăng nhập không được để trống");
        }
        if (request.getMatKhau() == null || request.getMatKhau().length() < 6) {
            throw new IllegalArgumentException("Mật khẩu phải có ít nhất 6 ký tự");
        }

        // Check if username exists
        Optional<NguoiDung> existing = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());
        if (existing.isPresent()) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        // Create new user
        NguoiDung nguoiDung = new NguoiDung();
        nguoiDung.setTenDangNhap(request.getTenDangNhap());
        nguoiDung.setHoTen(request.getHoTen());
        nguoiDung.setSoDienThoai(request.getSoDienThoai());
        nguoiDung.setEmail(request.getEmail());
        nguoiDung.setDiaChi(request.getDiaChi());
        nguoiDung.setQuyenTruyCap(request.getQuyenTruyCap());
        
        // Hash password
        String hashedPassword = BCrypt.hashpw(request.getMatKhau(), BCrypt.gensalt());
        nguoiDung.setMatKhau(hashedPassword);

        // Save user
        NguoiDung savedUser = nguoiDungRepository.save(nguoiDung);

        // Return response
        return AuthResponse.builder()
                .tenDangNhap(savedUser.getTenDangNhap())
                .hoTen(savedUser.getHoTen())
                .quyenTruyCap(savedUser.getQuyenTruyCap())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Validate input
        if (request.getTenDangNhap() == null || request.getMatKhau() == null) {
            throw new IllegalArgumentException("Tên đăng nhập và mật khẩu không được để trống");
        }

        // Find user
        Optional<NguoiDung> nguoiDungOpt = nguoiDungRepository.findByTenDangNhap(request.getTenDangNhap());
        if (nguoiDungOpt.isEmpty()) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        NguoiDung nguoiDung = nguoiDungOpt.get();

        // Verify password
        if (!BCrypt.checkpw(request.getMatKhau(), nguoiDung.getMatKhau())) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        // Return response
        return AuthResponse.builder()
                .tenDangNhap(nguoiDung.getTenDangNhap())
                .hoTen(nguoiDung.getHoTen())
                .quyenTruyCap(nguoiDung.getQuyenTruyCap())
                .build();
    }
}

