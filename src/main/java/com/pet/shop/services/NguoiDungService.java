package com.pet.shop.services;

import com.pet.shop.dto.NguoiDungDTO;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NguoiDungService {

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public List<NguoiDungDTO> getAllUsers() {
        return nguoiDungRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public NguoiDungDTO getUserById(Integer id) {
        return nguoiDungRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));
    }

    public List<NguoiDungDTO> getUsersByRole(String role) {
        return nguoiDungRepository.findByQuyenTruyCap(role).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public NguoiDungDTO createUser(NguoiDungDTO userDto, String password) {
        if (nguoiDungRepository.existsByTenDangNhap(userDto.getTenDangNhap())) {
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }

        if (nguoiDungRepository.existsByEmail(userDto.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        NguoiDung user = new NguoiDung();
        user.setHoTen(userDto.getHoTen());
        user.setSoDienThoai(userDto.getSoDienThoai());
        user.setEmail(userDto.getEmail());
        user.setDiaChi(userDto.getDiaChi());
        user.setQuyenTruyCap(userDto.getQuyenTruyCap());
        user.setTenDangNhap(userDto.getTenDangNhap());
        user.setMatKhau(passwordEncoder.encode(password));

        NguoiDung savedUser = nguoiDungRepository.save(user);
        return convertToDto(savedUser);
    }

    @Transactional
    public NguoiDungDTO updateUser(Integer id, NguoiDungDTO userDto) {
        NguoiDung user = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));

        user.setHoTen(userDto.getHoTen());
        user.setSoDienThoai(userDto.getSoDienThoai());
        user.setDiaChi(userDto.getDiaChi());
        user.setQuyenTruyCap(userDto.getQuyenTruyCap());

        // Chỉ cập nhật email nếu nó thay đổi và không trùng với người dùng khác
        if (!user.getEmail().equals(userDto.getEmail())) {
            if (nguoiDungRepository.existsByEmail(userDto.getEmail())) {
                throw new RuntimeException("Email đã tồn tại");
            }
            user.setEmail(userDto.getEmail());
        }

        NguoiDung updatedUser = nguoiDungRepository.save(user);
        return convertToDto(updatedUser);
    }

    @Transactional
    public void deleteUser(Integer id) {
        if (!nguoiDungRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy người dùng với ID: " + id);
        }
        nguoiDungRepository.deleteById(id);
    }

    @Transactional
    public void changePassword(Integer id, String oldPassword, String newPassword) {
        NguoiDung user = nguoiDungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + id));

        if (!passwordEncoder.matches(oldPassword, user.getMatKhau())) {
            throw new RuntimeException("Mật khẩu cũ không chính xác");
        }

        user.setMatKhau(passwordEncoder.encode(newPassword));
        nguoiDungRepository.save(user);
    }

    private NguoiDungDTO convertToDto(NguoiDung user) {
        NguoiDungDTO dto = new NguoiDungDTO();
        dto.setMaNguoiDung(user.getMaNguoiDung());
        dto.setHoTen(user.getHoTen());
        dto.setSoDienThoai(user.getSoDienThoai());
        dto.setEmail(user.getEmail());
        dto.setDiaChi(user.getDiaChi());
        dto.setQuyenTruyCap(user.getQuyenTruyCap());
        dto.setTenDangNhap(user.getTenDangNhap());
        return dto;
    }
}