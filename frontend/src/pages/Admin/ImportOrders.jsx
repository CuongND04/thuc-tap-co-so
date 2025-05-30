import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Link, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useImportOrderStore } from "../../store/useImportOrderStore";

const ImportOrders = () => {
  const { getAllCungCap, isGettingAllCungCap, deleteCungCap } =
    useImportOrderStore();
  const [nhapHang, setNhapHang] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInput = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (maNhaCungCap, maSanPham) => {
    try {
      setIsDeleting(true);

      const dele = await deleteCungCap(maNhaCungCap, maSanPham);

      if (dele) {
        toast.success("Xóa đơn nhập hàng thành công");
      } else {
        console.log("Xóa đơn nhập hàng thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const formatDateTime = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 5)
      return "Không xác định";
    const [year, month, day, hour, minute, second = 0] = dateArray;
    return (
      `${String(day).padStart(2, "0")}/${String(month).padStart(
        2,
        "0"
      )}/${year} ` +
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}:${String(second).padStart(2, "0")}`
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Tìm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xoá
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Lọc
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Đóng
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text?.toString() || ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    const fetchData = async () => {
      const listAcc = await getAllCungCap();
      setNhapHang(listAcc);
    };
    fetchData();
  }, [isDeleting]);

  const columns = [
    // {
    //   title: "Mã NCC",
    //   dataIndex: "maNhaCungCap",
    //   key: "maNhaCungCap",
    //   width: "10%",
    //   sorter: (a, b) => a.maNhaCungCap - b.maNhaCungCap,
    //   sortDirections: ["ascend", "descend"],
    //   ...getColumnSearchProps("maNhaCungCap"),
    // },
    {
      title: "Tên nhà cung cấp",
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
      width: "20%",
      sorter: (a, b) => a.tenNhaCungCap.localeCompare(b.tenNhaCungCap),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("tenNhaCungCap"),
    },
    // {
    //   title: "Mã SP",
    //   dataIndex: "maSanPham",
    //   key: "maSanPham",
    //   width: "10%",
    //   sorter: (a, b) => a.maSanPham - b.maSanPham,
    //   sortDirections: ["ascend", "descend"],
    //   ...getColumnSearchProps("maSanPham"),
    // },
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      key: "tenSanPham",
      width: "20%",
      sorter: (a, b) => a.tenSanPham.localeCompare(b.tenSanPham),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("tenSanPham"),
    },
    {
      title: "Giá cung cấp",
      dataIndex: "giaCungCap",
      key: "giaCungCap",
      width: "15%",
      sorter: (a, b) => a.giaCungCap - b.giaCungCap,
      sortDirections: ["ascend", "descend"],
      render: (value) => value.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      width: "10%",
      sorter: (a, b) => a.soLuong - b.soLuong,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Ngày cung cấp",
      dataIndex: "ngayCungCap",
      key: "ngayCungCap",
      width: "15%",
      sorter: (a, b) => new Date(...a.ngayCungCap) - new Date(...b.ngayCungCap),
      sortDirections: ["ascend", "descend"],
      render: formatDateTime,
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() =>
              navigate(
                `/admin/import/detail/${record.maNhaCungCap}/${record.maSanPham}`
              )
            }
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa bản ghi cung cấp này?"
            onConfirm={() =>
              handleDelete(record.maNhaCungCap, record.maSanPham)
            }
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

  if (isGettingAllCungCap || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3 ">Quản lý nhập hàng</h1>
        <div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {/* Recent Orders */}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  onClick={() => navigate(`/admin/import/create`)}
                >
                  <CirclePlus />
                  Thêm
                </button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={nhapHang}
              pagination={{ pageSize: 8 }}
              rowKey={(record) => record.id || record._id || record.key}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportOrders;
