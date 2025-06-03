package com.pet.shop.controllers;

import com.pet.shop.services.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/check/{orderId}")
    public ResponseEntity<Map<String, Object>> checkOrderPayment(@PathVariable Long orderId) {
        boolean isPaid = paymentService.isOrderPaid(orderId);
        Map<String, Object> response = new HashMap<>();
        response.put("orderId", orderId);
        response.put("isPaid", isPaid);
        if (isPaid) {
            response.put("message", "Order has been paid.");
        } else {
            response.put("message", "Order has NOT been paid.");
        }
        return ResponseEntity.ok(response);
    }
}