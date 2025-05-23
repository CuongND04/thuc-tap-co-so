package com.pet.shop.services;

import com.pet.shop.models.ChiTietDonHang;
import com.pet.shop.models.DonHang;
import com.pet.shop.models.NguoiDung;
import com.pet.shop.repositories.ChiTietDonHangRepository;
import com.pet.shop.repositories.DonHangRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DonHangService {

    private final DonHangRepository donHangRepository;
    private final ChiTietDonHangRepository chiTietDonHangRepository;

    @Autowired
    public DonHangService(DonHangRepository donHangRepository,
                          ChiTietDonHangRepository chiTietDonHangRepository) {
        this.donHangRepository = donHangRepository;
        this.chiTietDonHangRepository = chiTietDonHangRepository;
    }

    // CRUD cơ bản
    public List<DonHang> findAll() {
        return donHangRepository.findAll();
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
}