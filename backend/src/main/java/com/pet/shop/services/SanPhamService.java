package com.pet.shop.services;

import com.pet.shop.dto.ChiTietSanPhamDTO;
import com.pet.shop.dto.SanPhamListDTO;
import com.pet.shop.models.DanhMuc;
import com.pet.shop.models.PhuKien;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.ThuCung;
import com.pet.shop.repositories.DanhMucRepository;
import com.pet.shop.repositories.PhuKienRepository;
import com.pet.shop.repositories.SanPhamRepository;
import com.pet.shop.repositories.ThuCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SanPhamService {

    private final SanPhamRepository sanPhamRepository;
    private final DanhMucRepository danhMucRepository;
    private final ThuCungRepository thuCungRepository;
    private final PhuKienRepository phuKienRepository;

    @Autowired
    public SanPhamService(
            SanPhamRepository sanPhamRepository,
            DanhMucRepository danhMucRepository,
            ThuCungRepository thuCungRepository,
            PhuKienRepository phuKienRepository
    ) {
        this.sanPhamRepository = sanPhamRepository;
        this.danhMucRepository = danhMucRepository;
        this.thuCungRepository = thuCungRepository;
        this.phuKienRepository = phuKienRepository;
    }

    public List<SanPhamListDTO> findAll() {
        return sanPhamRepository.findAll().stream()
                .map(this::convertToSanPhamListDTO)
                .collect(Collectors.toList());
    }

    public Optional<SanPham> findById(Long id) {
        return sanPhamRepository.findById(id);
    }

    public Optional<com.pet.shop.models.DanhMuc> findDanhMucById(Integer id) {
        return danhMucRepository.findById(id);
    }

    public SanPham save(SanPham sanPham) {
        // Kiểm tra danh mục
        if (sanPham.getDanhMuc() == null || sanPham.getDanhMuc().getMaDanhMuc() == null) {
            throw new IllegalArgumentException("Danh mục không được để trống");
        }

        // Tìm danh mục trong database
        DanhMuc danhMuc = danhMucRepository.findById(Math.toIntExact(sanPham.getDanhMuc().getMaDanhMuc()))
                .orElseThrow(() -> new IllegalArgumentException("Danh mục không tồn tại"));

        // Gán danh mục hợp lệ vào sản phẩm
        sanPham.setDanhMuc(danhMuc);
        // Validate: Sản phẩm không thể vừa là thú cưng vừa là phụ kiện
        if (sanPham.getThuCung() != null && sanPham.getPhuKien() != null) {
            throw new IllegalArgumentException("Sản phẩm không thể đồng thời là thú cưng và phụ kiện");
        }

        // Xử lý thú cưng
        if (sanPham.getThuCung() != null) {
            // Liên kết ngược và lưu thú cưng
            sanPham.getThuCung().setSanPham(sanPham);
            ThuCung savedThuCung = thuCungRepository.save(sanPham.getThuCung());
            sanPham.setThuCung(savedThuCung);
        }

        // Xử lý phụ kiện
        if (sanPham.getPhuKien() != null) {
            // Liên kết ngược và lưu phụ kiện
            sanPham.getPhuKien().setSanPham(sanPham);
            PhuKien savedPhuKien = phuKienRepository.save(sanPham.getPhuKien());
            sanPham.setPhuKien(savedPhuKien);
        }


        return sanPhamRepository.save(sanPham);
    }

    public void deleteById(Long id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Xóa thú cưng liên quan
        if (sanPham.getThuCung() != null) {
            thuCungRepository.delete(sanPham.getThuCung());
        }

        // Xóa phụ kiện liên quan
        if (sanPham.getPhuKien() != null) {
            phuKienRepository.delete(sanPham.getPhuKien());
        }

        sanPhamRepository.deleteById(id);
    }

    // Phương thức kiểm tra loại sản phẩm
    public boolean isThuCung(Long maSanPham) {
        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        return sanPham.getThuCung() != null;
    }

    public boolean isPhuKien(Long maSanPham) {
        SanPham sanPham = sanPhamRepository.findById(maSanPham)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
        return sanPham.getPhuKien() != null;
    }
    public List<SanPham> findByDanhMuc(Long maDanhMuc) {
        return sanPhamRepository.findByDanhMucMaDanhMuc(maDanhMuc);
    }

    public List<SanPham> searchByTenSanPham(String tenSanPham) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCase(tenSanPham);
    }

    public List<SanPham> searchByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByGiaBanBetween(minPrice, maxPrice);
    }

    public List<SanPham> searchByCategoryAndPrice(Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.findByDanhMucMaDanhMucAndGiaBanBetween(maDanhMuc, minPrice, maxPrice);
    }

    public List<SanPham> searchByTenAndCategory(String tenSanPham, Long maDanhMuc) {
        return sanPhamRepository.findByTenSanPhamContainingIgnoreCaseAndDanhMucMaDanhMuc(tenSanPham, maDanhMuc);
    }

    public List<SanPham> searchProducts(String tenSanPham, Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
        return sanPhamRepository.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
    }

    public Optional<ChiTietSanPhamDTO> getChiTietSanPham(Long maSanPham) {
        return sanPhamRepository.findById(maSanPham)
                .map(this::convertToChiTietSanPhamDTO);
    }

    private SanPhamListDTO convertToSanPhamListDTO(SanPham sanPham) {
        SanPhamListDTO dto = new SanPhamListDTO();
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());
        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        return dto;
    }

    public ChiTietSanPhamDTO convertToChiTietSanPhamDTO(SanPham sanPham) {
        ChiTietSanPhamDTO dto = new ChiTietSanPhamDTO();

        // Basic product information
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());

        // Category information
        dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());

        // Pet information (if exists)
        if (sanPham.getThuCung() != null) {
            dto.setGioiTinh(sanPham.getThuCung().getGioiTinh());
            dto.setTuoi(sanPham.getThuCung().getTuoi());
            dto.setTrangThaiTiem(sanPham.getThuCung().getTrangThaiTiem());
            dto.setSoLuongThuCung(sanPham.getThuCung().getSoLuongTonKho());
        }

        // Accessory information (if exists)
        if (sanPham.getPhuKien() != null) {
            dto.setSoLuongPhuKien(sanPham.getPhuKien().getSoLuongTonKho());
        }

        // Reviews
        if (sanPham.getDanhGias() != null) {
            dto.setDanhGias(sanPham.getDanhGias().stream()
                    .map(danhGia -> {
                        ChiTietSanPhamDTO.DanhGiaDTO danhGiaDTO = new ChiTietSanPhamDTO.DanhGiaDTO();
                        danhGiaDTO.setMaDanhGia(danhGia.getMaDanhGia());
                        danhGiaDTO.setNoiDung(danhGia.getNoiDung());
                        danhGiaDTO.setSoSao(danhGia.getSoSao());
                        danhGiaDTO.setTenNguoiDung(danhGia.getNguoiDung().getHoTen());
                        danhGiaDTO.setNgayDanhGia(danhGia.getNgayDanhGia().toString());
                        return danhGiaDTO;
                    })
                    .collect(Collectors.toList()));

            // Calculate average rating
            double diemTrungBinh = sanPham.getDanhGias().stream()
                    .mapToInt(danhGia -> danhGia.getSoSao())
                    .average()
                    .orElse(0.0);
            dto.setDiemTrungBinh(diemTrungBinh);
        }

        return dto;
    }
}