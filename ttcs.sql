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
        [so_luong] INT NOT NULL,
        CONSTRAINT [PK_cung_cap] PRIMARY KEY ([ma_nha_cung_cap], [ma_san_pham]),
        CONSTRAINT [FK_cung_cap_nha_cung_cap] FOREIGN KEY ([ma_nha_cung_cap]) 
        REFERENCES [dbo].[nha_cung_cap] ([ma_nha_cung_cap]),
        CONSTRAINT [FK_cung_cap_san_pham] FOREIGN KEY ([ma_san_pham]) 
        REFERENCES [dbo].[san_pham] ([ma_san_pham])
    );
END
ELSE
BEGIN
    IF COL_LENGTH('dbo.cung_cap', 'so_luong') IS NULL
    BEGIN
        ALTER TABLE [dbo].[cung_cap]
        ADD [so_luong] INT NOT NULL DEFAULT 0;
    END
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
(N'Chó Alaska', N'Giống chó Alaska Malamute khỏe mạnh, thân thiện và thích hợp với khí hậu lạnh.', N'thu_cung'),
(N'Chó Corgi', N'Chó Corgi chân ngắn, tính cách vui vẻ và thân thiện với trẻ nhỏ.', N'thu_cung'),
(N'Chó Bull Pháp', N'Chó Bull Pháp nhỏ gọn, đáng yêu, phù hợp nuôi trong căn hộ.', N'thu_cung'),			
(N'Mèo Ba Tư', N'Mèo Ba Tư lông dài, mặt xệ, tính cách điềm đạm.', N'thu_cung'),
(N'Mèo Anh Lông Dài', N'Mèo Anh lông dài, thân thiện và dễ chăm sóc.', N'thu_cung'),
(N'Mèo Bengal', N'Mèo Bengal có bộ lông vằn độc đáo, năng động và thông minh.', N'thu_cung');


INSERT INTO [dbo].[danh_muc] ([ten_danh_muc], [mo_ta], [kieu])
VALUES
(N'Bát', N'Bát ăn và uống cho thú cưng với nhiều chất liệu và kích thước.', N'phu_kien'),
(N'Vòng cổ thú cưng', N'Vòng cổ các loại: thời trang, định danh, chống ve rận...', N'phu_kien'),
(N'Đồ y tế', N'Dụng cụ và sản phẩm chăm sóc sức khỏe thú cưng như thuốc, bông, kháng sinh...', N'phu_kien');


