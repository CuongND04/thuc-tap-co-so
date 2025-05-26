import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Loader } from "lucide-react";
import { useSupplyStore } from "../../store/useSupplyStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageSupplies = () => {
  const { getAllSupplies, isGettingAllSupplies, deleteSupply } =
    useSupplyStore();
  const [supplies, setSupplies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInput = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      const deleted = await deleteSupply(id);
      if (deleted) {
        toast.success("Xóa nhà cung cấp thành công");
      } else {
        toast.error("Xóa nhà cung cấp thất bại");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xóa.");
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

  useEffect(() => {
    const fetchSupplies = async () => {
      const list = await getAllSupplies();
      setSupplies(list);
    };
    fetchSupplies();
  }, [isDeleting]);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "maNhaCungCap",
      key: "maNhaCungCap",
      width: "10%",
      sorter: (a, b) => a.maNhaCungCap - b.maNhaCungCap,
      ...getColumnSearchProps("maNhaCungCap"),
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
      width: "20%",
      sorter: (a, b) => a.ten.localeCompare(b.ten),
      ...getColumnSearchProps("ten"),
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
      width: "30%",
      sorter: (a, b) => a.diaChi?.localeCompare(b.diaChi),
      ...getColumnSearchProps("diaChi"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
      width: "20%",
      sorter: (a, b) => a.soDienThoai.localeCompare(b.soDienThoai),
      ...getColumnSearchProps("soDienThoai"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="default"
            className="text-blue-600 hover:text-blue-800 px-2 py-1 text-sm"
            onClick={() =>
              navigate(`/admin/suppliers/${record.maNhaCungCap}/detail`)
            }
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhà cung cấp này không?"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.maNhaCungCap)}
          >
            <Button
              danger
              className="text-red-600 hover:text-red-800 px-2 py-1 text-sm"
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (isGettingAllSupplies || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3">Quản lý nhà cung cấp</h1>
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div />
            <div className="flex items-center gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
                onClick={() => navigate(`/admin/suppliers/create`)}
              >
                <CirclePlus />
                Thêm
              </button>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={supplies}
            pagination={{ pageSize: 8 }}
            rowKey={(record) => record.maNhaCungCap}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSupplies;
