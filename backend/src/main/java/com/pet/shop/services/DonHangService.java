package com.pet.shop.services;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.DonHang;
import com.pet.shop.models.SanPham;
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
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.NguoiDungRepository;
import com.pet.shop.models.NhaCungCap;
import com.pet.shop.repositories.NhaCungCapRepository;
import com.pet.shop.repositories.CungCapRepository;
import com.pet.shop.models.CungCap;
import com.pet.shop.models.CungCapId;
import com.pet.shop.models.ChiTietDonHangId;
import com.pet.shop.dto.TaoDonHangRequestDTO;
import com.pet.shop.dto.ChiTietDonHangRequestItemDTO;
import java.util.ArrayList;
import com.pet.shop.dto.ManualTaoDonHangRequestDTO;
import com.pet.shop.dto.ManualChiTietDonHangItemDTO;
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

    @Transactional
    public DonHangDetailResponseDTO taoDonHangTuNhaCungCap(TaoDonHangRequestDTO requestDTO) {
        // Validate user exists
        NguoiDung nguoiDung = nguoiDungRepository.findById(requestDTO.getMaNguoiDung().intValue())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + requestDTO.getMaNguoiDung()));

        // Validate supplier exists - Note: Supplier is now handled by checking CungCap linkage per product item
        // No need to set NhaCungCap directly on DonHang in this version.

        // Create new order
        DonHang donHang = new DonHang();
        donHang.setNguoiDung(nguoiDung);
        donHang.setNgayDatHang(LocalDateTime.now());
        donHang.setTrangThaiDonHang("Đang xử lý"); // Use the correct setter

        // Process order items
        List<ChiTietDonHang> chiTietDonHangs = new ArrayList<>();
        BigDecimal tongTien = BigDecimal.ZERO;

        for (ChiTietDonHangRequestItemDTO item : requestDTO.getChiTietDonHangs()) {
            // Validate product exists
            SanPham sanPham = sanPhamRepository.findById(item.getMaSanPham())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + item.getMaSanPham()));

            // Get supplier price
            CungCapId cungCapId = new CungCapId(requestDTO.getMaNhaCungCap(), item.getMaSanPham());
            CungCap cungCap = cungCapRepository.findById(cungCapId)
                    .orElseThrow(() -> new RuntimeException("Nhà cung cấp không cung cấp sản phẩm với ID: " + item.getMaSanPham()));

            // Create order item
            ChiTietDonHang chiTiet = new ChiTietDonHang();
            // Note: maDonHang will be set by JPA when saving DonHang with cascade
            chiTiet.setId(new ChiTietDonHangId(null, item.getMaSanPham())); // Initialize with maSanPham
            chiTiet.setDonHang(donHang);
            chiTiet.setSanPham(sanPham);
            chiTiet.setSoLuong(item.getSoLuong());
            chiTiet.setDonGia(cungCap.getGiaCungCap());

            chiTietDonHangs.add(chiTiet);
            tongTien = tongTien.add(chiTiet.getDonGia().multiply(BigDecimal.valueOf(chiTiet.getSoLuong())));
        }

        donHang.setChiTietDonHangs(chiTietDonHangs);
        donHang.setTongTien(tongTien);

        // Save order
        DonHang savedDonHang = donHangRepository.save(donHang);

        // Return detailed response
        return convertToDonHangDetailResponseDTO(savedDonHang);
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
                phuKien.setSoLuongTonKho(phuKien.getSoLuongTonKho() - item.getSoLuong());
            } else if (sanPham.isThuCung()) {
                ThuCung thuCung = sanPham.getThuCung();
                thuCung.setSoLuongTonKho(thuCung.getSoLuongTonKho() - item.getSoLuong());
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