import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Space,
  Button,
  Popconfirm,
  Select,
  Typography,
} from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useProductStore } from "../../store/useProductStore";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const ManagePet = () => {
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  // Lọc theo thú cưng (chó/mèo) + tên sản phẩm
  const filteredProducts = products.filter((product) => {
    const nameMatch = product.tenSanPham
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const isPet =
      product.tenDanhMuc.toLowerCase().startsWith("chó") ||
      product.tenDanhMuc.toLowerCase().startsWith("mèo");

    const categoryMatch =
      filterCategory === "all" ||
      product.tenDanhMuc.toLowerCase().startsWith(filterCategory);

    return nameMatch && isPet && categoryMatch;
  });

  const handleDelete = (id) => {
    // TODO: Gọi API xóa nếu có backend
    setProducts((prev) => prev.filter((p) => p.maSanPham !== id));
  };

  const handleReset = () => {
    setSearchText("");
    setFilterCategory("all");
  };

  const columns = [
    {
      title: "Mã số",
      width: 100,
      dataIndex: "maSanPham",
      key: "maSanPham",
      sorter: (a, b) => a.maSanPham - b.maSanPham,
      render: (text) => `#${text}`,
    },
    {
      title: "Sản phẩm",
      key: "tenSanPham",
      sorter: (a, b) =>
        a.tenSanPham.localeCompare(b.tenSanPham, "vi", {
          sensitivity: "base",
        }),
      render: (_, record) => (
        <Space>
          <img
            src={record.hinhAnh}
            alt={record.tenSanPham}
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.tenSanPham}</div>
            <div style={{ color: "#888" }}>{record.tenDanhMuc}</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Giá tiền",
      dataIndex: "giaBan",
      key: "giaBan",
      sorter: (a, b) => a.giaBan - b.giaBan,
      render: (gia) => `${gia.toLocaleString("vi-VN")} ₫`,
      width: 130,
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      ellipsis: true,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/admin/pet/${record.maSanPham}/detail`)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa thú cưng này không?"
            onConfirm={() => handleDelete(record.maSanPham)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
      width: 180,
    },
  ];

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3 ">Quản lý thú cưng</h1>
        <div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <Space
                style={{
                  marginBottom: 16,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <Input
                  placeholder="Tìm kiếm theo tên..."
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                  style={{ width: 240 }}
                />
                <Select
                  value={filterCategory}
                  onChange={setFilterCategory}
                  style={{ width: 160 }}
                >
                  <Option value="all">Tất cả</Option>
                  <Option value="chó">Chó</Option>
                  <Option value="mèo">Mèo</Option>
                </Select>
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  Đặt lại
                </Button>
              </Space>
            </div>
            <Table
              columns={columns}
              dataSource={filteredProducts}
              loading={isGettingAllProducts}
              rowKey="maSanPham"
              pagination={{ pageSize: 6 }}
              bordered
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagePet;