INSERT INTO [dbo].[san_pham] ([ten_san_pham], [ma_danh_muc], [hinh_anh], [mo_ta], [gia_ban])
VALUES 
(N'Alaska Đen Trắng', 1, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748484759/z6015559978898_aaaa70a3bca6d9869da9a49f1deb9567-1536x1536_m0bh73.jpg', N'Alaska Malamute đen trắng, đực, 4 tháng tuổi, nặng 15kg.', 19000000),
(N'Alaska Nâu Đỏ', 1, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748484760/z5427990827838_b3ad8a626e7450997007f7ed0dbca9e2_guxqjp.jpg', N'Alaska Malamute nâu đỏ, cái, 4 tháng tuổi, thân thiện.', 19500000),
(N'Alaska Standard Xám Trắng', 1, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748484759/Alaska-Standard-Xam-Trang-C12215-1_grznhf.jpg', N'Alaska Malamute chuẩn, xám trắng, 3.5 tháng tuổi, giấy tờ đầy đủ.', 18500000),
(N'Alaska Oversize Xám Trắng', 1, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748484758/Alaska-Oversize-Xam-Trang-C12220-1_n2rp28.jpg', N'Alaska Oversize xám trắng, to khỏe, 4.5 tháng tuổi, nguồn gốc rõ ràng.', 22000000),

(N'Corgi ú nu siêu xinh', 2, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485410/image-2024-08-22T093139.703-360x360_mbro2x.png', N'Corgi đực, màu trắng vàng, 3 tháng tuổi, lông dày, đáng yêu.', 12500000),
(N'Corgi Tricolor', 2, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485410/corgi-tricolor-cai-2-1536x1536_bmdmk6.jpg', N'Corgi cái, màu tam thể, nhỏ nhắn, 3.5 tháng tuổi.', 13000000),
(N'Corgi Trắng Vàng', 2, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485411/z5747532273899_a92a935e7b39ec3392a3212ba8cb10a4-1536x1536_uobv8n.jpg', N'Corgi đực, trắng vàng, đã tiêm ngừa, giấy tờ đầy đủ.', 13500000),

(N'Bull Pháp Bò Sữa', 3, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485570/C2360-C12988-1_ro5w1w.jpg', N'Chó Bull Pháp bò sữa, thân hình chắc khỏe, hiền lành.', 14500000),

(N'Ba Tư Tabby', 4, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485724/M12073-1_rcy7ro.jpg', N'Mèo Ba Tư Tabby, lông dài mềm mượt, 2.5 tháng tuổi.', 9500000),
(N'Ba Tư Silver', 4, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485737/M12074-1_ncdtbp.jpg', N'Mèo Ba Tư Silver, màu lông ánh bạc, tính cách hiền lành.', 10000000),

(N'Anh Lông Dài Tricolor', 5, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485951/anh-long-dai-tricolor-cai-3_p9kcrw.jpg', N'Mèo Anh lông dài tam thể, 3 tháng tuổi, sức khỏe tốt.', 9500000),
(N'Anh Lông Dài Tabby', 5, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485950/anh-long-dai-tabby-cai-2-1-1536x1536_kmenzc.jpg', N'Mèo Anh lông dài Tabby, dễ nuôi, thân thiện với trẻ.', 9800000),

(N'Bengal Brown', 6, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748485949/Bengal-Brown-Silver-M12229-1_jyc56h.jpg', N'Mèo Bengal nâu vằn, 3 tháng tuổi, cực kỳ lanh lợi và hiếu động.', 12000000);


INSERT INTO [dbo].[san_pham] ([ten_san_pham], [ma_danh_muc], [hinh_anh], [mo_ta], [gia_ban])
VALUES
(N'Bát nhựa đơn 3 ngăn hình mèo', 7, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486287/vn-11134207-7r98o-m08ptft1difj14_dk2dav.jpg', N'Bát nhựa có 3 ngăn hình mèo dễ thương, chất liệu bền, phù hợp cho chó mèo', 60000),
(N'Bát nhựa đôi tròn', 7, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486383/4926d027579592c7d32a76ff0efb0251_yok8v1.jpg', N'Bát đôi nhựa tròn tiện dụng, thích hợp đựng thức ăn và nước cho thú cưng', 50000),
(N'Bát ăn uống tự động 3500ml', 7, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486742/vn-11134207-7r98o-m042aaha578tc1_dagkqp.jpg', N'Bát ăn tự động dung tích 3500ml giúp cung cấp thức ăn đều đặn cho thú cưng', 120000),

(N'Vòng cổ Younice & Kitten', 8, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486742/39b141b7-9e4c-4181-8e20-540b4e4ed637-jpeg_xj95gw.jpg', N'Vòng cổ thiết kế dễ thương dành cho chó mèo nhỏ, có chuông và khoá an toàn', 35000),
(N'Vòng cổ đồng móc tròn', 8, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486740/download_xbzlom.jpg', N'Vòng cổ bằng đồng bền chắc với móc tròn tiện dụng cho chó trung bình và lớn', 50000),
(N'Vòng cổ da đính đá 2 hàng', 8, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486831/da_v5wesj.jpg', N'Vòng cổ da cao cấp, đính đá 2 hàng sang trọng, thời trang cho thú cưng', 80000),

(N'Men tiêu hoá', 9, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486739/09122022032316_64037.png_thumb_600x600_dqc4qb.png', N'Men tiêu hóa hỗ trợ đường ruột, giúp thú cưng ăn ngon và hấp thu tốt', 90000),
(N'Thuốc tẩy giun Sanpet', 9, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486889/sanpet_tv_kxgbaf.jpg', N'Thuốc tẩy giun Sanpet dùng cho chó mèo, hiệu quả và an toàn', 40000),
(N'Dầu Tắm Trị Viêm', 9, N'https://res.cloudinary.com/dc4bgvfbj/image/upload/v1748486738/26eb6a96c3f0ce5ef602641c6400f9b3_lpt2lg.jpg', N'Dầu tắm trị viêm da, dị ứng, nấm cho chó mèo, chiết xuất thảo dược', 120000);



INSERT INTO [dbo].[thu_cung] ([ma_san_pham], [gioi_tinh], [tuoi], [trang_thai_tiem], [so_luong_ton_kho])
VALUES 
(1, N'Đực', N'4 tháng', N'Đã tiêm đủ 2 mũi', 3),
(2, N'Cái', N'4 tháng', N'Đã tiêm đủ 2 mũi', 2),
(3, N'Đực', N'3.5 tháng', N'Đã tiêm đủ 2 mũi', 2),
(4, N'Đực', N'4.5 tháng', N'Đã tiêm đủ 2 mũi', 1),

(5, N'Đực', N'3 tháng', N'Đã tiêm đủ 2 mũi', 3),
(6, N'Cái', N'3.5 tháng', N'Đã tiêm đủ 2 mũi', 2),
(7, N'Đực', N'3.5 tháng', N'Đã tiêm đủ 2 mũi', 2),

(8, N'Đực', N'3 tháng', N'Đã tiêm đủ 2 mũi', 1),

(9, N'Cái', N'2.5 tháng', N'Đã tiêm 1 mũi', 2),
(10, N'Cái', N'3 tháng', N'Đã tiêm đủ 3 mũi', 1),

(11, N'Cái', N'3 tháng', N'Đã tiêm đủ 3 mũi', 2),
(12, N'Cái', N'3.5 tháng', N'Đã tiêm đủ 3 mũi', 2),

(13, N'Đực', N'3 tháng', N'Đã tiêm đủ 3 mũi', 1);



INSERT INTO [dbo].[phu_kien] ([ma_san_pham], [so_luong_ton_kho])
VALUES
(14, 10), -- Bát nhựa đơn 3 ngăn hình mèo
(15, 12), -- Bát nhựa đôi tròn
(16, 8),  -- Bát ăn uống tự động 3500ml

(17, 15), -- Vòng cổ Younice & Kitten
(18, 9),  -- Vòng cổ đồng móc tròn
(19, 7),  -- Vòng cổ da đính đá 2 hàng

(20, 20), -- Men tiêu hoá
(21, 18), -- Thuốc tẩy giun Sanpet
(22, 10); -- Dầu Tắm Trị Viêm


-- Insert data into gio_hang table
INSERT INTO [dbo].[gio_hang] ([ma_khach_hang])
VALUES 
(1), (2), (3), (4), (5), (6), (7), (8), (9), (10), (11), (12);

-- Insert data into chi_tiet_gio_hang table
INSERT INTO [dbo].[chi_tiet_gio_hang] ([ma_gio_hang], [ma_san_pham], [so_luong])
VALUES 
(1, 1, 1),
(1, 2, 2),(1, 7, 2), (1, 11, 1),
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


-- Insert data into cung_cap table with so_luong (March–May 2025)
INSERT INTO [dbo].[cung_cap] 
([ma_nha_cung_cap], [ma_san_pham], [gia_cung_cap], [ngay_cung_cap], [so_luong])
VALUES 
-- Chó Alaska (1–4)
(1, 1, 15000000, '2025-03-10', 5),
(1, 2, 15500000, '2025-03-12', 3),
(1, 3, 14800000, '2025-05-14', 3),
(1, 4, 17000000, '2025-05-16', 2),

-- Chó Corgi (5–7)
(2, 5, 10000000, '2025-03-18', 4),
(2, 6, 10500000, '2025-03-20', 3),
(2, 7, 11000000, '2025-05-22', 3),

-- Chó Bull Pháp (8)
(3, 8, 12000000, '2025-03-24', 2),

-- Mèo Ba Tư (9–10)
(4, 9, 7500000, '2025-03-26', 3),
(4, 10, 8000000, '2025-03-28', 2),

-- Mèo Anh lông dài (11–12)
(5, 11, 7500000, '2025-04-01', 3),
(5, 12, 7700000, '2025-04-03', 3),

-- Mèo Bengal (13)
(6, 13, 9500000, '2025-04-05', 2),

-- Phụ kiện: Bát (14–16)
(7, 14, 40000, '2025-04-10', 12),
(7, 15, 35000, '2025-04-12', 14),
(7, 16, 80000, '2025-04-14', 10),

-- Phụ kiện: Vòng cổ (17–19)
(8, 17, 20000, '2025-04-16', 18),
(8, 18, 30000, '2025-04-18', 11),
(8, 19, 60000, '2025-04-20', 9),

-- Thuốc và chăm sóc (20–22)
(9, 20, 60000, '2025-04-22', 25),
(9, 21, 25000, '2025-04-24', 20),
(9, 22, 85000, '2025-04-26', 12);


-- Insert data into yeu_thich table
INSERT INTO [dbo].[yeu_thich] ([ma_khach_hang], [ma_san_pham], [thoi_gian_them])
VALUES 
(3, 1, '2025-05-01 10:00:00'),
(3, 4, '2025-05-02 11:00:00'),
(4, 2, '2025-05-03 09:00:00'),
(4, 5, '2025-05-04 14:00:00'),
(5, 3, '2025-05-05 16:00:00'),
(5, 6, '2025-05-05 10:00:00'),
(6, 7, '2025-05-07 11:00:00'),
(6, 8, '2025-05-08 15:00:00'),
(7, 9, '2025-05-09 09:00:00'),
(7, 10, '2025-05-10 13:00:00'),
(8, 11, '2025-05-11 17:00:00'),
(8, 12, '2025-05-12 10:00:00'),
(9, 13, '2025-05-13 14:00:00'),
(9, 14, '2025-05-14 16:00:00'),
(10, 15, '2025-05-15 11:00:00');

INSERT INTO [dbo].[don_hang] ([ma_khach_hang], [ngay_dat_hang], [tong_tien], [trang_thai_don_hang])
VALUES
(1, '2025-03-08 09:00:00', 75000000, N'Đã giao'),     -- Đơn hàng 1
(3, '2025-05-09 10:00:00', 93500000, N'Đang xử lý'),  -- Đơn hàng 2
(1, '2025-03-10 11:00:00', 66000000, N'Đã giao'),     -- Đơn hàng 3
(3, '2025-05-11 12:00:00', 74000000, N'Đang giao'),   -- Đơn hàng 4
(3, '2025-05-12 13:00:00', 10500000, N'Đã giao'),     -- Đơn hàng 5
(2, '2025-04-13 14:00:00', 33000000, N'Đã giao'),     -- Đơn hàng 6
(3, '2025-05-14 15:00:00', 10000000, N'Đã giao'),     -- Đơn hàng 7
(3, '2025-05-15 16:00:00', 54000000, N'Đang xử lý'),  -- Đơn hàng 8
(4, '2025-04-16 17:00:00', 10000000, N'Đã giao'),     -- Đơn hàng 9
(3, '2025-05-17 18:00:00', 48400000, N'Đã giao'),     -- Đơn hàng 10
(2, '2025-03-18 09:00:00', 20000000, N'Đã giao'),     -- Đơn hàng 11
(2, '2025-05-19 10:00:00', 15300000, N'Đang xử lý'),  -- Đơn hàng 12
(2, '2025-05-20 11:00:00', 18860000, N'Đang xử lý'),   -- Đơn hàng 14
(2, '2025-05-21 12:00:00', 25235000, N'Đã giao'),     -- Đơn hàng 15
(1, '2025-03-22 13:00:00', 12675000, N'Đã giao'),     -- Đơn hàng 16
(3, '2025-05-23 14:00:00', 62540000, N'Đã giao'),     -- Đơn hàng 19
(3, '2025-04-24 15:00:00', 18500000, N'Đã giao'),     -- Đơn hàng 20
(3, '2025-05-25 16:00:00', 22000000, N'Đã giao'),     -- Đơn hàng 21
(4, '2025-05-26 17:00:00', 22500000, N'Đã giao'),     -- Đơn hàng 22
(4, '2025-04-27 18:00:00', 9860000, N'Đang xử lý'),   -- Đơn hàng 14 (giá trị tương ứng)
(2, '2025-04-28 09:00:00', 19500000, N'Đã giao'),     -- Đơn hàng 24, 25 (cần tách rõ nếu có)
(1, '2025-03-29 10:00:00', 18600000, N'Đã giao');     -- Đơn hàng 26


INSERT INTO [dbo].[chi_tiet_don_hang] ([ma_don_hang], [ma_san_pham], [so_luong], [don_gia])
VALUES
(1, 1, 2, 18000000),     -- Alaska trắng
(1, 2, 2, 19500000),     -- Alaska nâu đỏ

(2, 3, 1, 18500000),     -- Alaska standard
(2, 1, 2, 18000000),     -- Alaska trắng
(2, 2, 2, 19500000),     -- Alaska nâu đỏ


(3, 4, 3, 22000000),     -- Alaska oversize

(4, 5, 2, 12500000),    -- Corgi ú nu
(4, 12, 5, 9800000),    -- Anh LD Tabby

(5, 6, 1, 10500000),    -- Corgi tricolor

(6, 7, 2, 13500000),    -- Corgi trắng vàng
(6, 8, 1, 6000000),     -- Bull pháp

(7, 9, 1, 10000000),    -- Ba tư tabby

(8, 7, 2, 13500000),    -- Corgi trắng vàng
(8, 9, 2, 13500000),    -- Corgi trắng vàng


(9, 10, 1, 10000000),   -- Ba tư silver

(10, 11, 2, 9300000),    -- Anh LD Tricolor
(10, 12, 1, 9800000),    -- Anh LD Tabby

(11, 10, 1, 10000000),   -- Ba tư silver


(12, 11, 1, 9300000),    -- Anh LD Tricolor
(12, 8, 1, 6000000),     -- Bull pháp

(14, 12, 1, 9800000),    -- Anh LD Tabby

(15, 5, 1, 12500000),    -- Corgi ú nu

(16, 5, 1, 12500000),    -- Corgi ú nu

(17, 13, 1, 12000000),   -- Bengal
(17, 3, 2, 18500000),     -- Alaska standard

(14, 14, 1, 60000),      -- Bát ăn 3 ngăn

(15, 15, 1, 12700000),   -- Bát tự động + Men
(15, 16, 1, 35000),      -- Vòng cổ Younice

(16, 17, 1, 50000),      -- Vòng cổ đồng
(16, 18, 1, 125000),     -- Vòng cổ da đính đá

(17, 7, 1, 13500000),    -- Corgi trắng vàng

(18, 19, 1, 90000),      -- Men tiêu hóa

(19, 20, 1, 40000),    -- Thuốc tẩy giun
(19, 5, 2, 12500000),    -- Corgi ú nu


(20, 3, 1, 18500000),     -- Alaska standard
(20, 5, 3, 12500000),    -- Corgi ú nu


(21, 4, 1, 22000000),     -- Alaska oversize

(22, 5, 1, 12500000);   -- Corgi ú nu




INSERT INTO [dbo].[thanh_toan]
([ma_don_hang], [phuong_thuc_thanh_toan], [so_tien], [thoi_gian_thanh_toan], [trang_thai_giao_dich])
VALUES
(1, N'Thanh toán khi nhận hàng', 75000000, '2025-03-08 09:10:00', N'Thành công'),
(2, N'Thanh toán khi nhận hàng', 93500000, '2025-05-09 10:10:00', N'Thành công'),
(3, N'Thanh toán khi nhận hàng', 66000000, '2025-03-10 11:10:00', N'Thành công'),
(4, N'Thanh toán khi nhận hàng', 74000000, '2025-05-11 12:10:00', N'Thành công'),
(5, N'Thanh toán khi nhận hàng', 10500000, '2025-05-12 13:10:00', N'Thành công'),
(6, N'Thanh toán khi nhận hàng', 33000000, '2025-04-13 14:10:00', N'Thành công'),
(7, N'Thanh toán khi nhận hàng', 10000000, '2025-05-14 15:10:00', N'Thành công'),
(8, N'Thanh toán khi nhận hàng', 54000000, '2025-05-15 16:10:00', N'Thành công'),
(9, N'Thanh toán khi nhận hàng', 10000000, '2025-04-16 17:10:00', N'Thành công'),
(10, N'Thanh toán khi nhận hàng', 48400000, '2025-05-17 18:10:00', N'Thành công'),
(11, N'Thanh toán khi nhận hàng', 20000000, '2025-03-18 09:10:00', N'Thành công'),
(12, N'Thanh toán khi nhận hàng', 15300000, '2025-05-19 10:10:00', N'Thành công'),
(13, N'Thanh toán khi nhận hàng', 18860000, '2025-05-20 11:10:00', N'Thành công'),
(14, N'Thanh toán khi nhận hàng', 25235000, '2025-05-21 12:10:00', N'Thành công'),
(15, N'Thanh toán khi nhận hàng', 12675000, '2025-03-22 13:10:00', N'Thành công'),
(16, N'Thanh toán khi nhận hàng', 62540000, '2025-05-23 14:10:00', N'Thành công'),
(17, N'Thanh toán khi nhận hàng', 18500000, '2025-04-24 15:10:00', N'Thành công'),
(18, N'Thanh toán khi nhận hàng', 22000000, '2025-05-25 16:10:00', N'Thành công'),
(19, N'Thanh toán khi nhận hàng', 22500000, '2025-05-26 17:10:00', N'Thành công'),
(20, N'Thanh toán khi nhận hàng', 9860000, '2025-04-27 18:10:00', N'Thành công'),
(21, N'Thanh toán khi nhận hàng', 19500000, '2025-04-28 09:10:00', N'Thành công'),
(22, N'Thanh toán khi nhận hàng', 18600000, '2025-03-29 10:10:00', N'Thành công');





-- Insert data into danh_gia table (adjusted to match product types)
INSERT INTO [dbo].[danh_gia] ([ma_san_pham], [ma_khach_hang], [ngay_danh_gia], [so_sao], [noi_dung])
VALUES 
-- Chó
(1, 3, '2025-05-03 10:00:00', 5, N'Chó Alaska rất đẹp và khỏe mạnh, shop tư vấn nhiệt tình'),
(2, 5, '2025-05-14 09:00:00', 5, N'Chó Pug khỏe mạnh và thân thiện'),
(3, 6, '2025-05-15 14:00:00', 4, N'Chó Phốc Sóc nhỏ nhắn dễ thương'),
(5, 7, '2025-05-16 16:00:00', 5, N'Chó Corgi thông minh, dễ huấn luyện'),

-- Mèo
(4, 4, '2025-05-04 11:00:00', 4, N'Mèo Anh lông ngắn dễ thương nhưng hơi nhút nhát'),
(6, 6, '2025-05-17 10:00:00', 5, N'Mèo Munchkin đáng yêu, rất quấn người'),

-- Thức ăn
(7, 5, '2025-05-05 09:00:00', 5, N'Thức ăn cho chó chất lượng tốt, chó nhà mình rất thích'),
(8, 6, '2025-05-05 14:00:00', 4, N'Thức ăn cho mèo ngon nhưng giá hơi cao'),

-- Phụ kiện
(9, 7, '2025-05-07 16:00:00', 3, N'Balo tốt nhưng hơi nhỏ so với kích thước quảng cáo'),
(10, 8, '2025-05-08 10:00:00', 5, N'Vòng cổ rất đẹp, chất lượng tốt'),
(11, 9, '2025-05-09 11:00:00', 4, N'Dây dắt chắc chắn, dễ sử dụng'),
(12, 10, '2025-05-10 15:00:00', 5, N'Nhà gỗ đẹp, chó nhà mình rất thích'),
(13, 12, '2025-05-11 09:00:00', 4, N'Cát vệ sinh khử mùi tốt, giá hợp lý'),
(14, 3, '2025-05-12 10:00:00', 3, N'Bàn chải lông dùng tạm được, nên cải tiến phần tay cầm'),
(15, 4, '2025-05-13 11:00:00', 5, N'Áo len đẹp, vừa vặn với chó nhà mình');
