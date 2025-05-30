package com.pet.shop.services;

import com.pet.shop.dto.CungCapRequestDTO;
import com.pet.shop.dto.CungCapListDTO;
import com.pet.shop.dto.CungCapDetailDTO;
import com.pet.shop.models.*;
import com.pet.shop.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CungCapService {

    private final CungCapRepository cungCapRepository;
    private final NhaCungCapRepository nhaCungCapRepository;
    private final SanPhamRepository sanPhamRepository;
    private final ThuCungRepository thuCungRepository;
    private final PhuKienRepository phuKienRepository;

    @Autowired
    public CungCapService(CungCapRepository cungCapRepository,
                          NhaCungCapRepository nhaCungCapRepository,
                          SanPhamRepository sanPhamRepository, ThuCungRepository thuCungRepository, PhuKienRepository phuKienRepository) {
        this.cungCapRepository = cungCapRepository;
        this.nhaCungCapRepository = nhaCungCapRepository;
        this.sanPhamRepository = sanPhamRepository;
        this.thuCungRepository = thuCungRepository;
        this.phuKienRepository = phuKienRepository;
    }

    @Transactional
    public CungCapDetailDTO createCungCap(CungCapRequestDTO requestDTO) {
        NhaCungCap nhaCungCap = nhaCungCapRepository.findById(requestDTO.getMaNhaCungCap())
                .orElseThrow(() -> new RuntimeException("Nhà cung cấp không tồn tại với ID: " + requestDTO.getMaNhaCungCap()));

        SanPham sanPham = sanPhamRepository.findById(requestDTO.getMaSanPham())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + requestDTO.getMaSanPham()));

        CungCapId id = new CungCapId(requestDTO.getMaNhaCungCap(), requestDTO.getMaSanPham());



        if (cungCapRepository.existsById(id)) {
            throw new RuntimeException("Liên kết Cung cấp đã tồn tại.");
        }

        CungCap cungCap = new CungCap();
        cungCap.setId(id);
        cungCap.setNhaCungCap(nhaCungCap);
        cungCap.setSanPham(sanPham);
        cungCap.setGiaCungCap(requestDTO.getGiaCungCap());
        cungCap.setNgayCungCap(LocalDateTime.now());
        cungCap.setSoLuong(requestDTO.getSoLuong());
        cungCap.setNgayCungCap(requestDTO.getNgayCungCap());
        CungCap savedCungCap = cungCapRepository.save(cungCap);

        int quantityReceived = requestDTO.getSoLuong();

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
        return new CungCapDetailDTO(
                savedCungCap.getId().getMaNhaCungCap(),
                savedCungCap.getId().getMaSanPham(),
                savedCungCap.getGiaCungCap(),
                savedCungCap.getNhaCungCap().getTen(),
                savedCungCap.getSanPham().getTenSanPham(),
                savedCungCap.getSoLuong(),
                savedCungCap.getNgayCungCap()

        );
    }

    public List<CungCapDetailDTO> getAllCungCapWithDetails() {
        return cungCapRepository.findAll().stream()
                .map(cungCap -> new CungCapDetailDTO(
                        cungCap.getId().getMaNhaCungCap(),
                        cungCap.getId().getMaSanPham(),
                        cungCap.getGiaCungCap(),
                        cungCap.getNhaCungCap().getTen(),
                        cungCap.getSanPham().getTenSanPham(),
                        cungCap.getSoLuong(),cungCap.getNgayCungCap()
                ))
                .collect(Collectors.toList());
    }

    public Optional<CungCapDetailDTO> getCungCapById(Long maNhaCungCap, Long maSanPham) {
        CungCapId id = new CungCapId(maNhaCungCap, maSanPham);
        return cungCapRepository.findById(id)
                .map(cungCap -> new CungCapDetailDTO(
                        cungCap.getId().getMaNhaCungCap(),
                        cungCap.getId().getMaSanPham(),
                        cungCap.getGiaCungCap(),
                        cungCap.getNhaCungCap().getTen(),
                        cungCap.getSanPham().getTenSanPham(),
                        cungCap.getSoLuong(),
                        cungCap.getNgayCungCap()
                ));
    }

    @Transactional
    public CungCapDetailDTO updateCungCap(Long maNhaCungCap, Long maSanPham, CungCapRequestDTO requestDTO) {
        System.out.print("maNhaCungCap: " + maNhaCungCap);
        System.out.print("maSanPham: " + maSanPham);
        CungCapId id = new CungCapId(maNhaCungCap, maSanPham);
        System.out.print("CungCapId: " + id);
        if (maNhaCungCap == null || maSanPham == null) {
            throw new IllegalArgumentException("maNhaCungCap và maSanPham không được null");
        }
        CungCap existingCungCap = cungCapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Liên kết Cung cấp không tồn tại với ID: " + id));
        SanPham sanPham = sanPhamRepository.findById(requestDTO.getMaSanPham())
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại với ID: " + requestDTO.getMaSanPham()));
        // Only update the price if provided in the request DTO
        if (requestDTO.getGiaCungCap() != null) {
             existingCungCap.setGiaCungCap(requestDTO.getGiaCungCap());
        }
        if (requestDTO.getNgayCungCap() != null) {
            existingCungCap.setNgayCungCap(requestDTO.getNgayCungCap());
        }
        if(requestDTO.getSoLuong() != null){
            int quantityReceived = requestDTO.getSoLuong();
            System.out.println("quantityReceived: " + quantityReceived);
            if (sanPham.isThuCung()) {
                // Update inventory for ThuCung
                ThuCung thuCung = thuCungRepository.findBySanPham_MaSanPham(sanPham.getMaSanPham().intValue())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin thú cưng cho sản phẩm ID: " + requestDTO.getMaSanPham()));
                thuCung.setSoLuongTonKho(thuCung.getSoLuongTonKho() - existingCungCap.getSoLuong() + quantityReceived);
                thuCungRepository.save(thuCung);

            } else if (sanPham.isPhuKien()) {
                // Update inventory for PhuKien
                PhuKien phuKien = phuKienRepository.findBySanPham_MaSanPham(sanPham.getMaSanPham().intValue())
                        .orElseThrow(() -> new RuntimeException("Không tìm thấy thông tin phụ kiện cho sản phẩm ID: " + requestDTO.getMaSanPham()));
                phuKien.setSoLuongTonKho(phuKien.getSoLuongTonKho() - existingCungCap.getSoLuong() + quantityReceived);
                phuKienRepository.save(phuKien);

            } else {
                // Should not happen if all products are either ThuCung or PhuKien
                throw new RuntimeException("Loại sản phẩm không xác định để cập nhật tồn kho.");
            }
            // cho cái này xuống dưới để cập nhật số lượng tồn kho rồi mới update
            existingCungCap.setSoLuong(quantityReceived);

        }

        // Note: Cannot change maNhaCungCap or maSanPham via update as they are part of the composite key

        CungCap updatedCungCap = cungCapRepository.save(existingCungCap);

        return new CungCapDetailDTO(
                updatedCungCap.getId().getMaNhaCungCap(),
                updatedCungCap.getId().getMaSanPham(),
                updatedCungCap.getGiaCungCap(),
                updatedCungCap.getNhaCungCap().getTen(),
                updatedCungCap.getSanPham().getTenSanPham(),
                updatedCungCap.getSoLuong(),updatedCungCap.getNgayCungCap()
        );
    }

    @Transactional
    public void deleteCungCap(Long maNhaCungCap, Long maSanPham) {
        CungCapId id = new CungCapId(maNhaCungCap, maSanPham);
        if (!cungCapRepository.existsById(id)) {
            throw new RuntimeException("Liên kết Cung cấp không tồn tại với ID: " + id);
        }
        cungCapRepository.deleteById(id);
    }
} 