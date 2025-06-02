import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button, Popconfirm, Badge } from "antd";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Link, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSaleOrdersStore } from "../../store/useSaleOrdersStore";

const SalesOrders = () => {
  const { getAllSaleOrders, isGettingAllSaleOrders, deleteSaleOrder } =
    useSaleOrdersStore();
  const [donHang, setDonHang] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInput = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (maDonHang) => {
    try {
      setIsDeleting(true);

      const dele = await deleteSaleOrder(maDonHang);

      // if (dele) {
      //   // toast.success("Xóa đơn bán hàng thành công");
      // } else {
      //   // console.log("Xóa đơn bán hàng thất bại");
      // }
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
      const listOrders = await getAllSaleOrders();
      setDonHang(listOrders);
    };
    fetchData();
  }, [isDeleting]);

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "maDonHang",
      key: "maDonHang",
      sorter: (a, b) => a.maDonHang - b.maDonHang,
      ...getColumnSearchProps("maDonHang"),
    },
    // {
    //   title: "Mã khách hàng",
    //   dataIndex: "maKhachHang",
    //   key: "maKhachHang",
    //   sorter: (a, b) => a.maKhachHang - b.maKhachHang,
    //   ...getColumnSearchProps("maKhachHang"),
    // },
    {
      title: "Ngày đặt hàng",
      dataIndex: "ngayDatHang",
      key: "ngayDatHang",
      sorter: (a, b) => new Date(...a.ngayDatHang) - new Date(...b.ngayDatHang),
      render: formatDateTime,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongTien",
      key: "tongTien",
      sorter: (a, b) => a.tongTien - b.tongTien,
      render: (value) => value.toLocaleString("vi-VN") + " đ",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThaiDonHang",
      key: "trangThaiDonHang",
      ...getColumnSearchProps("trangThaiDonHang"),
      render: (status) => {
        let color;
        switch (status) {
          case "Đã giao":
            color = "green";
            break;
          case "Đang giao":
            color = "blue";
            break;
          case "Đang xử lý":
            color = "orange";
            break;
          default:
            color = "default";
        }
        return <Badge color={color} text={status} />;
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            onClick={() => navigate(`/admin/sales/detail/${record.maDonHang}`)}
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa đơn hàng này?"
            onConfirm={() => handleDelete(record.maDonHang)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button icon={<DeleteOutlined />} size="small" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isGettingAllSaleOrders || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3 ">Quản lý bán hàng</h1>
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
                  onClick={() => navigate(`/admin/sales/create`)}
                >
                  <CirclePlus />
                  Thêm
                </button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={donHang}
              pagination={{ pageSize: 8 }}
              rowKey={(record) => record.id || record._id || record.key}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrders;
