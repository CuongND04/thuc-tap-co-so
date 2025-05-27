package com.pet.shop.services;

import com.pet.shop.dto.CungCapRequestDTO;
import com.pet.shop.dto.CungCapListDTO;
import com.pet.shop.dto.CungCapDetailDTO;
import com.pet.shop.models.CungCap;
import com.pet.shop.models.CungCapId;
import com.pet.shop.models.NhaCungCap;
import com.pet.shop.models.SanPham;
import com.pet.shop.repositories.CungCapRepository;
import com.pet.shop.repositories.NhaCungCapRepository;
import com.pet.shop.repositories.SanPhamRepository;
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

    @Autowired
    public CungCapService(CungCapRepository cungCapRepository,
                            NhaCungCapRepository nhaCungCapRepository,
                            SanPhamRepository sanPhamRepository) {
        this.cungCapRepository = cungCapRepository;
        this.nhaCungCapRepository = nhaCungCapRepository;
        this.sanPhamRepository = sanPhamRepository;
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

        CungCap savedCungCap = cungCapRepository.save(cungCap);

        return new CungCapDetailDTO(
                savedCungCap.getId().getMaNhaCungCap(),
                savedCungCap.getId().getMaSanPham(),
                savedCungCap.getGiaCungCap(),
                savedCungCap.getNhaCungCap().getTen(),
                savedCungCap.getSanPham().getTenSanPham()
        );
    }

    public List<CungCapListDTO> getAllCungCap() {
        return cungCapRepository.findAll().stream()
                .map(cungCap -> new CungCapListDTO(
                        cungCap.getId().getMaNhaCungCap(),
                        cungCap.getId().getMaSanPham(),
                        cungCap.getGiaCungCap()
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
                        cungCap.getSanPham().getTenSanPham()
                ));
    }

    @Transactional
    public CungCapDetailDTO updateCungCap(Long maNhaCungCap, Long maSanPham, CungCapRequestDTO requestDTO) {
        CungCapId id = new CungCapId(maNhaCungCap, maSanPham);

        CungCap existingCungCap = cungCapRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Liên kết Cung cấp không tồn tại với ID: " + id));

        // Only update the price if provided in the request DTO
        if (requestDTO.getGiaCungCap() != null) {
             existingCungCap.setGiaCungCap(requestDTO.getGiaCungCap());
        }
       
        // Note: Cannot change maNhaCungCap or maSanPham via update as they are part of the composite key

        CungCap updatedCungCap = cungCapRepository.save(existingCungCap);

        return new CungCapDetailDTO(
                updatedCungCap.getId().getMaNhaCungCap(),
                updatedCungCap.getId().getMaSanPham(),
                updatedCungCap.getGiaCungCap(),
                updatedCungCap.getNhaCungCap().getTen(),
                updatedCungCap.getSanPham().getTenSanPham()
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