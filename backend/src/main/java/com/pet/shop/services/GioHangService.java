package com.pet.shop.services;

import com.pet.shop.dto.GioHangDTO;
import com.pet.shop.dto.GioHangItemDTO;
import com.pet.shop.dto.ThemGioHangDTO;
import com.pet.shop.models.*;
import com.pet.shop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GioHangService {
    private final GioHangRepository gioHangRepository;
    private final ChiTietGioHangRepository chiTietGioHangRepository;
    private final SanPhamRepository sanPhamRepository;
    private final NguoiDungRepository nguoiDungRepository;

    @Autowired
    public GioHangService(GioHangRepository gioHangRepository,
                         ChiTietGioHangRepository chiTietGioHangRepository,
                         SanPhamRepository sanPhamRepository,
                         NguoiDungRepository nguoiDungRepository) {
        this.gioHangRepository = gioHangRepository;
        this.chiTietGioHangRepository = chiTietGioHangRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.nguoiDungRepository = nguoiDungRepository;
    }

    public GioHangDTO getGioHang(Long maKhachHang) {
        GioHang gioHang = gioHangRepository.findByNguoiDungMaNguoiDung(maKhachHang)
                .orElseGet(() -> {
                    NguoiDung nguoiDung = nguoiDungRepository.findById(Math.toIntExact(maKhachHang))
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
                    return gioHangRepository.save(new GioHang(nguoiDung, null));
                });

        return convertToDTO(gioHang);
    }


    @Transactional
    public GioHangDTO capNhatSoLuong(Long maKhachHang, ThemGioHangDTO capNhatGioHangDTO) {
        // Validate input
        if (capNhatGioHangDTO.getSoLuong() <= 0) {
            throw new RuntimeException("Số lượng sản phẩm phải lớn hơn 0");
        }

        GioHang gioHang = gioHangRepository.findByNguoiDungMaNguoiDung(maKhachHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        SanPham sanPham = sanPhamRepository.findById(capNhatGioHangDTO.getMaSanPham())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Check stock
        if (sanPham.getThuCung() != null && sanPham.getThuCung().getSoLuongTonKho() < capNhatGioHangDTO.getSoLuong()) {
            throw new RuntimeException("Số lượng thú cưng trong kho không đủ");
        }
        if (sanPham.getPhuKien() != null && sanPham.getPhuKien().getSoLuongTonKho() < capNhatGioHangDTO.getSoLuong()) {
            throw new RuntimeException("Số lượng phụ kiện trong kho không đủ");
        }

        ChiTietGioHangId chiTietGioHangId = new ChiTietGioHangId();
        chiTietGioHangId.setMaGioHang(gioHang.getMaGioHang());
        chiTietGioHangId.setMaSanPham(capNhatGioHangDTO.getMaSanPham());

        ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findById(chiTietGioHangId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));

        chiTietGioHang.setSoLuong(capNhatGioHangDTO.getSoLuong());
        chiTietGioHangRepository.save(chiTietGioHang);

        return convertToDTO(gioHang);
    }

    @Transactional
    public GioHangDTO xoaSanPham(Long maGioHang, Long maSanPham) {
        // Tạo khóa chính tổng hợp
        ChiTietGioHangId chiTietGioHangId = new ChiTietGioHangId();
        chiTietGioHangId.setMaGioHang(maGioHang);
        chiTietGioHangId.setMaSanPham(maSanPham);

        // Tìm chi tiết giỏ hàng
        ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findById(chiTietGioHangId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng"));



    // Xóa dòng chi tiết giỏ hàng
    chiTietGioHangRepository.delete(chiTietGioHang);
    chiTietGioHangRepository.flush();

    // Reload lại giỏ hàng (nếu cần hiển thị cập nhật)
    GioHang updatedGioHang = gioHangRepository.findById(maGioHang)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng sau khi cập nhật"));

    return convertToDTO(updatedGioHang);
}


    @Transactional
    public GioHangDTO themSanPhamVaoGioHang(Long maGioHang, Long maSanPham, Integer soLuong) {
        // Validate số lượng
        if (soLuong <= 0) {
            throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0");
        }

        // Lấy giỏ hàng
        GioHang gioHang = gioHangRepository.findById(maGioHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng với ID: " + maGioHang));

        // Lấy sản phẩm
        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + maSanPham));

        // Kiểm tra loại sản phẩm
        if (!sanPham.isThuCung() && !sanPham.isPhuKien()) {
            throw new RuntimeException("Sản phẩm không hợp lệ (không phải thú cưng hoặc phụ kiện)");
        }

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        Optional<ChiTietGioHang> existingItem = gioHang.getChiTietGioHangs().stream()
                .filter(ct -> ct.getSanPham().getMaSanPham().equals(maSanPham))
                .findFirst();

        int totalQuantity = soLuong;
        if (existingItem.isPresent()) {
            totalQuantity += existingItem.get().getSoLuong();
        }
//        System.out.println("soLuong = " + soLuong);
//
//        System.out.println("totalQuantity = " + totalQuantity);
        // Kiểm tra tồn kho
        if (sanPham.isThuCung()) {
            ThuCung thuCung = sanPham.getThuCung();
//            System.out.println("thuCung.getSoLuongTonKho  = " + thuCung.getSoLuongTonKho());

            if (thuCung.getSoLuongTonKho() < totalQuantity) {
                throw new RuntimeException("Số lượng thú cưng trong kho không đủ");
            }
        } else if (sanPham.isPhuKien()) {
            PhuKien phuKien = sanPham.getPhuKien();
            System.out.println("phuKien.getSoLuongTonKho  = " + phuKien.getSoLuongTonKho());
            if (phuKien.getSoLuongTonKho() < totalQuantity) {
                throw new RuntimeException("Số lượng phụ kiện trong kho không đủ");
            }
        }

        // Thêm mới hoặc cập nhật sản phẩm trong giỏ
        if (existingItem.isPresent()) {
            ChiTietGioHang chiTiet = existingItem.get();
            chiTiet.setSoLuong(totalQuantity);
        } else {
            ChiTietGioHang chiTiet = new ChiTietGioHang();
            ChiTietGioHangId chiTietId = new ChiTietGioHangId();
            chiTietId.setMaGioHang(gioHang.getMaGioHang());
            chiTietId.setMaSanPham(maSanPham);
            chiTiet.setId(chiTietId);

            chiTiet.setGioHang(gioHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(soLuong);
            gioHang.getChiTietGioHangs().add(chiTiet);
        }

        // Lưu lại giỏ hàng
        GioHang savedGioHang = gioHangRepository.save(gioHang);

        // Trả về DTO
        return convertToDTO(savedGioHang);
    }


    private GioHangDTO convertToDTO(GioHang gioHang) {
        GioHangDTO dto = new GioHangDTO();
        dto.setMaGioHang(gioHang.getMaGioHang());
        dto.setMaKhachHang(gioHang.getNguoiDung().getMaNguoiDung());
        dto.setTenKhachHang(gioHang.getNguoiDung().getHoTen());

        List<GioHangItemDTO> items = Optional.ofNullable(gioHang.getChiTietGioHangs())
            .orElse(Collections.emptyList())
            .stream()
                .map(chiTiet -> {
                    GioHangItemDTO itemDTO = new GioHangItemDTO();
                    itemDTO.setMaSanPham(chiTiet.getSanPham().getMaSanPham());
                    itemDTO.setTenSanPham(chiTiet.getSanPham().getTenSanPham());
                    itemDTO.setHinhAnh(chiTiet.getSanPham().getHinhAnh());
                    itemDTO.setGiaBan(chiTiet.getSanPham().getGiaBan());
                    itemDTO.setSoLuong(chiTiet.getSoLuong());
                    itemDTO.setThanhTien(chiTiet.getSanPham().getGiaBan().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));
                    return itemDTO;
                })
                .collect(Collectors.toList());

        dto.setItems(items);
        dto.setTongTien(items.stream()
                .map(GioHangItemDTO::getThanhTien)
                .reduce(BigDecimal.ZERO, BigDecimal::add));

        return dto;
    }
} 