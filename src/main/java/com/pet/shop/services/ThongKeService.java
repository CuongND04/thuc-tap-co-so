package com.pet.shop.services;

import com.pet.shop.dto.SanPhamBanChayDTO;
import com.pet.shop.dto.ThongKeDoanhThuDTO;
import com.pet.shop.repositories.ThongKeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThongKeService {
    private final ThongKeRepository thongKeRepository;

    @Autowired
    public ThongKeService(ThongKeRepository thongKeRepository) {
        this.thongKeRepository = thongKeRepository;
    }

    public List<ThongKeDoanhThuDTO> thongKeTheoQuy(Integer nam) {
        if (nam == null) {
            throw new RuntimeException("Năm không được để trống");
        }
        List<Object[]> results = thongKeRepository.thongKeTheoQuy(nam);
        return results.stream()
                .map(row -> {
                    ThongKeDoanhThuDTO dto = new ThongKeDoanhThuDTO();
                    dto.setNam((Integer) row[0]);
                    dto.setQuy((Integer) row[1]);
                    dto.setDoanhThu((BigDecimal) row[2]);
                    dto.setSoDonHang(((Long) row[3]).intValue());
                    dto.setSoSanPhamDaBan(((Long) row[4]).intValue());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<ThongKeDoanhThuDTO> thongKeTheoNam() {
        List<Object[]> results = thongKeRepository.thongKeTheoNam();
        return results.stream()
                .map(row -> {
                    ThongKeDoanhThuDTO dto = new ThongKeDoanhThuDTO();
                    dto.setNam((Integer) row[0]);
                    dto.setQuy((Integer) row[1]);
                    dto.setDoanhThu((BigDecimal) row[2]);
                    dto.setSoDonHang(((Long) row[3]).intValue());
                    dto.setSoSanPhamDaBan(((Long) row[4]).intValue());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public List<SanPhamBanChayDTO> thongKeSanPhamBanChay() {
        List<Object[]> results = thongKeRepository.thongKeSanPhamBanChay();
        List<SanPhamBanChayDTO> sanPhamBanChay = results.stream()
                .map(row -> {
                    SanPhamBanChayDTO dto = new SanPhamBanChayDTO();
                    dto.setMaSanPham((Long) row[0]);
                    dto.setTenSanPham((String) row[1]);
                    dto.setHinhAnh((String) row[2]);
                    dto.setDanhMuc((String) row[3]);
                    dto.setGiaBan((BigDecimal) row[4]);
                    dto.setSoLuongDaBan(((Long) row[5]).intValue());
                    dto.setTongDoanhThu((BigDecimal) row[6]);
                    return dto;
                })
                .collect(Collectors.toList());

        // Nếu có ít hơn 10 sản phẩm, trả về tất cả
        // Nếu có nhiều hơn hoặc bằng 10 sản phẩm, trả về top 10
        return sanPhamBanChay.size() <= 10 ?
                sanPhamBanChay :
                sanPhamBanChay.subList(0, 10);
    }
}