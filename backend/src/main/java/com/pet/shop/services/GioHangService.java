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
                    NguoiDung nguoiDung = nguoiDungRepository.findById(maKhachHang)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
                    return gioHangRepository.save(new GioHang(nguoiDung, null));
                });

        return convertToDTO(gioHang);
    }

    @Transactional
    public GioHangDTO themSanPham(Long maKhachHang, ThemGioHangDTO themGioHangDTO) {
        // Validate input
        if (themGioHangDTO.getSoLuong() <= 0) {
            throw new RuntimeException("Số lượng sản phẩm phải lớn hơn 0");
        }

        GioHang gioHang = gioHangRepository.findByNguoiDungMaNguoiDung(maKhachHang)
                .orElseGet(() -> {
                    NguoiDung nguoiDung = nguoiDungRepository.findById(maKhachHang)
                            .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));
                    return gioHangRepository.save(new GioHang(nguoiDung, null));
                });

        SanPham sanPham = sanPhamRepository.findById(themGioHangDTO.getMaSanPham())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Check stock
        if (sanPham.getThuCung() != null && sanPham.getThuCung().getSoLuongTonKho() < themGioHangDTO.getSoLuong()) {
            throw new RuntimeException("Số lượng thú cưng trong kho không đủ");
        }
        if (sanPham.getPhuKien() != null && sanPham.getPhuKien().getSoLuongTonKho() < themGioHangDTO.getSoLuong()) {
            throw new RuntimeException("Số lượng phụ kiện trong kho không đủ");
        }

        ChiTietGioHangId chiTietGioHangId = new ChiTietGioHangId();
        chiTietGioHangId.setMaGioHang(gioHang.getMaGioHang());
        chiTietGioHangId.setMaSanPham(sanPham.getMaSanPham());

        ChiTietGioHang chiTietGioHang = chiTietGioHangRepository.findById(chiTietGioHangId)
                .orElse(new ChiTietGioHang(gioHang, sanPham, 0));

        // Check if adding new quantity exceeds stock
        int newQuantity = chiTietGioHang.getSoLuong() + themGioHangDTO.getSoLuong();
        if (sanPham.getThuCung() != null && sanPham.getThuCung().getSoLuongTonKho() < newQuantity) {
            throw new RuntimeException("Số lượng thú cưng trong kho không đủ");
        }
        if (sanPham.getPhuKien() != null && sanPham.getPhuKien().getSoLuongTonKho() < newQuantity) {
            throw new RuntimeException("Số lượng phụ kiện trong kho không đủ");
        }

        chiTietGioHang.setSoLuong(newQuantity);
        chiTietGioHangRepository.save(chiTietGioHang);

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

    public GioHangDTO themSanPhamVaoGio(Long maGioHang, Long maSanPham, Integer soLuong) {
        GioHang gioHang = gioHangRepository.findById(maGioHang)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy giỏ hàng"));

        SanPham sanPham = sanPhamRepository.findById(maSanPham)
            .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Tìm hoặc tạo mới chi tiết giỏ hàng
        ChiTietGioHangId id = new ChiTietGioHangId();
        id.setMaGioHang(maGioHang);
        id.setMaSanPham(maSanPham);

        ChiTietGioHang chiTiet = chiTietGioHangRepository.findById(id)
            .orElse(new ChiTietGioHang(gioHang, sanPham, 0));

        chiTiet.setSoLuong(chiTiet.getSoLuong() + soLuong);
        chiTietGioHangRepository.save(chiTiet);

        return convertToDTO(gioHang);
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