package com.pet.shop.services;

import com.pet.shop.dto.*;
import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.DonHang;
import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.ChiTietDonHangRepository;
import com.pet.shop.repositories.DonHangRepository;
import com.pet.shop.repositories.SanPhamRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import com.pet.shop.repositories.CungCapRepository;
import com.pet.shop.models.ChiTietDonHangId;
import java.util.ArrayList;

import com.pet.shop.models.PhuKien;
import com.pet.shop.models.ThuCung;

@Service
public class DonHangService {

    private final DonHangRepository donHangRepository;
    private final ChiTietDonHangRepository chiTietDonHangRepository;
    private final SanPhamRepository sanPhamRepository;
    private final NguoiDungRepository nguoiDungRepository;
    private final CungCapRepository cungCapRepository;

    @Autowired
    public DonHangService(DonHangRepository donHangRepository,
                          ChiTietDonHangRepository chiTietDonHangRepository,
                          SanPhamRepository sanPhamRepository,
                          NguoiDungRepository nguoiDungRepository,
                          CungCapRepository cungCapRepository) {
        this.donHangRepository = donHangRepository;
        this.chiTietDonHangRepository = chiTietDonHangRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.nguoiDungRepository = nguoiDungRepository;
        this.cungCapRepository = cungCapRepository;
    }

    // CRUD cơ bản
    public List<DonHangListResponseDTO> findAll() {
        return donHangRepository.findAll().stream()
                .map(this::convertToDonHangListResponseDTO)
                .collect(Collectors.toList());
    }

    public Optional<DonHang> findById(Long id) {
        return donHangRepository.findById(id);
    }

    public DonHang save(DonHang donHang) {
        return donHangRepository.save(donHang);
    }

    public void deleteById(Long id) {
        donHangRepository.deleteById(id);
    }



