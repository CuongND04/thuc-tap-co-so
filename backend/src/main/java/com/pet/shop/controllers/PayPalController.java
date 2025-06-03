package com.pet.shop.controllers;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import com.pet.shop.dto.DonHangDetailResponseDTO;
import com.pet.shop.models.DonHang;
import com.pet.shop.models.ThanhToan;
import com.pet.shop.repositories.ThanhToanRepository;
import com.pet.shop.services.DonHangService;
import com.pet.shop.services.IPayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/paypal")
public class PayPalController {

    @Autowired
    private IPayService payService;

    private static final String SUCCESS_URL = "http://localhost:5173/payment/success";
    private static final String CANCEL_URL = "http://localhost:8080/api/payment/cancel";
    @Autowired
    private DonHangService donHangService;
    @Autowired
    private ThanhToanRepository thanhToanRepository;

    @PostMapping("/create")
    public Map<String, String> createPayment(@RequestParam("amount") Double amount,
                                             @RequestParam(value = "orderId", required = false) Long orderId) {
        Map<String, String> response = new HashMap<>();
        try {
            System.out.println("Amount : " + amount);
            Payment payment = payService.createPaymentWithPayPal(
                    amount, "USD", "paypal", "sale",
                    "Thanh toán đơn hàng", CANCEL_URL, SUCCESS_URL+ "?orderId=" + orderId
            );
            for (Links link : payment.getLinks()) {
                if ("approval_url".equalsIgnoreCase(link.getRel())) {
                    response.put("redirectUrl", link.getHref());
                    return response;
                }
            }
            response.put("error", "Không tìm thấy liên kết xác nhận thanh toán.");
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            response.put("error", "Không thể tạo thanh toán. Vui lòng thử lại sau.");
        }
        return response;
    }

    @GetMapping("/success")
    public Map<String, String> success(@RequestParam("paymentId") String paymentId,
                                       @RequestParam("PayerID") String payerId,
                                       @RequestParam(value = "orderId", required = false) Long orderId) {
        Map<String, String> result = new HashMap<>();
        try {
            Payment payment = payService.executePayment(paymentId, payerId);
            System.out.println("orderId "+orderId);
            if (orderId != null) {
                try {
                    // Cập nhật trạng thái đơn hàng
//                    DonHangDetailResponseDTO updated = donHangService.capNhatTrangThai(orderId, "Đã giao");
//                    System.out.println(updated);
                    // Tạo bản ghi thanh toán
                    DonHang donHang = donHangService.getEntityById(orderId); // bạn cần method này trả về entity DonHang
                    ThanhToan thanhToan = new ThanhToan();
                    thanhToan.setDonHang(donHang);
                    thanhToan.setPhuongThucThanhToan("PAYPAL");
                    thanhToan.setSoTien(new BigDecimal(payment.getTransactions().get(0).getAmount().getTotal()));
                    thanhToan.setThoiGianThanhToan(LocalDateTime.now());
                    thanhToan.setTrangThaiGiaoDich(payment.getState()); // usually "approved"
                    thanhToanRepository.save(thanhToan);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }

            result.put("status", "success");
            result.put("paymentId", payment.getId());
            result.put("message", "Thanh toán thành công.");
            return result;
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            result.put("status", "fail");
            result.put("message", "Lỗi xác nhận thanh toán. Vui lòng thử lại.");
            return result;
        }
    }


    @GetMapping("/cancel")
    public Map<String, String> cancel(@RequestParam(value = "orderId", required = false) Long orderId) {
        Map<String, String> cancelResult = new HashMap<>();
        cancelResult.put("status", "cancelled");
        cancelResult.put("message", "Thanh toán đã bị huỷ.");
        return cancelResult;
    }
}