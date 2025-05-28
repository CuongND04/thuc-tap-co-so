package com.pet.shop.controllers;

import com.pet.shop.dto.DoanhThuDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.DoanhThuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/doanh-thu")
public class DoanhThuController {

    @Autowired
    private DoanhThuService doanhThuService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseObject> getDoanhThu(
            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime startDate,

            @RequestParam(required = false)
            @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime endDate) {

        try {
            DoanhThuDTO result = doanhThuService.getDoanhThu(startDate, endDate);
            return ResponseEntity.ok(
                    new ResponseObject("success", "Lấy doanh thu thành công", result)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                    new ResponseObject("error", "Lỗi khi lấy doanh thu: " + e.getMessage(), null)
            );
        }
    }
}