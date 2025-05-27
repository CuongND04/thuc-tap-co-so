package com.pet.shop.services;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.DonHang;
import com.pet.shop.repositories.ChiTietDonHangRepository;
import com.pet.shop.repositories.DonHangRepository;
import com.pet.shop.repositories.SanPhamRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import com.pet.shop.dto.DonHangListResponseDTO;
import com.pet.shop.dto.DonHangDetailResponseDTO;
import com.pet.shop.dto.ChiTietDonHangResponseDTO;

@Service
public class DonHangService {

    private final DonHangRepository donHangRepository;
    private final ChiTietDonHangRepository chiTietDonHangRepository;
    private final SanPhamRepository sanPhamRepository;

    @Autowired
    public DonHangService(DonHangRepository donHangRepository,
                          ChiTietDonHangRepository chiTietDonHangRepository,
                          SanPhamRepository sanPhamRepository) {
        this.donHangRepository = donHangRepository;
        this.chiTietDonHangRepository = chiTietDonHangRepository;
        this.sanPhamRepository = sanPhamRepository;
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

    // Tạo đơn hàng mới
    @Transactional
    public DonHang taoDonHang(DonHang donHang) {
        // Validate chi tiết đơn hàng
        if (donHang.getChiTietDonHangs() == null || donHang.getChiTietDonHangs().isEmpty()) {
            throw new IllegalArgumentException("Đơn hàng phải có ít nhất 1 sản phẩm");
        }


        // Tính tổng tiền
        BigDecimal tongTien = donHang.getChiTietDonHangs().stream()
                .map(ct -> ct.getDonGia().multiply(BigDecimal.valueOf(ct.getSoLuong())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Set thông tin hệ thống
        donHang.setTongTien(tongTien);
        donHang.setNgayDatHang(LocalDateTime.now());
        donHang.setTrangThaiDonHang("CHO_XAC_NHAN");

        // Lưu đơn hàng và chi tiết
        DonHang savedDonHang = donHangRepository.save(donHang);
        chiTietDonHangRepository.saveAll(donHang.getChiTietDonHangs());

        return savedDonHang;
    }

    // Cập nhật trạng thái đơn hàng
    @Transactional
    public DonHang capNhatTrangThai(Long id, String trangThaiMoi) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));

        // Validate trạng thái
        if ("DA_HUY".equals(donHang.getTrangThaiDonHang()) && !"HUY".equals(trangThaiMoi)) {
            throw new IllegalStateException("Đơn hàng đã hủy không thể cập nhật trạng thái");
        }

        donHang.setTrangThaiDonHang(trangThaiMoi);
        return donHangRepository.save(donHang);
    }

    // Hủy đơn hàng
    @Transactional
    public void huyDonHang(Long id) {
        DonHang donHang = donHangRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));

        if (!"DA_HUY".equals(donHang.getTrangThaiDonHang())) {
            donHang.setTrangThaiDonHang("DA_HUY");
            donHangRepository.save(donHang);

            // Hoàn trả số lượng tồn kho (thêm logic nếu cần)
        }
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

    private DonHangListResponseDTO convertToDonHangListResponseDTO(DonHang donHang) {
        DonHangListResponseDTO dto = new DonHangListResponseDTO();
        dto.setMaDonHang(donHang.getMaDonHang());
        // Assuming ma_khach_hang corresponds to the user ID in DonHang
        if (donHang.getNguoiDung() != null) {
            dto.setMaKhachHang(donHang.getNguoiDung().getMaNguoiDung());
        } else {
            dto.setMaKhachHang(null); // Or handle as appropriate
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
            dto.setMaKhachHang(donHang.getNguoiDung().getMaNguoiDung());
            dto.setTenKhachHang(donHang.getNguoiDung().getHoTen());
        } else {
            dto.setMaKhachHang(null);
            dto.setTenKhachHang("N/A"); // Or handle as appropriate
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