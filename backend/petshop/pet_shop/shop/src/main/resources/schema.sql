IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'retail_management_db')
BEGIN
    CREATE DATABASE retail_management_db;
END
GO

USE retail_management_db;
GO


IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nguoi_dung]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[nguoi_dung] (
        [ma_nguoi_dung] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ho_ten] NVARCHAR(100) NOT NULL,
        [so_dien_thoai] NVARCHAR(20) NULL,
        [email] NVARCHAR(100) NULL,
        [dia_chi] NVARCHAR(200) NULL,
        [quyen_truy_cap] NVARCHAR(50) NULL,
        [mat_khau] NVARCHAR(100) NULL,
        [ten_dang_nhap] DATETIME2 NULL
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[danh_muc]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[danh_muc] (
        [ma_danh_muc] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ten_danh_muc] NVARCHAR(100) NOT NULL,
        [mo_ta] NVARCHAR(MAX) NULL,
        [kieu] NVARCHAR(50) NULL
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[san_pham]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[san_pham] (
        [ma_san_pham] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ten_san_pham] NVARCHAR(200) NOT NULL,
        [ma_danh_muc] BIGINT NOT NULL,
        [hinh_anh] NVARCHAR(MAX) NULL,
        [mo_ta] NVARCHAR(MAX) NULL,
        [gia_ban] DECIMAL(18,2) NOT NULL,
        CONSTRAINT [FK_san_pham_danh_muc] FOREIGN KEY ([ma_danh_muc]) 
        REFERENCES [dbo].[danh_muc] ([ma_danh_muc])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[thu_cung]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[thu_cung] (
        [ma_thu_cung] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_san_pham] BIGINT NOT NULL,
        [giong] NVARCHAR(50) NULL,
        [gioi_tinh] NVARCHAR(50) NULL,
        [tuoi] NVARCHAR(50) NULL,
        [trang_thai_tiem] NVARCHAR(100) NULL,
        [so_luong_ton_kho] INT NOT NULL,
        CONSTRAINT [FK_thu_cung_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham]),
        CONSTRAINT [UQ_thu_cung_ma_san_pham] UNIQUE ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[phu_kien]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[phu_kien] (
        [ma_phu_kien] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_san_pham] BIGINT NOT NULL,
        [so_luong_ton_kho] INT NOT NULL,
        [loai_phu_kien] NVARCHAR(100) NULL,
        CONSTRAINT [FK_phu_kien_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham]),
        CONSTRAINT [UQ_phu_kien_ma_san_pham] UNIQUE ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[gio_hang]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[gio_hang] (
        [ma_gio_hang] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_khach_hang] BIGINT NOT NULL,
        CONSTRAINT [FK_gio_hang_nguoi_dung] FOREIGN KEY ([ma_khach_hang]) 
        REFERENCES [dbo].[nguoi_dung] ([ma_nguoi_dung])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[chi_tiet_gio_hang]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[chi_tiet_gio_hang] (
        [ma_gio_hang] BIGINT NOT NULL,
        [ma_san_pham] BIGINT NOT NULL,
        [so_luong] INT NOT NULL,
        CONSTRAINT [PK_chi_tiet_gio_hang] PRIMARY KEY ([ma_gio_hang], [ma_san_pham]),
        CONSTRAINT [FK_chi_tiet_gio_hang_gio_hang] FOREIGN KEY ([ma_gio_hang]) 
        REFERENCES [dbo].[gio_hang] ([ma_gio_hang]),
        CONSTRAINT [FK_chi_tiet_gio_hang_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[nha_cung_cap]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[nha_cung_cap] (
        [ma_nha_cung_cap] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ten] NVARCHAR(200) NOT NULL,
        [dia_chi] NVARCHAR(200) NULL,
        [so_dien_thoai] NVARCHAR(20) NULL,
        [email] NVARCHAR(100) NULL
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[cung_cap]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[cung_cap] (
        [ma_nha_cung_cap] BIGINT NOT NULL,
        [ma_san_pham] BIGINT NOT NULL,
        [gia_cung_cap] DECIMAL(18,2) NOT NULL,
        [ngay_cung_cap] DATETIME2 NOT NULL,
        CONSTRAINT [PK_cung_cap] PRIMARY KEY ([ma_nha_cung_cap], [ma_san_pham]),
        CONSTRAINT [FK_cung_cap_nha_cung_cap] FOREIGN KEY ([ma_nha_cung_cap]) 
        REFERENCES [dbo].[nha_cung_cap] ([ma_nha_cung_cap]),
        CONSTRAINT [FK_cung_cap_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[yeu_thich]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[yeu_thich] (
        [ma_khach_hang] BIGINT NOT NULL,
        [ma_san_pham] BIGINT NOT NULL,
        [thoi_gian_them] DATETIME2 NOT NULL,
        CONSTRAINT [PK_yeu_thich] PRIMARY KEY ([ma_khach_hang], [ma_san_pham]),
        CONSTRAINT [FK_yeu_thich_nguoi_dung] FOREIGN KEY ([ma_khach_hang]) 
        REFERENCES [dbo].[nguoi_dung] ([ma_nguoi_dung]),
        CONSTRAINT [FK_yeu_thich_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[don_hang]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[don_hang] (
        [ma_don_hang] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_khach_hang] BIGINT NOT NULL,
        [ngay_dat_hang] DATETIME2 NOT NULL,
        [tong_tien] DECIMAL(18,2) NOT NULL,
        [trang_thai_don_hang] NVARCHAR(50) NULL,
        CONSTRAINT [FK_don_hang_nguoi_dung] FOREIGN KEY ([ma_khach_hang]) 
        REFERENCES [dbo].[nguoi_dung] ([ma_nguoi_dung])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[chi_tiet_don_hang]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[chi_tiet_don_hang] (
        [ma_don_hang] BIGINT NOT NULL,
        [ma_san_pham] BIGINT NOT NULL,
        [so_luong] INT NOT NULL,
        [don_gia] DECIMAL(18,2) NOT NULL,
        CONSTRAINT [PK_chi_tiet_don_hang] PRIMARY KEY ([ma_don_hang], [ma_san_pham]),
        CONSTRAINT [FK_chi_tiet_don_hang_don_hang] FOREIGN KEY ([ma_don_hang]) 
        REFERENCES [dbo].[don_hang] ([ma_don_hang]),
        CONSTRAINT [FK_chi_tiet_don_hang_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[thanh_toan]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[thanh_toan] (
        [ma_giao_dich] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_don_hang] BIGINT NOT NULL,
        [phuong_thuc_thanh_toan] NVARCHAR(50) NULL,
        [so_tien] DECIMAL(18,2) NOT NULL,
        [thoi_gian_thanh_toan] DATETIME2 NOT NULL,
        [trang_thai_giao_dich] NVARCHAR(50) NULL,
        CONSTRAINT [FK_thanh_toan_don_hang] FOREIGN KEY ([ma_don_hang]) 
        REFERENCES [dbo].[don_hang] ([ma_don_hang])
    );
END

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[danh_gia]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[danh_gia] (
        [ma_danh_gia] BIGINT IDENTITY(1,1) PRIMARY KEY,
        [ma_san_pham] BIGINT NOT NULL,
        [ma_khach_hang] BIGINT NOT NULL,
        [ngay_danh_gia] DATETIME2 NOT NULL,
        [so_sao] INT NOT NULL,
        [noi_dung] NVARCHAR(MAX) NULL,
        CONSTRAINT [FK_danh_gia_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham]),
        CONSTRAINT [FK_danh_gia_nguoi_dung] FOREIGN KEY ([ma_khach_hang]) 
        REFERENCES [dbo].[nguoi_dung] ([ma_nguoi_dung])
    );
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_san_pham_ma_danh_muc' AND object_id = OBJECT_ID('san_pham'))
    CREATE INDEX [idx_san_pham_ma_danh_muc] ON [dbo].[san_pham]([ma_danh_muc]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_thu_cung_ma_san_pham' AND object_id = OBJECT_ID('thu_cung'))
    CREATE INDEX [idx_thu_cung_ma_san_pham] ON [dbo].[thu_cung]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_phu_kien_ma_san_pham' AND object_id = OBJECT_ID('phu_kien'))
    CREATE INDEX [idx_phu_kien_ma_san_pham] ON [dbo].[phu_kien]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_gio_hang_ma_khach_hang' AND object_id = OBJECT_ID('gio_hang'))
    CREATE INDEX [idx_gio_hang_ma_khach_hang] ON [dbo].[gio_hang]([ma_khach_hang]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_chi_tiet_gio_hang_ma_san_pham' AND object_id = OBJECT_ID('chi_tiet_gio_hang'))
    CREATE INDEX [idx_chi_tiet_gio_hang_ma_san_pham] ON [dbo].[chi_tiet_gio_hang]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_cung_cap_ma_san_pham' AND object_id = OBJECT_ID('cung_cap'))
    CREATE INDEX [idx_cung_cap_ma_san_pham] ON [dbo].[cung_cap]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_yeu_thich_ma_san_pham' AND object_id = OBJECT_ID('yeu_thich'))
    CREATE INDEX [idx_yeu_thich_ma_san_pham] ON [dbo].[yeu_thich]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_don_hang_ma_khach_hang' AND object_id = OBJECT_ID('don_hang'))
    CREATE INDEX [idx_don_hang_ma_khach_hang] ON [dbo].[don_hang]([ma_khach_hang]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_chi_tiet_don_hang_ma_san_pham' AND object_id = OBJECT_ID('chi_tiet_don_hang'))
    CREATE INDEX [idx_chi_tiet_don_hang_ma_san_pham] ON [dbo].[chi_tiet_don_hang]([ma_san_pham]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_thanh_toan_ma_don_hang' AND object_id = OBJECT_ID('thanh_toan'))
    CREATE INDEX [idx_thanh_toan_ma_don_hang] ON [dbo].[thanh_toan]([ma_don_hang]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_danh_gia_ma_khach_hang' AND object_id = OBJECT_ID('danh_gia'))
    CREATE INDEX [idx_danh_gia_ma_khach_hang] ON [dbo].[danh_gia]([ma_khach_hang]);

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'idx_danh_gia_ma_san_pham' AND object_id = OBJECT_ID('danh_gia'))
    CREATE INDEX [idx_danh_gia_ma_san_pham] ON [dbo].[danh_gia]([ma_san_pham]);