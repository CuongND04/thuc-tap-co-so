package com.pet.shop.services;

import com.pet.shop.dto.SanPhamDTO;
import com.pet.shop.models.SanPham;
import com.pet.shop.models.ThuCung;
import com.pet.shop.repositories.DanhMucRepository;
import com.pet.shop.repositories.SanPhamRepository;
import com.pet.shop.repositories.ThuCungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ThuCungService {

    @Autowired
    private ThuCungRepository thuCungRepository;

    @Autowired
    private SanPhamRepository sanPhamRepository;

    @Autowired
    private DanhMucRepository danhMucRepository;

    /**
     * Lấy tất cả thú cưng
     */
    public List<SanPhamDTO> getAllPets() {
        List<ThuCung> thuCungList = thuCungRepository.findAll();
        return thuCungList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thú cưng theo ID
     */
    public SanPhamDTO getPetById(Integer id) {
        ThuCung thuCung = thuCungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thú cưng với ID: " + id));
        return convertToDto(thuCung);
    }

    /**
     * Lấy thú cưng theo danh mục
     */
    public List<SanPhamDTO> getPetsByCategory(Integer categoryId) {
        List<ThuCung> thuCungList = thuCungRepository.findBySanPham_DanhMuc_MaDanhMuc(categoryId);
        return thuCungList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thú cưng theo giống
     */
    public List<SanPhamDTO> getPetsByBreed(String breed) {
        List<ThuCung> thuCungList = thuCungRepository.findByGiongContaining(breed);
        return thuCungList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Lấy thú cưng theo giới tính
     */
    public List<SanPhamDTO> getPetsByGender(String gender) {
        List<ThuCung> thuCungList = thuCungRepository.findByGioiTinh(gender);
        return thuCungList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Tìm kiếm thú cưng theo từ khóa
     */
    public List<SanPhamDTO> searchPets(String keyword) {
        List<ThuCung> thuCungList = thuCungRepository.searchByKeyword(keyword);
        return thuCungList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Chuyển đổi entity thành DTO
     */
    private SanPhamDTO convertToDto(ThuCung thuCung) {
        SanPhamDTO dto = new SanPhamDTO();
        SanPham sanPham = thuCung.getSanPham();

        dto.setMaSanPham((long) Math.toIntExact(sanPham.getMaSanPham()));
        dto.setTenSanPham(sanPham.getTenSanPham());
        dto.setMaDanhMuc(Math.toIntExact(sanPham.getDanhMuc().getMaDanhMuc()));
        dto.setTenDanhMuc(sanPham.getDanhMuc().getTenDanhMuc());
        dto.setHinhAnh(sanPham.getHinhAnh());
        dto.setMoTa(sanPham.getMoTa());
        dto.setGiaBan(sanPham.getGiaBan());

        dto.setLoaiSanPham("ThuCung");
        dto.setMaThuCung(Math.toIntExact(thuCung.getMaThuCung()));
        dto.setSoLuongTonKho(thuCung.getSoLuongTonKho());
        dto.setGiong(thuCung.getGiong());
        dto.setGioiTinh(thuCung.getGioiTinh());
        dto.setTuoi(thuCung.getTuoi());
        dto.setTrangThaiTiem(thuCung.getTrangThaiTiem());

        return dto;
    }
}
