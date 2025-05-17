package com.pet.shop.controllers;

import com.pet.shop.dto.ThongKeDTO;
import com.pet.shop.services.ThongKeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ThongKeService thongKeService;

    public AdminController(ThongKeService thongKeService) {
        this.thongKeService = thongKeService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<ThongKeDTO> getDashboardStatistics(@RequestParam Integer nam) {
        List<ThongKeDoanhThuDTO> thongKeDoanhThuList = thongKeService.thongKeTheoQuy(nam);
        ThongKeDTO thongKe = new ThongKeDTO(thongKeDoanhThuList);
        return ResponseEntity.ok(thongKe);
    }
}