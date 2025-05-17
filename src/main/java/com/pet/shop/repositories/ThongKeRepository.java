package com.pet.shop.repositories;

import com.pet.shop.models.DonHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThongKeRepository extends JpaRepository<DonHang, Long> {

    @Query("SELECT YEAR(dh.ngayDatHang) as nam, " +
            "QUARTER(dh.ngayDatHang) as quy, " +
            "SUM(dh.tongTien) as doanhThu, " +
            "COUNT(dh) as soDonHang, " +
            "SUM(ctdh.soLuong) as soSanPhamDaBan " +
            "FROM DonHang dh " +
            "JOIN dh.chiTietDonHangs ctdh " +
            "JOIN dh.thanhToans tt " +
            "WHERE YEAR(dh.ngayDatHang) = :nam " +
            "AND tt.trangThaiGiaoDich = 'Thành công' " +
            "GROUP BY YEAR(dh.ngayDatHang), QUARTER(dh.ngayDatHang) " +
            "ORDER BY YEAR(dh.ngayDatHang), QUARTER(dh.ngayDatHang)")
    List<Object[]> thongKeTheoQuy(@Param("nam") Integer nam);

    @Query("SELECT YEAR(dh.ngayDatHang) as nam, " +
            "0 as quy, " +
            "SUM(dh.tongTien) as doanhThu, " +
            "COUNT(dh) as soDonHang, " +
            "SUM(ctdh.soLuong) as soSanPhamDaBan " +
            "FROM DonHang dh " +
            "JOIN dh.chiTietDonHangs ctdh " +
            "JOIN dh.thanhToans tt " +
            "WHERE tt.trangThaiGiaoDich = 'Thành công' " +
            "GROUP BY YEAR(dh.ngayDatHang) " +
            "ORDER BY YEAR(dh.ngayDatHang)")
    List<Object[]> thongKeTheoNam();

    @Query("SELECT sp.maSanPham, sp.tenSanPham, sp.hinhAnh, dm.tenDanhMuc, " +
            "sp.giaBan, SUM(ctdh.soLuong) as soLuongDaBan, " +
            "SUM(ctdh.soLuong * ctdh.donGia) as tongDoanhThu " +
            "FROM DonHang dh " +
            "JOIN dh.chiTietDonHangs ctdh " +
            "JOIN ctdh.sanPham sp " +
            "JOIN sp.danhMuc dm " +
            "JOIN dh.thanhToans tt " +
            "WHERE dh.trangThaiDonHang = 'HOAN_THANH' " +
            "AND tt.trangThaiGiaoDich = 'THANH_CONG' " +
            "GROUP BY sp.maSanPham, sp.tenSanPham, sp.hinhAnh, dm.tenDanhMuc, sp.giaBan " +
            "ORDER BY soLuongDaBan DESC")
    List<Object[]> thongKeSanPhamBanChay();
}