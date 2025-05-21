package com.pet.shop.services;

import com.pet.shop.dto.CreateUserRequest;
import com.pet.shop.dto.UpdateUserRequest;
import com.pet.shop.dto.UserDTO;
import com.pet.shop.exceptions.AppException;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserManagementService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    // Lấy danh sách tất cả người dùng
    public List<UserDTO> getAllUsers() {
        List<NguoiDung> nguoiDungs = nguoiDungRepository.findAll();
        return nguoiDungs.stream()
                         .map(this::convertToUserDTO)
                         .collect(Collectors.toList());
    }

    private UserDTO convertToUserDTO(NguoiDung nguoiDung) {
        UserDTO userDTO = new UserDTO();
        userDTO.setMaNguoiDung(nguoiDung.getMaNguoiDung());
        userDTO.setTenDangNhap(nguoiDung.getTenDangNhap());
        userDTO.setHoTen(nguoiDung.getHoTen());
        userDTO.setSoDienThoai(nguoiDung.getSoDienThoai());
        userDTO.setEmail(nguoiDung.getEmail());
        userDTO.setDiaChi(nguoiDung.getDiaChi());
        userDTO.setQuyenTruyCap(nguoiDung.getQuyenTruyCap());
        userDTO.setAvatar(nguoiDung.getAvatar());
        return userDTO;
    }

    // Lấy thông tin một người dùng theo ID
    public UserDTO getUserById(Integer id) {
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException("Không tìm thấy người dùng với ID: " + id, HttpStatus.NOT_FOUND));
        return convertToUserDTO(nguoiDung);
    }

    // Thêm người dùng mới
    @Transactional
    public NguoiDung createUser(CreateUserRequest request) {
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
        nguoiDung.setAvatar(request.getAvatar() != null ? request.getAvatar() : 
            "https://res.cloudinary.com/dc4bgvfbj/image/upload/v1739983784/qtgyxeho0clvujaxxg7h.jpg");

        // Hash password
        String hashedPassword = BCrypt.hashpw(request.getMatKhau(), BCrypt.gensalt());
        nguoiDung.setMatKhau(hashedPassword);

        // Save user
        return nguoiDungRepository.save(nguoiDung);
    }

    // Cập nhật thông tin người dùng
    @Transactional
    public NguoiDung updateUser(Integer id, UpdateUserRequest request) {
        // Find user
        NguoiDung nguoiDung = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new AppException("Không tìm thấy người dùng với ID: " + id, HttpStatus.NOT_FOUND));

        // Update fields if provided
        if (request.getHoTen() != null && !request.getHoTen().isBlank()) {
            nguoiDung.setHoTen(request.getHoTen());
        }
        if (request.getSoDienThoai() != null && !request.getSoDienThoai().isBlank()) {
            nguoiDung.setSoDienThoai(request.getSoDienThoai());
        }
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            nguoiDung.setEmail(request.getEmail());
        }
        if (request.getDiaChi() != null && !request.getDiaChi().isBlank()) {
            nguoiDung.setDiaChi(request.getDiaChi());
        }
        if (request.getAvatar() != null && !request.getAvatar().isBlank()) {
            nguoiDung.setAvatar(request.getAvatar());
        }
        if (request.getQuyenTruyCap() != null && !request.getQuyenTruyCap().isBlank()) {
            nguoiDung.setQuyenTruyCap(request.getQuyenTruyCap());
        }

        // Save updated user
        return nguoiDungRepository.save(nguoiDung);
    }

    // Xóa người dùng
    @Transactional
    public void deleteUser(Integer id) {
        // Check if user exists
        if (!nguoiDungRepository.existsById(id)) {
            throw new AppException("Không tìm thấy người dùng với ID: " + id, HttpStatus.NOT_FOUND);
        }

        // Delete user
        nguoiDungRepository.deleteById(id);
    }
}