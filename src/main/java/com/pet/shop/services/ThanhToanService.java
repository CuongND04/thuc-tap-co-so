package com.pet.shop.services;

import com.pet.shop.dto.GioHangDTO;
import com.pet.shop.dto.ThanhToanRequestDTO;
import com.pet.shop.dto.ThanhToanResponseDTO;
import com.pet.shop.models.*;
import com.pet.shop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThanhToanService {
    private final GioHangService gioHangService;
    private final DonHangRepository donHangRepository;
    private final ChiTietDonHangRepository chiTietDonHangRepository;
    private final ThanhToanRepository thanhToanRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final SanPhamRepository sanPhamRepository;

    @Autowired
    public ThanhToanService(
            GioHangService gioHangService,
            DonHangRepository donHangRepository,
            ChiTietDonHangRepository chiTietDonHangRepository,
            ThanhToanRepository thanhToanRepository,
            NguoiDungRepository nguoiDungRepository,
            SanPhamRepository sanPhamRepository) {
        this.gioHangService = gioHangService;
        this.donHangRepository = donHangRepository;
        this.chiTietDonHangRepository = chiTietDonHangRepository;
        this.thanhToanRepository = thanhToanRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.sanPhamRepository = sanPhamRepository;
    }

    @Transactional
    public ThanhToanResponseDTO thanhToan(Long maKhachHang, ThanhToanRequestDTO request) {
        // Validate request
        validateRequest(request);

        // Get cart information
        GioHangDTO gioHang = gioHangService.getGioHang(maKhachHang);
        if (gioHang.getItems().isEmpty()) {
            throw new RuntimeException("Giỏ hàng trống");
        }

        // Create order
        NguoiDung nguoiDung = nguoiDungRepository.findById(maKhachHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        final DonHang donHang = donHangRepository.save(new DonHang());
        donHang.setNguoiDung(nguoiDung);
        donHang.setNgayDatHang(LocalDateTime.now());
        donHang.setTongTien(gioHang.getTongTien());
        donHang.setTrangThaiDonHang("CHO_XAC_NHAN");

        // Create order details and update inventory
        List<ChiTietDonHang> chiTietDonHangs = gioHang.getItems().stream()
                .map(item -> {
                    SanPham sanPham = sanPhamRepository.findById(item.getMaSanPham())
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

                    // Check and update inventory
                    if (sanPham.getThuCung() != null) {
                        if (sanPham.getThuCung().getSoLuongTonKho() < item.getSoLuong()) {
                            throw new RuntimeException("Sản phẩm " + sanPham.getTenSanPham() + " không đủ số lượng trong kho");
                        }
                        sanPham.getThuCung().setSoLuongTonKho(
                                sanPham.getThuCung().getSoLuongTonKho() - item.getSoLuong()
                        );
                    } else if (sanPham.getPhuKien() != null) {
                        if (sanPham.getPhuKien().getSoLuongTonKho() < item.getSoLuong()) {
                            throw new RuntimeException("Sản phẩm " + sanPham.getTenSanPham() + " không đủ số lượng trong kho");
                        }
                        sanPham.getPhuKien().setSoLuongTonKho(
                                sanPham.getPhuKien().getSoLuongTonKho() - item.getSoLuong()
                        );
                    }
                    sanPhamRepository.save(sanPham);

                    ChiTietDonHang chiTiet = new ChiTietDonHang();
                    chiTiet.setDonHang(donHang);
                    chiTiet.setSanPham(sanPham);
                    chiTiet.setSoLuong(item.getSoLuong());
                    chiTiet.setDonGia(item.getGiaBan());
                    return chiTiet;
                })
                .collect(Collectors.toList());
        chiTietDonHangRepository.saveAll(chiTietDonHangs);

        // Create payment record
        ThanhToan thanhToan = new ThanhToan();
        thanhToan.setDonHang(donHang);
        thanhToan.setPhuongThucThanhToan(request.getPhuongThucThanhToan());
        thanhToan.setSoTien(gioHang.getTongTien());
        thanhToan.setThoiGianThanhToan(LocalDateTime.now());
        thanhToan.setTrangThaiGiaoDich("CHO_XAC_NHAN");
        thanhToan = thanhToanRepository.save(thanhToan);

        // Clear cart
        gioHang.getItems().forEach(item ->
                gioHangService.xoaSanPham(maKhachHang, item.getMaSanPham())
        );

        // Convert to response DTO
        return convertToResponseDTO(thanhToan, request);
    }

    private void validateRequest(ThanhToanRequestDTO request) {
        if (!StringUtils.hasText(request.getPhuongThucThanhToan())) {
            throw new RuntimeException("Phương thức thanh toán không được để trống");
        }
        if (!StringUtils.hasText(request.getDiaChiGiaoHang())) {
            throw new RuntimeException("Địa chỉ giao hàng không được để trống");
        }
        if (!StringUtils.hasText(request.getSoDienThoai())) {
            throw new RuntimeException("Số điện thoại không được để trống");
        }
        // Validate phone number format
        if (!request.getSoDienThoai().matches("^\\d{10}$")) {
            throw new RuntimeException("Số điện thoại không hợp lệ");
        }
    }

    private ThanhToanResponseDTO convertToResponseDTO(ThanhToan thanhToan, ThanhToanRequestDTO request) {
        ThanhToanResponseDTO dto = new ThanhToanResponseDTO();
        dto.setMaGiaoDich(thanhToan.getMaGiaoDich());
        dto.setMaDonHang(thanhToan.getDonHang().getMaDonHang());
        dto.setPhuongThucThanhToan(thanhToan.getPhuongThucThanhToan());
        dto.setSoTien(thanhToan.getSoTien());
        dto.setThoiGianThanhToan(thanhToan.getThoiGianThanhToan());
        dto.setTrangThaiGiaoDich(thanhToan.getTrangThaiGiaoDich());
        dto.setDiaChiGiaoHang(request.getDiaChiGiaoHang());
        dto.setSoDienThoai(request.getSoDienThoai());
        dto.setGhiChu(request.getGhiChu());
        return dto;
    }
}