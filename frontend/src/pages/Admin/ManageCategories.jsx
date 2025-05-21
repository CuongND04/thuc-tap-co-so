import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Space, Button, Popconfirm } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { CirclePlus, Link, Loader } from "lucide-react";
import { useCategoryStore } from "../../store/useCategoryStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageCategories = () => {
  const { getAllCategories, isGettingAllCategories, deleteCategory } =
    useCategoryStore();
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const searchInput = useRef(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);

      const dele = await deleteCategory(id);

      if (dele) {
        toast.success("Xóa danh mục thành công");
      } else {
        console.log("Xóa danh mục thất bại");
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
        thu_cung: "Thú cưng",
        phu_kien: "Phụ kiện",
      };
      return map[text] || text;
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const listCate = await getAllCategories();
      setCategories(listCate);
    };
    fetchCategories();
  }, [isDeleting]);

  const columns = [
    {
      title: "Mã số",
      dataIndex: "maDanhMuc",
      key: "maDanhMuc",
      width: "10%",
      sorter: (a, b) => a.maDanhMuc - b.maDanhMuc,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("maDanhMuc"),
    },
    {
      title: "Tên danh mục",
      dataIndex: "tenDanhMuc",
      key: "tenDanhMuc",
      width: "20%",
      sorter: (a, b) => a.tenDanhMuc.localeCompare(b.tenDanhMuc),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("tenDanhMuc"),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      width: "40%",
      sorter: (a, b) => a.moTa?.localeCompare(b.moTa),
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("moTa"),
    },
    {
      title: "Kiểu",
      dataIndex: "kieu",
      key: "kieu",
      width: "20%",
      sorter: (a, b) => a.kieu.localeCompare(b.kieu),
      sortDirections: ["ascend", "descend"],
      ...getColumnSelectProps("kieu", [
        { label: "Thú cưng", value: "thu_cung" },
        { label: "Phụ kiện", value: "phu_kien" },
      ]),
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
              navigate(`/admin/categories/${record.maDanhMuc}/detail`)
            }
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này không?"
            description="Hành động này sẽ không thể hoàn tác"
            okText="Xóa"
            cancelText="Hủy"
            onConfirm={() => handleDelete(record.maDanhMuc)}
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

  if (isGettingAllCategories || isDeleting) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3 ">Quản lý danh mục</h1>
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
                  onClick={() => navigate(`/admin/categories/create`)}
                >
                  <CirclePlus />
                  Thêm
                </button>
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={categories}
              pagination={{ pageSize: 8 }}
              rowKey={(record) => record.id || record._id || record.key}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