    // Cập nhật trạng thái đơn hàng
    @Transactional
    public DonHangDetailResponseDTO capNhatTrangThai(Long id, String trangThaiMoi) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));
        donHang.setTrangThaiDonHang(trangThaiMoi);
        DonHang updatedDonHang = donHangRepository.save(donHang);
        return convertToDonHangDetailResponseDTO(updatedDonHang);
    }

    // Hủy đơn hàng
    @Transactional
    public void huyDonHang(Long id) {
        if (!donHangRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy đơn hàng với ID: " + id);
        }
        donHangRepository.deleteById(id);
    }

    // Các phương thức truy vấn
    public List<DonHang> findByTrangThai(String trangThai) {
        return donHangRepository.findByTrangThaiDonHang(trangThai);
    }

    public List<DonHang> findByNguoiDung(Long maNguoiDung) {
        return donHangRepository.findByNguoiDung_MaNguoiDung(maNguoiDung);
    }

    public Optional<DonHangDetailResponseDTO> findDonHangDetailById(Long id) {
        return donHangRepository.findById(id)
                .map(this::convertToDonHangDetailResponseDTO);
    }
    public DonHang getEntityById(Long id) {
        return donHangRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Không tìm thấy đơn hàng với ID: " + id));
    }

    

    @Transactional
    public DonHangDetailResponseDTO taoDonHangManual(ManualTaoDonHangRequestDTO requestDTO) {
        // Validate user exists
        NguoiDung nguoiDung = nguoiDungRepository.findById(requestDTO.getMaNguoiDung().intValue())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + requestDTO.getMaNguoiDung()));

        // Create new order
        DonHang donHang = new DonHang();
        donHang.setNguoiDung(nguoiDung);
        donHang.setNgayDatHang(LocalDateTime.now());
        donHang.setTrangThaiDonHang("Đang xử lý");

        // Process order items
        List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
        BigDecimal tongTien = BigDecimal.ZERO;

        // First pass: validate all products and quantities
        for (ManualChiTietDonHangItemDTO item : requestDTO.getChiTietDonHangs()) {
            SanPham sanPham = sanPhamRepository.findById(item.getMaSanPham())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + item.getMaSanPham()));

            // Check if product is a pet or accessory
            if (!sanPham.isThuCung() && !sanPham.isPhuKien()) {
                throw new RuntimeException("Sản phẩm với ID " + item.getMaSanPham() + " không phải là thú cưng hoặc phụ kiện");
            }

            // Check inventory for accessories
            if (sanPham.isPhuKien()) {
                PhuKien phuKien = sanPham.getPhuKien();
                if (phuKien.getSoLuongTonKho() < item.getSoLuong()) {
                    throw new RuntimeException("Sản phẩm " + sanPham.getTenSanPham() + " chỉ còn " + phuKien.getSoLuongTonKho() + " sản phẩm trong kho");
                }
            }
        }

        // Second pass: create order items and update inventory
        for (ManualChiTietDonHangItemDTO item : requestDTO.getChiTietDonHangs()) {
            SanPham sanPham = sanPhamRepository.findById(item.getMaSanPham())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + item.getMaSanPham()));

            // Create order item
            ChiTietDonHang chiTiet = new ChiTietDonHang();
            chiTiet.setId(new ChiTietDonHangId(null, item.getMaSanPham()));
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(item.getSoLuong());
            chiTiet.setDonGia(sanPham.getGiaBan());

            chiTietDonHangs.add(chiTiet);
            tongTien = tongTien.add(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));

            // Update inventory for both pets and accessories
            if (sanPham.isPhuKien()) {
                PhuKien phuKien = sanPham.getPhuKien();
                int newQuantity = phuKien.getSoLuongTonKho() - item.getSoLuong();
                if (newQuantity < 0) {
                    throw new RuntimeException("Số lượng tồn kho không thể âm");
                }
                phuKien.setSoLuongTonKho(newQuantity);
            } else if (sanPham.isThuCung()) {
                ThuCung thuCung = sanPham.getThuCung();
                int newQuantity = thuCung.getSoLuongTonKho() - item.getSoLuong();
                if (newQuantity < 0) {
                    throw new RuntimeException("Số lượng tồn kho không thể âm");
                }
                thuCung.setSoLuongTonKho(newQuantity);
            }
        }

        donHang.setChiTietDonHangs(chiTietDonHangs);
        donHang.setTongTien(tongTien);

        // Save order
        DonHang savedDonHang = donHangRepository.save(donHang);

        // Return detailed response
        return convertToDonHangDetailResponseDTO(savedDonHang);
    }

    private DonHangListResponseDTO convertToDonHangListResponseDTO(DonHang donHang) {
        DonHangListResponseDTO dto = new DonHangListResponseDTO();
        dto.setMaDonHang(donHang.getMaDonHang());

        if (donHang.getNguoiDung() != null) {
            dto.setKhachHang(convertToKhachHangInfoDTO(donHang.getNguoiDung()));
        }

        dto.setNgayDatHang(donHang.getNgayDatHang());
        dto.setTongTien(donHang.getTongTien());
        dto.setTrangThaiDonHang(donHang.getTrangThaiDonHang());
        return dto;
    }

    private DonHangDetailResponseDTO convertToDonHangDetailResponseDTO(DonHang donHang) {
        DonHangDetailResponseDTO dto = new DonHangDetailResponseDTO();
        dto.setMaDonHang(donHang.getMaDonHang());

        if (donHang.getNguoiDung() != null) {
            dto.setKhachHang(convertToKhachHangInfoDTO(donHang.getNguoiDung()));
        }

        dto.setNgayDatHang(donHang.getNgayDatHang());
        dto.setTongTien(donHang.getTongTien());
        dto.setTrangThaiDonHang(donHang.getTrangThaiDonHang());

        List<ChiTietDonHangResponseDTO> itemDTOs = donHang.getChiTietDonHangs().stream()
                .map(this::convertToChiTietDonHangResponseDTO)
                .collect(Collectors.toList());
        dto.setChiTietDonHangs(itemDTOs);

        return dto;
    }

    // Phương thức mới để convert thông tin khách hàng
    private KhachHangInfoDTO convertToKhachHangInfoDTO(NguoiDung nguoiDung) {
        KhachHangInfoDTO dto = new KhachHangInfoDTO();
        dto.setMaKhachHang(nguoiDung.getMaNguoiDung());
        dto.setHoTen(nguoiDung.getHoTen());
        dto.setEmail(nguoiDung.getEmail());
        dto.setSoDienThoai(nguoiDung.getSoDienThoai());
        dto.setDiaChi(nguoiDung.getDiaChi());
        return dto;
    }

    private ChiTietDonHangResponseDTO convertToChiTietDonHangResponseDTO(ChiTietDonHang chiTiet) {
        ChiTietDonHangResponseDTO dto = new ChiTietDonHangResponseDTO();
        dto.setMaSanPham(chiTiet.getSanPham().getMaSanPham());
        dto.setTenSanPham(chiTiet.getSanPham().getTenSanPham());
        dto.setSoLuong(chiTiet.getSoLuong());
        dto.setDonGia(chiTiet.getDonGia());
        dto.setThanhTien(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));
        // Optionally set image URL or other product details if available in SanPham entity
        return dto;
    }
}