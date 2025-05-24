package com.pet.shop.services;

import com.pet.shop.dto.ChiTietSanPhamDTO;
import com.pet.shop.dto.SanPhamListDTO;
import com.pet.shop.models.PhuKien;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.ThuCung;
import com.pet.shop.repositories.DanhMucRepository;
import com.pet.shop.repositories.PhuKienRepository;
import com.pet.shop.repositories.SanPhamRepository;
import com.pet.shop.repositories.ThuCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public SanPham save(SanPham sanPham) {
        // Kiểm tra danh mục
        if (sanPham.getDanhMuc() == null || sanPham.getDanhMuc().getMaDanhMuc() == null) {
            throw new IllegalArgumentException("Danh mục không được để trống");
        }

        // Tìm danh mục trong database
        Optional<com.pet.shop.models.DanhMuc> danhMucOptional = danhMucRepository.findById(Math.toIntExact(sanPham.getDanhMuc().getMaDanhMuc()));
        if (!danhMucOptional.isPresent()) {
             throw new IllegalArgumentException("Danh mục không tồn tại");
        }
        sanPham.setDanhMuc(danhMucOptional.get());

        // Validate: Sản phẩm không thể vừa là thú cưng vừa là phụ kiện
        if (sanPham.getThuCung() != null && sanPham.getPhuKien() != null) {
            throw new IllegalArgumentException("Sản phẩm không thể đồng thời là thú cưng và phụ kiện");
        }

        // Save SanPham first to generate ID
        SanPham savedSanPham = sanPhamRepository.save(sanPham);

        // Handle ThuCung relationship and save ThuCung after SanPham is saved
        if (savedSanPham.getThuCung() != null) {
            ThuCung thuCung = savedSanPham.getThuCung();
            thuCung.setSanPham(savedSanPham); // Ensure bidirectional link is set with the saved SanPham
            thuCungRepository.save(thuCung);
        }

        // Handle PhuKien relationship and save PhuKien after SanPham is saved
        if (savedSanPham.getPhuKien() != null) {
            PhuKien phuKien = savedSanPham.getPhuKien();
            phuKien.setSanPham(savedSanPham); // Ensure bidirectional link is set with the saved SanPham
            phuKienRepository.save(phuKien);
        }

        return savedSanPham;
    }

    @Transactional
    public void deleteById(Long id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Deletion should cascade due to CascadeType.ALL, no need for explicit deletion here.
        // If needed, explicitly delete ThuCung/PhuKien before SanPham to avoid foreign key constraints issues,
        // but CascadeType.ALL with correct mapping should handle this.
        // Example (if not relying solely on cascade): 
        // if (sanPham.getThuCung() != null) { thuCungRepository.delete(sanPham.getThuCung()); }
        // if (sanPham.getPhuKien() != null) { phuKienRepository.delete(sanPham.getPhuKien()); }

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


    // check blank category - This method seems misplaced, potentially should be in DanhMucService or removed
    // Keeping it for now but noting potential issue.
    public long countByDanhMuc_MaDanhMuc(Integer maDanhMuc) {
        return sanPhamRepository.countByDanhMuc_MaDanhMuc(maDanhMuc);
    }

    // Search by name, category and price range
    // This method calls a custom repository query, ensure it exists and is correct
    public List<SanPham> searchProducts(String tenSanPham, Long maDanhMuc, BigDecimal minPrice, BigDecimal maxPrice) {
         return sanPhamRepository.searchProducts(tenSanPham, maDanhMuc, minPrice, maxPrice);
    }

    // Conversion method (assuming SanPhamListDTO exists and has necessary fields and setters)
    private SanPhamListDTO convertToSanPhamListDTO(SanPham sanPham) {
        SanPhamListDTO dto = new SanPhamListDTO();
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());
        if (sanPham.getDanhMuc() != null) {
            dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
            dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        }
        // Note: SanPhamListDTO doesn't include ThuCung/PhuKien details based on its definition.
        // If these are needed in list views, SanPhamListDTO needs to be updated or a different DTO used.
        return dto;
    }

    public Optional<ThuCung> findThuCungById(Long id) {
        // Assuming ThuCungRepository has findById method that accepts Long or Integer based on ThuCung entity ID type
        // Based on previous searches, ThuCung ID is Long, but repo uses Integer. Let's use Long for consistency with SanPham
        // If ThuCung ID is truly Integer, this method needs adjustment or a custom query.
        // Will use findBySanPham_MaSanPham as a workaround based on search results if direct findById(Long) is not available
        // Checking ThuCungRepository search result: uses Integer for ID. Need to convert.
         return thuCungRepository.findBySanPham_MaSanPham(Math.toIntExact(id));
    }

    public Optional<PhuKien> findPhuKienById(Long id) {
         // Checking PhuKienRepository search result: uses Integer for ID. Need to convert.
        return phuKienRepository.findBySanPham_MaSanPham(Math.toIntExact(id));
    }


    public Optional<ChiTietSanPhamDTO> getChiTietSanPham(Long id) {
        Optional<SanPham> sanPhamOptional = sanPhamRepository.findById(id);
        if (!sanPhamOptional.isPresent()) {
            return Optional.empty();
        }

        SanPham sanPham = sanPhamOptional.get();
        ChiTietSanPhamDTO dto = new ChiTietSanPhamDTO();
        dto.setMaSanPham(sanPham.getMaSanPham());
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());

        if (sanPham.getDanhMuc() != null) {
            dto.setMaDanhMuc(sanPham.getDanhMuc().getMaDanhMuc());
            dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        }

        // Load ThuCung details if it's a pet product
        if (sanPham.getThuCung() != null) {
            ThuCung thuCung = sanPham.getThuCung(); // Assuming lazy loading is handled or already fetched
            dto.setLoaiSanPham("ThuCung");
            dto.setMaLoaiSanPham(thuCung.getMaThuCung()); // Assuming MaThuCung is the ID field
            dto.setSoLuongTonKho(thuCung.getSoLuongTonKho());
            dto.setGioiTinh(thuCung.getGioiTinh());
            dto.setTuoi(thuCung.getTuoi());
            dto.setTrangThaiTiem(thuCung.getTrangThaiTiem());
        }
        // Load PhuKien details if it's an accessory product
        else if (sanPham.getPhuKien() != null) {
            PhuKien phuKien = sanPham.getPhuKien(); // Assuming lazy loading is handled or already fetched
             dto.setLoaiSanPham("PhuKien");
            dto.setMaLoaiSanPham(phuKien.getMaPhuKien()); // Assuming MaPhuKien is the ID field
            dto.setSoLuongTonKho(phuKien.getSoLuongTonKho());
        }

        // Assuming reviews are eagerly fetched or handled by another mechanism if needed for detail view
        // If reviews are needed here and are not eagerly fetched, they would need to be loaded explicitly.
        // For now, keeping the previous logic which assumed presence of danhGias list on SanPham.
         if (sanPham.getDanhGias() != null) {
             dto.setDanhGias(sanPham.getDanhGias().stream()
                     .map(danhGia -> {
                         ChiTietSanPhamDTO.DanhGiaDTO danhGiaDTO = new ChiTietSanPhamDTO.DanhGiaDTO();
                         danhGiaDTO.setMaDanhGia(danhGia.getMaDanhGia());
                         danhGiaDTO.setNoiDung(danhGia.getNoiDung());
                         danhGiaDTO.setSoSao(danhGia.getSoSao());
                         // Need to check if NguoiDung is null or handle potential lazy loading issues
                         if(danhGia.getNguoiDung() != null) {
                              danhGiaDTO.setTenNguoiDung(danhGia.getNguoiDung().getHoTen());
                         } else {
                              danhGiaDTO.setTenNguoiDung("Unknown User"); // Or handle as appropriate
                         }

                         // Assuming NgayDanhGia is LocalDateTime, convert to String
                         if(danhGia.getNgayDanhGia() != null) {
                              danhGiaDTO.setNgayDanhGia(danhGia.getNgayDanhGia().toString());
                         }

                         return danhGiaDTO;
                     })
                     .collect(Collectors.toList()));

             // Calculate average rating
             double diemTrungBinh = sanPham.getDanhGias().stream()
                     .mapToInt(danhGia -> danhGia.getSoSao() != null ? danhGia.getSoSao() : 0)
                     .average()
                     .orElse(0.0);
             dto.setDiemTrungBinh(diemTrungBinh);
         }

        return Optional.of(dto);
    }

    @Transactional
    public SanPham updateSanPham(Long id, SanPham updatedSanPham) {
        Optional<SanPham> existingProductOptional = sanPhamRepository.findById(id);

        if (!existingProductOptional.isPresent()) {
            throw new RuntimeException("Không tìm thấy sản phẩm với id = " + id);
        }

        SanPham existingProduct = existingProductOptional.get();

        // Update basic product information
        if (updatedSanPham.getTenSanPham() != null) {
            existingProduct.setTenSanPham(updatedSanPham.getTenSanPham());
        }
        if (updatedSanPham.getHinhAnh() != null) {
            existingProduct.setHinhAnh(updatedSanPham.getHinhAnh());
        }
        if (updatedSanPham.getMoTa() != null) {
            existingProduct.setMoTa(updatedSanPham.getMoTa());
        }
        if (updatedSanPham.getGiaBan() != null) {
            existingProduct.setGiaBan(updatedSanPham.getGiaBan());
        }

        // Update danh muc if provided
        if (updatedSanPham.getDanhMuc() != null && updatedSanPham.getDanhMuc().getMaDanhMuc() != null) {
             Optional<com.pet.shop.models.DanhMuc> danhMucOptional = danhMucRepository.findById(Math.toIntExact(updatedSanPham.getDanhMuc().getMaDanhMuc()));
             if (danhMucOptional.isPresent()) {
                 existingProduct.setDanhMuc(danhMucOptional.get());
             } else {
                 throw new IllegalArgumentException("Mã danh mục không tồn tại");
             }
         } else if (updatedSanPham.getDanhMuc() != null && updatedSanPham.getDanhMuc().getMaDanhMuc() == null) {
             // If danhMuc is provided but maDanhMuc is null, set danh muc to null
             existingProduct.setDanhMuc(null);
         }

        // Handle ThuCung update (assuming product type doesn't change via update)
        if (existingProduct.getThuCung() != null && updatedSanPham.getThuCung() != null) {
            ThuCung existingThuCung = existingProduct.getThuCung();
            if (updatedSanPham.getThuCung().getGioiTinh() != null) {
                existingThuCung.setGioiTinh(updatedSanPham.getThuCung().getGioiTinh());
            }
            if (updatedSanPham.getThuCung().getTuoi() != null) {
                existingThuCung.setTuoi(updatedSanPham.getThuCung().getTuoi());
            }
            if (updatedSanPham.getThuCung().getTrangThaiTiem() != null) {
                existingThuCung.setTrangThaiTiem(updatedSanPham.getThuCung().getTrangThaiTiem());
            }
            if (updatedSanPham.getThuCung().getSoLuongTonKho() != null) {
                existingThuCung.setSoLuongTonKho(updatedSanPham.getThuCung().getSoLuongTonKho());
            }
            // No need to explicitly save existingThuCung due to cascade
        }

        // Handle PhuKien update (assuming product type doesn't change via update)
        if (existingProduct.getPhuKien() != null && updatedSanPham.getPhuKien() != null) {
            PhuKien existingPhuKien = existingProduct.getPhuKien();
             if (updatedSanPham.getPhuKien().getSoLuongTonKho() != null) {
                existingPhuKien.setSoLuongTonKho(updatedSanPham.getPhuKien().getSoLuongTonKho());
            }
            // No need to explicitly save existingPhuKien due to cascade
        }

        // Save the updated product (cascades to ThuCung/PhuKien)
        return sanPhamRepository.save(existingProduct);
    }
}