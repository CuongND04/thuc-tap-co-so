package com.pet.shop.controllers;

import com.pet.shop.dto.NguoiDungDTO;
import com.pet.shop.services.NguoiDungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/users")
public class NguoiDungController {

    @Autowired
    private NguoiDungService nguoiDungService;

    @GetMapping
    public ResponseEntity<List<NguoiDungDTO>> getAllUsers() {
        List<NguoiDungDTO> users = nguoiDungService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NguoiDungDTO> getUserById(@PathVariable Integer id) {
        NguoiDungDTO user = nguoiDungService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<NguoiDungDTO>> getUsersByRole(@PathVariable String role) {
        List<NguoiDungDTO> users = nguoiDungService.getUsersByRole(role);
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<NguoiDungDTO> createUser(@RequestBody Map<String, Object> request) {
        NguoiDungDTO userDto = new NguoiDungDTO();
        userDto.setHoTen((String) request.get("hoTen"));
        userDto.setSoDienThoai((String) request.get("soDienThoai"));
        userDto.setEmail((String) request.get("email"));
        userDto.setDiaChi((String) request.get("diaChi"));
        userDto.setQuyenTruyCap((String) request.get("quyenTruyCap"));
        userDto.setTenDangNhap((String) request.get("tenDangNhap"));

        String password = (String) request.get("matKhau");

        NguoiDungDTO createdUser = nguoiDungService.createUser(userDto, password);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NguoiDungDTO> updateUser(@PathVariable Integer id, @RequestBody NguoiDungDTO userDto) {
        NguoiDungDTO updatedUser = nguoiDungService.updateUser(id, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        nguoiDungService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/change-password")
    public ResponseEntity<Void> changePassword(@PathVariable Integer id, @RequestBody Map<String, String> passwords) {
        String oldPassword = passwords.get("oldPassword");
        String newPassword = passwords.get("newPassword");

        nguoiDungService.changePassword(id, oldPassword, newPassword);
        return ResponseEntity.ok().build();
    }
}

