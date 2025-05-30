import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button, Popconfirm } from "antd";
import { DeleteOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Link, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAccountStore } from "../../store/useAccountStore";

const SaleOrders = () => {
  const { getAllAccounts, isGettingAllAccounts, deleteAccount } =
    useAccountStore();
  const [accounts, setAccounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInput = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);

      const dele = await deleteAccount(id);

      if (dele) {
        toast.success("Xóa tài khoản thành công");
      } else {
        console.log("Xóa tài khoản thất bại");
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

  const getColumnSelectProps = (dataIndex, options) => ({
    filters: options.map((opt) => ({ text: opt.label, value: opt.value })),
    onFilter: (value, record) => record[dataIndex] === value,
    render: (text) => {
      const map = {
        ADMIN: "Quản trị viên",
        CUSTOMER: "Khách hàng",
      };
      return map[text] || text;
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const listAcc = await getAllAccounts();
      setAccounts(listAcc);
    };
    fetchData();
  }, [isDeleting]);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      width: "10%",
      sorter: (a, b) => a.maNguoiDung - b.maNguoiDung,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("maNguoiDung"),
    },
    {
      title: "Ảnh đại diện",
      key: "avatar",

      render: (_, record) => (
        <Space>
          <img
            src={record.avatar}
            alt={record.tenDangNhap}
            style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        </Space>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "20%",
      sorter: (a, b) => a.hoTen.localeCompare(b.hoTen),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "tenDangNhap",
      key: "tenDangNhap",
      width: "20%",
      sorter: (a, b) => a.tenDangNhap.localeCompare(b.tenDangNhap),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("tenDangNhap"),
    },

    {
      title: "Quyền truy cập",
      dataIndex: "quyenTruyCap",
      key: "quyenTruyCap",
      width: "20%",
      sorter: (a, b) => a.quyenTruyCap.localeCompare(b.quyenTruyCap),
      sortDirections: ["ascend", "descend"],
      ...getColumnSelectProps("quyenTruyCap", [
        { label: "Quản trị viên", value: "ADMIN" },
        { label: "Khách hàng", value: "CUSTOMER" },
      ]),
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
              navigate(`/admin/users/${record.maNguoiDung}/detail`)
            }
          >
            Xem
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa tài khoản này không?"
            onConfirm={() => handleDelete(record.maNguoiDung)}
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

  if (isGettingAllAccounts || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3 ">Quản lý tài khoản</h1>
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
                  onClick={() => navigate(`/admin/users/create`)}
                >
                  <CirclePlus />
                  Thêm
                </button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={accounts}
              pagination={{ pageSize: 8 }}
              rowKey={(record) => record.id || record._id || record.key}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleOrders;
