package com.pet.shop.services;

import com.pet.shop.dto.ChiTietDonHangDTO;
import com.pet.shop.dto.DonHangDTO;
import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.DonHang;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.ChiTietDonHangRepository;
import com.pet.shop.repositories.DonHangRepository;
import com.pet.shop.repositories.NguoiDungRepository;
import com.pet.shop.repositories.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DonHangService {

    @Autowired
    private DonHangRepository donHangRepository;

    @Autowired
    private ChiTietDonHangRepository chiTietDonHangRepository;

    @Autowired
    private NguoiDungRepository nguoiDungRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    public List<DonHangDTO> getAllOrders() {
        return donHangRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DonHangDTO getOrderById(Integer id) {
        return donHangRepository.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));
    }

    public List<DonHangDTO> getOrdersByStatus(String status) {
        return donHangRepository.findByTrangThaiDonHang(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<DonHangDTO> getOrdersByCustomer(Integer customerId) {
        return donHangRepository.findByKhachHang_MaNguoiDung(customerId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<DonHangDTO> getOrdersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return donHangRepository.findByNgayDatHangBetween(startDate, endDate).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public DonHangDTO updateOrderStatus(Integer id, String status) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));

        donHang.setTrangThaiDonHang(status);
        DonHang updatedDonHang = donHangRepository.save(donHang);
        return convertToDto(updatedDonHang);
    }

    private DonHangDTO convertToDto(DonHang donHang) {
        DonHangDTO dto = new DonHangDTO();
        dto.setMaDonHang(donHang.getMaDonHang());
        dto.setMaKhachHang(donHang.getKhachHang().getMaNguoiDung());
        dto.setTenKhachHang(donHang.getKhachHang().getHoTen());
        dto.setNgayDatHang(donHang.getNgayDatHang());
        dto.setTongTien(donHang.getTongTien());
        dto.setTrangThaiDonHang(donHang.getTrangThaiDonHang());

        // Lấy chi tiết đơn hàng
        List<ChiTietDonHang> chiTietList = chiTietDonHangRepository.findByDonHang_MaDonHang(donHang.getMaDonHang());
        List<ChiTietDonHangDTO> chiTietDtoList = new ArrayList<>();

        for (ChiTietDonHang chiTiet : chiTietList) {
            ChiTietDonHangDTO chiTietDto = new ChiTietDonHangDTO();
            chiTietDto.setMaSanPham(chiTiet.getSanPham().getMaSanPham());
            chiTietDto.setTenSanPham(chiTiet.getSanPham().getTenSanPham());
            chiTietDto.setSoLuong(chiTiet.getSoLuong());
            chiTietDto.setDonGia(chiTiet.getDonGia());
            chiTietDto.setThanhTien(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));
            chiTietDtoList.add(chiTietDto);
        }

        dto.setChiTietDonHang(chiTietDtoList);
        return dto;
    }
}
