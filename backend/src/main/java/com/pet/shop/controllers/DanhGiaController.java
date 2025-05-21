package com.pet.shop.controllers;

import com.pet.shop.dto.SimpleReviewDTO;
import com.pet.shop.models.ResponseObject;
import com.pet.shop.services.DanhGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class DanhGiaController {

    private final DanhGiaService danhGiaService;

    @Autowired
    public DanhGiaController(DanhGiaService danhGiaService) {
        this.danhGiaService = danhGiaService;
    }

    // Lấy tất cả đánh giá
    @GetMapping
    public ResponseEntity<ResponseObject> getAllReviews() {
        try {
            List<SimpleReviewDTO> reviews = danhGiaService.getAllReviews();
            return ResponseEntity.ok(new ResponseObject("success", "Lấy tất cả đánh giá thành công", reviews));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("error", e.getMessage(), null));
        }
    }

    
} 