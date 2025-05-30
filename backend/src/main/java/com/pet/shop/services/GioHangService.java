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
    public GioHangDTO xoaSanPham(Long maKhachHang, Long maSanPham) {
        GioHang gioHang = gioHangRepository.findByNguoiDungMaNguoiDung(maKhachHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        ChiTietGioHangId chiTietGioHangId = new ChiTietGioHangId();
        chiTietGioHangId.setMaGioHang(gioHang.getMaGioHang());
        chiTietGioHangId.setMaSanPham(maSanPham);

        if (!chiTietGioHangRepository.existsById(chiTietGioHangId)) {
            throw new RuntimeException("Không tìm thấy sản phẩm trong giỏ hàng");
        }

        chiTietGioHangRepository.deleteById(chiTietGioHangId);

        return convertToDTO(gioHang);
    }

    @Transactional
    public GioHangDTO themSanPhamVaoGioHang(Long maGioHang, Long maSanPham, Integer soLuong) {
        // Validate quantity
        if (soLuong <= 0) {
             throw new IllegalArgumentException("Số lượng sản phẩm phải lớn hơn 0");
        }

        // Get cart by ID
        GioHang gioHang = gioHangRepository.findById(maGioHang)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng với ID: " + maGioHang));

        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + maSanPham));

        // Check if product is a pet or accessory
        if (!sanPham.isThuCung() && !sanPham.isPhuKien()) {
            throw new RuntimeException("Sản phẩm với ID " + maSanPham + " không phải là thú cưng hoặc phụ kiện");
        }

        // Check if product already exists in cart
        Optional<ChiTietGioHang> existingItem = gioHang.getChiTietGioHangs().stream()
                .filter(ct -> ct.getSanPham().getMaSanPham().equals(maSanPham))
                .findFirst();

        int totalQuantity = soLuong;
        if (existingItem.isPresent()) {
            totalQuantity += existingItem.get().getSoLuong();
        }

        // Check inventory for both pets and accessories
        if (sanPham.isThuCung()) {
            ThuCung thuCung = sanPham.getThuCung();
            if (thuCung.getSoLuongTonKho() < soLuong) {
                throw new RuntimeException("Số lượng thú cưng trong kho không đủ");
            }
        } else if (sanPham.isPhuKien()) {
            PhuKien phuKien = sanPham.getPhuKien();
            if (phuKien.getSoLuongTonKho() < soLuong) {
                throw new RuntimeException("Số lượng phụ kiện trong kho không đủ");
            }
        }

        if (existingItem.isPresent()) {
            // Update quantity if product exists
            ChiTietGioHang chiTiet = existingItem.get();
            chiTiet.setSoLuong(totalQuantity);
        } else {
            // Add new item if product doesn't exist
            ChiTietGioHang chiTiet = new ChiTietGioHang();
            // Correctly set the composite key
            ChiTietGioHangId chiTietId = new ChiTietGioHangId();
            chiTietId.setMaGioHang(gioHang.getMaGioHang());
            chiTietId.setMaSanPham(maSanPham);
            chiTiet.setId(chiTietId);

            chiTiet.setGioHang(gioHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(soLuong);
            gioHang.getChiTietGioHangs().add(chiTiet);
        }

        if (sanPham.isThuCung()) {
            ThuCung thuCung = sanPham.getThuCung();
            thuCung.setSoLuongTonKho(thuCung.getSoLuongTonKho() - soLuong);
        } else if (sanPham.isPhuKien()) {
            PhuKien phuKien = sanPham.getPhuKien();
            phuKien.setSoLuongTonKho(phuKien.getSoLuongTonKho() - soLuong);
        }

        GioHang savedGioHang = gioHangRepository.save(gioHang);

        // Return cart details
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