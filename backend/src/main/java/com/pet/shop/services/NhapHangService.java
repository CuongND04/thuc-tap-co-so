package com.pet.shop.services;

import com.pet.shop.dto.NhapHangRequestDTO;
import com.pet.shop.models.CungCap;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.ThuCung;
import com.pet.shop.models.PhuKien;
import com.pet.shop.repositories.CungCapRepository;
import com.pet.shop.repositories.SanPhamRepository;
import com.pet.shop.repositories.ThuCungRepository;
import com.pet.shop.repositories.PhuKienRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class NhapHangService {

    private final CungCapRepository cungCapRepository;
    private final SanPhamRepository sanPhamRepository;
    private final ThuCungRepository thuCungRepository;
    private final PhuKienRepository phuKienRepository;

    @Autowired
    public NhapHangService(CungCapRepository cungCapRepository,
                           SanPhamRepository sanPhamRepository,
                           ThuCungRepository thuCungRepository,
                           PhuKienRepository phuKienRepository) {
        this.cungCapRepository = cungCapRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.thuCungRepository = thuCungRepository;
        this.phuKienRepository = phuKienRepository;
    }

    @Transactional
    public void nhapHang(NhapHangRequestDTO requestDTO) {
        // 1. Validate input
        if (requestDTO.getMaNhaCungCap() == null || requestDTO.getMaSanPham() == null || requestDTO.getSoLuongNhap() <= 0) {
            throw new IllegalArgumentException("Thông tin nhập hàng không hợp lệ.");
        }

        // 2. Check if the supplier supplies the product
        Optional<CungCap> cungCap = cungCapRepository.findByNhaCungCap_MaNhaCungCapAndSanPham_MaSanPham(
                requestDTO.getMaNhaCungCap(),
                requestDTO.getMaSanPham()
        );

        if (cungCap.isEmpty()) {
            throw new RuntimeException("Nhà cung cấp không cung cấp sản phẩm này."); // Or a more specific exception
        }

        // 3. Find the product (SanPham) and update inventory based on type
        SanPham sanPham = sanPhamRepository.findById(requestDTO.getMaSanPham())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm với ID: " + requestDTO.getMaSanPham()));

        int quantityReceived = requestDTO.getSoLuongNhap();

        if (sanPham.isThuCung()) {
            // Update inventory for ThuCung
            ThuCung thuCung = thuCungRepository.findBySanPham_MaSanPham(sanPham.getMaSanPham().intValue())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin thú cưng cho sản phẩm ID: " + requestDTO.getMaSanPham()));
            thuCung.setSoLuongTonKho(thuCung.getSoLuongTonKho() + quantityReceived);
            thuCungRepository.save(thuCung);

        } else if (sanPham.isPhuKien()) {
            // Update inventory for PhuKien
             PhuKien phuKien = phuKienRepository.findBySanPham_MaSanPham(sanPham.getMaSanPham().intValue())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin phụ kiện cho sản phẩm ID: " + requestDTO.getMaSanPham()));
            phuKien.setSoLuongTonKho(phuKien.getSoLuongTonKho() + quantityReceived);
            phuKienRepository.save(phuKien);

        } else {
            // Should not happen if all products are either ThuCung or PhuKien
            throw new RuntimeException("Loại sản phẩm không xác định để cập nhật tồn kho.");
        }
    }
}