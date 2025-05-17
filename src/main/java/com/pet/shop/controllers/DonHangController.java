package com.pet.shop.controllers;

import com.pet.shop.dto.DonHangDTO;
import com.pet.shop.services.DonHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
public class DonHangController {

    @Autowired
    private DonHangService donHangService;

    @GetMapping
    public ResponseEntity<List<DonHangDTO>> getAllOrders() {
        List<DonHangDTO> orders = donHangService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonHangDTO> getOrderById(@PathVariable Integer id) {
        DonHangDTO order = donHangService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<DonHangDTO>> getOrdersByStatus(@PathVariable String status) {
        List<DonHangDTO> orders = donHangService.getOrdersByStatus(status);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<DonHangDTO>> getOrdersByCustomer(@PathVariable Integer customerId) {
        List<DonHangDTO> orders = donHangService.getOrdersByCustomer(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<DonHangDTO>> getOrdersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<DonHangDTO> orders = donHangService.getOrdersByDateRange(startDate, endDate);
        return ResponseEntity.ok(orders);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<DonHangDTO> updateOrderStatus(@PathVariable Integer id, @RequestBody Map<String, String> request) {
        String status = request.get("trangThaiDonHang");
        DonHangDTO updatedOrder = donHangService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }
}
