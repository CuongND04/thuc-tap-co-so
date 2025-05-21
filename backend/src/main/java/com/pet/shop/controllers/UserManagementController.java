package com.pet.shop.controllers;

import com.pet.shop.dto.*;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.UserManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
public class UserManagementController {

    @Autowired
    private UserManagementService userManagementService;

    // Lấy danh sách tất cả người dùng
    @GetMapping
    public ResponseEntity<ResponseObject> getAllUsers() {
        try {
            List<UserDTO> users = userManagementService.getAllUsers();
            return ResponseEntity.ok(new ResponseObject("success", "Lấy danh sách người dùng thành công", users));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    // Thêm người dùng mới
    @PostMapping
    public ResponseEntity<ResponseObject> createUser(@RequestBody CreateUserRequest request) {
        try {
            NguoiDung newUser = userManagementService.createUser(request);
            return ResponseEntity.ok(new ResponseObject("success", "Thêm người dùng thành công", newUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    // Cập nhật thông tin người dùng
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateUser(@PathVariable Integer id, @RequestBody UpdateUserRequest request) {
        try {
            NguoiDung updatedUser = userManagementService.updateUser(id, request);
            return ResponseEntity.ok(new ResponseObject("success", "Cập nhật thông tin người dùng thành công", updatedUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    // Xóa người dùng
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteUser(@PathVariable Integer id) {
        try {
            userManagementService.deleteUser(id);
            return ResponseEntity.ok(new ResponseObject("success", "Xóa người dùng thành công", null));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }
} 