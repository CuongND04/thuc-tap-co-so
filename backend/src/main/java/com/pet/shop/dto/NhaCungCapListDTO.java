package com.pet.shop.dto;

public class NhaCungCapListDTO {
    private Long maNhaCungCap;
    private String ten;
    private String diaChi;
    private String soDienThoai;
    private String email;

    // Constructors
    public NhaCungCapListDTO() {
    }

    public NhaCungCapListDTO(Long maNhaCungCap, String ten, String diaChi, String soDienThoai, String email) {
        this.maNhaCungCap = maNhaCungCap;
        this.ten = ten;
        this.diaChi = diaChi;
        this.soDienThoai = soDienThoai;
        this.email = email;
    }

    // Getters
    public Long getMaNhaCungCap() {
        return maNhaCungCap;
    }

    public String getTen() {
        return ten;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public String getSoDienThoai() {
        return soDienThoai;
    }

    public String getEmail() {
        return email;
    }

    // Setters
    public void setMaNhaCungCap(Long maNhaCungCap) {
        this.maNhaCungCap = maNhaCungCap;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public void setSoDienThoai(String soDienThoai) {
        this.soDienThoai = soDienThoai;
    }

    public void setEmail(String email) {
        this.email = email;
    }
} 