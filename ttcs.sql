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
        [ten_dang_nhap] NVARCHAR(100) UNIQUE NULL,
        [avatar] NVARCHAR(255) NULL
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




INSERT INTO [dbo].[nguoi_dung] 
([ho_ten], [so_dien_thoai], [email], [dia_chi], [quyen_truy_cap], [mat_khau], [ten_dang_nhap], [avatar])
VALUES 
(N'Nguyễn Văn An', '0987654321', N'nguyenvanan@gmail.com', N'123 Đường Láng, Hà Nội', N'ADMIN', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'nguyenvanan', 'https://i.pravatar.cc/150?u=a0425811'),
(N'Trần Thị Bình', '0912345678', N'tranthibinh@yahoo.com', N'456 Phố Huế, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'tranthibinh', 'https://i.pravatar.cc/150?u=a0425812'),
(N'Lê Hoàng Cường', '0978123456', N'lehoangcuong@gmail.com', N'789 Đường Giải Phóng, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'lehoangcuong', 'https://i.pravatar.cc/150?u=a0425813'),
(N'Phạm Thị Dung', '0967891234', N'phamthidung@gmail.com', N'321 Đường Bưởi, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'phamthidung', 'https://i.pravatar.cc/150?u=a0425814'),
(N'Vũ Minh Đức', '0956789123', N'vuminhduc@yahoo.com', N'654 Phố Vọng, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'vuminhduc', 'https://i.pravatar.cc/150?u=a0425815'),
(N'Ngô Thị Hà', '0945678912', N'ngothiha@gmail.com', N'987 Đường Lạc Long Quân, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'ngothiha', 'https://i.pravatar.cc/150?u=a0425816'),
(N'Đặng Văn Khánh', '0934567891', N'dangvankhanh@gmail.com', N'159 Đường Xuân Thủy, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'dangvankhanh', 'https://i.pravatar.cc/150?u=a0425817'),
(N'Bùi Thị Lan', '0923456789', N'buithilan@yahoo.com', N'753 Phố Chùa Bộc, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'buithilan', 'https://i.pravatar.cc/150?u=a0425818'),
(N'Hoàng Văn Mạnh', '0912345678', N'hoangvanmanh@gmail.com', N'852 Đường Nguyễn Trãi, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'hoangvanmanh', 'https://i.pravatar.cc/150?u=a0425819'),
(N'Lý Thị Nga', '0981234567', N'lythinga@gmail.com', N'456 Phố Tây Sơn, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'lythinga', 'https://i.pravatar.cc/150?u=a04258110'),
(N'Trịnh Văn Phúc', '0972345678', N'trinhvanphuc@yahoo.com', N'789 Đường Hoàng Quốc Việt, Hà Nội', N'ADMIN', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'trinhvanphuc', 'https://i.pravatar.cc/150?u=a04258111'),
(N'Mai Thị Quỳnh', '0963456789', N'maithiquynh@gmail.com', N'123 Phố Trần Duy Hưng, Hà Nội', N'CUSTOMER', N'$2a$10$q.6uXtKto8Vm8e5Uu4zfg.qDBLiiYH1RRz4lXC2n5vCyh3yURk4v2', N'maithiquynh', 'https://i.pravatar.cc/150?u=a04258112');



INSERT INTO [dbo].[danh_muc] ([ten_danh_muc], [mo_ta], [kieu])
VALUES 
(N'Chó Alaska Malamute', N'Các giống chó Alaska Malamute', N'thu_cung'),
(N'Chó Beagle', N'Các giống chó Beagle', N'thu_cung'),
(N'Chó Corgi', N'Các giống chó Corgi', N'thu_cung'),
(N'Chó Golden Retriever', N'Các giống chó Golden Retriever', N'thu_cung'),
(N'Chó Husky Siberian', N'Các giống chó Husky Siberian', N'thu_cung'),
(N'Chó Phốc Sóc – Pomeranian', N'Các giống chó Phốc Sóc – Pomeranian', N'thu_cung'),
(N'Chó Poodle', N'Các giống chó Poodle', N'thu_cung'),
(N'Chó Pug', N'Các giống chó Pug', N'thu_cung'),
(N'Chó Samoyed', N'Các giống chó Samoyed', N'thu_cung'),
(N'Mèo Anh (Dài + Ngắn)', N'Các giống mèo Anh (Dài + Ngắn)', N'thu_cung'),
(N'Mèo Chân Ngắn', N'Các giống mèo Chân Ngắn', N'thu_cung'),
(N'Mèo Tai Cụp', N'Các giống mèo Tai Cụp', N'thu_cung');

INSERT INTO [dbo].[danh_muc] ([ten_danh_muc], [mo_ta], [kieu])
VALUES
(N'Balo đựng thú cưng', N'Các loại balo đựng thú cưng tiện lợi', N'phu_kien'),
(N'Vòng cổ thú cưng', N'Vòng cổ thời trang và đa dạng cho thú cưng', N'phu_kien'),
(N'Dây dắt chó mèo', N'Dây dắt chất lượng cao cho chó và mèo', N'phu_kien'),
(N'Nhà và chuồng thú cưng', N'Chuồng và nhà cho thú cưng an toàn', N'phu_kien'),
(N'Cát vệ sinh cho mèo', N'Cát vệ sinh khử mùi cho mèo', N'phu_kien'),
(N'Bàn chải chải lông', N'Bàn chải giúp chải lông chó mèo sạch sẽ', N'phu_kien'),
(N'Áo len cho chó mèo', N'Quần áo giữ ấm cho chó mèo', N'phu_kien');

INSERT INTO [dbo].[san_pham] ([ten_san_pham], [ma_danh_muc], [hinh_anh], [mo_ta], [gia_ban])
VALUES 
(N'Chó Alaska Malamute thuần chủng', 1, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619293/ThuCungTrang316_ebyo5q.jpg', N'Chó Alaska Malamute thuần chủng, màu xám trắng, 4 tháng tuổi', 20000000),
(N'Chó Beagle thuần chủng', 2, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang310_mwfrnx.jpg', N'Chó Beagle thuần chủng, màu tam thể, 3 tháng tuổi', 15000000),
(N'Chó Corgi thuần chủng', 3, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang315_k7t0cc.jpg', N'Chó Corgi thuần chủng, màu vàng đỏ, 5 tháng tuổi', 18000000),
(N'Chó Golden Retriever thuần chủng', 4, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619293/ThuCungTrang314_rftmu4.jpg', N'Chó Golden Retriever thuần chủng, màu vàng kem, 4 tháng tuổi', 22000000),
(N'Chó Husky Siberian thuần chủng', 5, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang313_hys1ij.jpg', N'Chó Husky Siberian thuần chủng, màu xám đen, 6 tháng tuổi', 23000000),
(N'Chó Phốc Sóc – Pomeranian thuần chủng', 6, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang312_qn1onk.jpg', N'Chó Phốc Sóc – Pomeranian thuần chủng, màu vàng kem, 3 tháng tuổi', 17000000),
(N'Chó Poodle thuần chủng', 7, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang311_apzjd7.jpg', N'Chó Poodle thuần chủng, màu trắng, 4 tháng tuổi', 16000000),
(N'Chó Pug thuần chủng', 8, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619293/ThuCungTrang316_ebyo5q.jpg', N'Chó Pug thuần chủng, màu đen, 3 tháng tuổi', 15000000),
(N'Chó Samoyed thuần chủng', 9, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang310_mwfrnx.jpg', N'Chó Samoyed thuần chủng, màu trắng, 5 tháng tuổi', 21000000),
(N'Mèo Anh (Dài + Ngắn) thuần chủng', 10, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang315_k7t0cc.jpg', N'Mèo Anh lông dài và ngắn thuần chủng, màu xám xanh, 4 tháng tuổi', 18000000),
(N'Mèo Chân Ngắn thuần chủng', 11, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619293/ThuCungTrang314_rftmu4.jpg', N'Mèo Chân Ngắn thuần chủng, màu vàng, 3 tháng tuổi', 16000000),
(N'Mèo Tai Cụp thuần chủng', 12, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619292/ThuCungTrang313_hys1ij.jpg', N'Mèo Tai Cụp thuần chủng, màu trắng xám, 4 tháng tuổi', 17000000);


INSERT INTO [dbo].[san_pham] ([ten_san_pham], [ma_danh_muc], [hinh_anh], [mo_ta], [gia_ban])
VALUES
-- Balo đựng thú cưng (giả sử ma_danh_muc = 13)
(N'Balo đựng thú cưng màu xanh', 13, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien1_07_bq6jbi.jpg', N'Balo đựng thú cưng tiện lợi, chất liệu bền', 450000),

-- Vòng cổ thú cưng (giả sử ma_danh_muc = 14)
(N'Vòng cổ đính đá cho thú cưng', 14, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien3_16_u8zhhu.jpg', N'Vòng cổ thời trang, sang trọng cho thú cưng', 320000),

-- Dây dắt chó mèo (giả sử ma_danh_muc = 15)
(N'Dây dắt chó cao cấp', 15, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien3_07_ohangh.jpg', N'Dây dắt chó mèo chống giật, bền chắc', 250000),

-- Nhà và chuồng thú cưng (giả sử ma_danh_muc = 16)
(N'Nhà gỗ cho chó mèo', 16, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien1_07_bq6jbi.jpg', N'Nhà gỗ chắc chắn, phù hợp cho chó mèo', 1200000),

-- Cát vệ sinh cho mèo (giả sử ma_danh_muc = 17)
(N'Cát vệ sinh khử mùi cho mèo', 17, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien3_16_u8zhhu.jpg', N'Cát vệ sinh an toàn, khử mùi hiệu quả', 350000),

-- Bàn chải chải lông (giả sử ma_danh_muc = 18)
(N'Bàn chải chải lông chó mèo', 18, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien3_07_ohangh.jpg', N'Bàn chải giúp loại bỏ lông rụng, dễ sử dụng', 150000),

-- Áo len cho chó mèo (giả sử ma_danh_muc = 19)
(N'Áo len giữ ấm cho chó mèo', 19, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1747619484/phukien1_07_bq6jbi.jpg', N'Áo len mềm mại, giữ ấm cho thú cưng', 220000);




INSERT INTO [dbo].[thu_cung] ([ma_san_pham],  [gioi_tinh], [tuoi], [trang_thai_tiem], [so_luong_ton_kho])
VALUES 
(1, N'Đực', N'3 tháng', N'Đã tiêm đủ 2 mũi', 5),
(2,  N'Cái', N'4 tháng', N'Đã tiêm đủ 2 mũi', 3),
(3, N'Đực', N'2 tháng', N'Đã tiêm 1 mũi', 4),
(4,  N'Cái', N'3 tháng', N'Đã tiêm đủ 2 mũi', 6),
(5, N'Đực', N'4 tháng', N'Đã tiêm đủ 2 mũi', 2),
(6,  N'Cái', N'3 tháng', N'Đã tiêm đủ 2 mũi', 3),
(7,  N'Đực', N'5 tháng', N'Đã tiêm đủ 2 mũi', 4),
(8, N'Cái', N'3 tháng', N'Đã tiêm 1 mũi', 5),
(9,  N'Đực', N'6 tháng', N'Đã tiêm đủ 3 mũi', 2),
(10, N'Cái', N'4 tháng', N'Đã tiêm đủ 2 mũi', 3),
(11,  N'Đực', N'3 tháng', N'Đã tiêm đủ 2 mũi', 2),
(12,  N'Cái', N'5 tháng', N'Đã tiêm đủ 3 mũi', 1);



INSERT INTO [dbo].[phu_kien] ([ma_san_pham], [so_luong_ton_kho])
VALUES
(13, 50),       -- Balo đựng thú cưng
(14, 30),    -- Vòng cổ đính đá
(15, 40),       -- Dây dắt chó mèo
(16, 10),           -- Nhà gỗ cho chó mèo
(17, 25),                -- Cát vệ sinh cho mèo
(18, 35),     -- Bàn chải chải lông
(19, 15);   -- Áo len cho chó mèo


-- Insert data into gio_hang table
INSERT INTO [dbo].[gio_hang] ([ma_khach_hang])
VALUES 
(3), (4), (5), (6), (7), (8), (9), (10), (12);

-- Insert data into chi_tiet_gio_hang table
INSERT INTO [dbo].[chi_tiet_gio_hang] ([ma_gio_hang], [ma_san_pham], [so_luong])
VALUES 
(1, 1, 1), (1, 7, 2), (1, 11, 1),
(2, 4, 1), (2, 8, 3),
(3, 2, 1), (3, 9, 1),
(4, 5, 1), (4, 15, 2),
(5, 3, 1), (5, 12, 1),
(6, 6, 1), (6, 10, 1),
(7, 7, 2), (7, 14, 1),
(8, 8, 1), (8, 13, 2),
(9, 9, 1), (9, 11, 1);

-- Insert data into nha_cung_cap table
INSERT INTO [dbo].[nha_cung_cap] ([ten], [dia_chi], [so_dien_thoai], [email])
VALUES 
(N'Công ty TNHH PetLife', N'Số 12, đường Lê Văn Lương, Hà Nội', '02438234567', 'info@petlife.com.vn'),
(N'Trại chó giống Vạn Lộc', N'Thôn 3, xã Vạn Phúc, Hà Đông, Hà Nội', '0987654321', 'vanlocdog@gmail.com'),
(N'Cửa hàng thú cưng Happy Pet', N'Số 45, phố Nguyễn Chí Thanh, Hà Nội', '02437345678', 'happypet@gmail.com'),
(N'Nhập khẩu phụ kiện PetStyle', N'Số 78, đường Trần Duy Hưng, Hà Nội', '02438245679', 'petstyle@yahoo.com'),
(N'Công ty Royal Canin Việt Nam', N'Lô A2, KCN Bắc Thăng Long, Hà Nội', '02438567890', 'contact@royalcanin.com.vn'),
(N'Đại lý thức ăn Whiskas', N'Số 23, phố Hoàng Đạo Thúy, Hà Nội', '02437123456', 'whiskasvn@gmail.com'),
(N'Xưởng sản xuất chuồng trại PetHouse', N'Số 56, đường Phạm Văn Đồng, Hà Nội', '0987123456', 'pethouse@gmail.com'),
(N'Cửa hàng phụ kiện PetCare', N'Số 89, phố Kim Mã, Hà Nội', '02438456789', 'petcare@gmail.com'),
(N'Nhà phân phối cát vệ sinh', N'Số 34, đường Nguyễn Văn Huyên, Hà Nội', '0978234567', 'catsbestvn@yahoo.com'),
(N'Xưởng may đồ thú cưng PetFashion', N'Số 67, phố Đội Cấn, Hà Nội', '02437654321', 'petfashion@gmail.com');


-- Insert data into cung_cap table
INSERT INTO [dbo].[cung_cap] ([ma_nha_cung_cap], [ma_san_pham], [gia_cung_cap], [ngay_cung_cap])
VALUES 
(2, 1, 12000000, '2023-01-15'),
(2, 2, 16000000, '2023-02-20'),
(2, 3, 10000000, '2023-03-10'),
(1, 4, 15000000, '2023-01-25'),
(1, 5, 20000000, '2023-02-15'),
(1, 6, 18000000, '2023-03-05'),
(5, 7, 280000, '2023-04-01'),
(6, 8, 220000, '2023-04-05'),
(10, 9, 350000, '2023-04-10'),
(8, 10, 250000, '2023-04-15'),
(8, 11, 200000, '2023-04-20'),
(7, 12, 900000, '2023-05-01'),
(9, 13, 280000, '2023-05-05'),
(3, 14, 120000, '2023-05-10'),
(10, 15, 180000, '2023-05-15');

-- Insert data into yeu_thich table
INSERT INTO [dbo].[yeu_thich] ([ma_khach_hang], [ma_san_pham], [thoi_gian_them])
VALUES 
(3, 1, '2023-05-01 10:00:00'),
(3, 4, '2023-05-02 11:00:00'),
(4, 2, '2023-05-03 09:00:00'),
(4, 5, '2023-05-04 14:00:00'),
(5, 3, '2023-05-05 16:00:00'),
(5, 6, '2023-05-06 10:00:00'),
(6, 7, '2023-05-07 11:00:00'),
(6, 8, '2023-05-08 15:00:00'),
(7, 9, '2023-05-09 09:00:00'),
(7, 10, '2023-05-10 13:00:00'),
(8, 11, '2023-05-11 17:00:00'),
(8, 12, '2023-05-12 10:00:00'),
(9, 13, '2023-05-13 14:00:00'),
(9, 14, '2023-05-14 16:00:00'),
(10, 15, '2023-05-15 11:00:00');

-- Insert data into don_hang table
INSERT INTO [dbo].[don_hang] ([ma_khach_hang], [ngay_dat_hang], [tong_tien], [trang_thai_don_hang])
VALUES 
(3, '2023-06-01 10:00:00', 15700000, 'Đã giao'),
(4, '2023-06-02 11:00:00', 18840000, 'Đã giao'),
(5, '2023-06-03 09:00:00', 12450000, 'Đang giao'),
(6, '2023-06-04 14:00:00', 25300000, 'Đã giao'),
(7, '2023-06-05 16:00:00', 920000, 'Đang xử lý'),
(8, '2023-06-06 10:00:00', 1450000, 'Đã giao'),
(9, '2023-06-07 11:00:00', 850000, 'Đang giao'),
(10, '2023-06-08 15:00:00', 540000, 'Đã giao'),
(12, '2023-06-09 09:00:00', 700000, 'Đang xử lý');

-- Insert data into chi_tiet_don_hang table
INSERT INTO [dbo].[chi_tiet_don_hang] ([ma_don_hang], [ma_san_pham], [so_luong], [don_gia])
VALUES 
(1, 1, 1, 15000000),
(1, 7, 1, 350000),
(1, 11, 1, 250000),
(2, 4, 1, 18000000),
(2, 8, 3, 280000),
(3, 2, 1, 20000000),
(3, 9, 1, 450000),
(4, 5, 1, 25000000),
(4, 15, 1, 220000),
(4, 10, 1, 320000),
(5, 7, 2, 350000),
(5, 14, 1, 150000),
(6, 12, 1, 1200000),
(6, 13, 1, 350000),
(7, 8, 2, 280000),
(7, 14, 1, 150000),
(8, 10, 1, 320000),
(8, 11, 1, 250000),
(9, 9, 1, 450000),
(9, 15, 1, 220000);

-- Insert data into thanh_toan table
INSERT INTO [dbo].[thanh_toan] ([ma_don_hang], [phuong_thuc_thanh_toan], [so_tien], [thoi_gian_thanh_toan], [trang_thai_giao_dich])
VALUES 
(1, N'Chuyển khoản', 15700000, '2023-06-01 10:30:00', N'Thành công'),
(2, N'Tiền mặt', 18840000, '2023-06-02 11:30:00', N'Thành công'),
(3, N'Chuyển khoản', 12450000, '2023-06-03 09:30:00', N'Thành công'),
(4, N'Thẻ tín dụng', 25300000, '2023-06-04 14:30:00', N'Thành công'),
(5, N'Ví điện tử', 920000, '2023-06-05 16:30:00', N'Thành công'),
(6, N'Tiền mặt', 1450000, '2023-06-06 10:30:00', N'Thành công'),
(7, N'Chuyển khoản', 850000, '2023-06-07 11:30:00', N'Thành công'),
(8, N'Thẻ tín dụng', 540000, '2023-06-08 15:30:00', N'Thành công'),
(9, N'Ví điện tử', 700000, '2023-06-09 09:30:00', N'Thành công');


-- Insert data into danh_gia table
INSERT INTO [dbo].[danh_gia] ([ma_san_pham], [ma_khach_hang], [ngay_danh_gia], [so_sao], [noi_dung])
VALUES 
(1, 3, '2023-06-03 10:00:00', 5, N'Chó rất đẹp và khỏe mạnh, shop tư vấn nhiệt tình'),
(4, 4, '2023-06-04 11:00:00', 4, N'Mèo dễ thương nhưng hơi nhút nhát'),
(7, 5, '2023-06-05 09:00:00', 5, N'Thức ăn chất lượng tốt, chó nhà mình rất thích'),
(8, 6, '2023-06-06 14:00:00', 4, N'Thức ăn ngon nhưng giá hơi cao'),
(9, 7, '2023-06-07 16:00:00', 3, N'Balo tốt nhưng hơi nhỏ so với kích thước quảng cáo'),
(10, 8, '2023-06-08 10:00:00', 5, N'Vòng cổ rất đẹp, chất lượng tốt'),
(11, 9, '2023-06-09 11:00:00', 4, N'Dây dắt chắc chắn, dễ sử dụng'),
(12, 10, '2023-06-10 15:00:00', 5, N'Nhà gỗ đẹp, chó nhà mình rất thích'),
(13, 12, '2023-06-11 09:00:00', 4, N'Cát khử mùi tốt, giá hợp lý'),
(14, 3, '2023-06-12 10:00:00', 3, N'Bàn chải dùng tạm được'),
(15, 4, '2023-06-13 11:00:00', 5, N'Áo len đẹp, vừa vặn với chó nhà mình'),
(2, 5, '2023-06-14 09:00:00', 5, N'Chó Alaska rất khỏe mạnh và đẹp'),
(3, 6, '2023-06-15 14:00:00', 4, N'Chó Phốc Sóc nhỏ nhắn dễ thương'),
(5, 7, '2023-06-16 16:00:00', 5, N'Mèo Ba Tư đẹp như trong hình');
