import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/Admin/Table";
// Define the table data using the interface
const tableData = [
  {
    id: 1,
    name: "Vòng cổ chó mèo họa tiết xinh xắn",
    variants: "3 Variants",
    category: "Phụ kiện cổ",
    price: "150.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_01.jpg",
  },
  {
    id: 2,
    name: "Đồ chơi gặm răng hình xương",
    variants: "2 Variants",
    category: "Đồ chơi",
    price: "50.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_02.jpg",
  },
  {
    id: 3,
    name: "Lồng vận chuyển thú cưng size nhỏ",
    variants: "1 Variant",
    category: "Lồng vận chuyển",
    price: "300.000₫",
    status: "Out of stock",
    image: "/IMG/PhuKien/phukien1_03.jpg",
  },
  {
    id: 4,
    name: "Balo trong suốt cho mèo",
    variants: "2 Variants",
    category: "Balo thú cưng",
    price: "450.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_04.jpg",
  },
  {
    id: 5,
    name: "Nhà nệm êm ái cho chó mèo",
    variants: "3 Variants",
    category: "Giường nệm",
    price: "320.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_05.png",
  },
  {
    id: 6,
    name: "Bát ăn chống trượt cho chó",
    variants: "2 Variants",
    category: "Đồ ăn uống",
    price: "90.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_06.jpg",
  },
  {
    id: 7,
    name: "Bình nước mini cho mèo",
    variants: "1 Variant",
    category: "Đồ ăn uống",
    price: "120.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_07.jpeg",
  },
  {
    id: 8,
    name: "Bàn chải lông cho thú cưng",
    variants: "2 Variants",
    category: "Chăm sóc lông",
    price: "70.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_08.jpg",
  },
  {
    id: 9,
    name: "Sữa tắm khử mùi hương hoa",
    variants: "1 Variant",
    category: "Chăm sóc cơ thể",
    price: "110.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_09.jpg",
  },
  {
    id: 10,
    name: "Dây dắt tự cuộn tiện lợi",
    variants: "2 Variants",
    category: "Dây dắt",
    price: "160.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_10.jpeg",
  },
  {
    id: 11,
    name: "Cát vệ sinh hữu cơ cho mèo",
    variants: "1 Variant",
    category: "Vệ sinh",
    price: "180.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_11.jpeg",
  },
  {
    id: 12,
    name: "Thức ăn khô cho mèo vị cá ngừ",
    variants: "3 Variants",
    category: "Thức ăn",
    price: "220.000₫",
    status: "Available",
    image: "/IMG/PhuKien/phukien1_12.jpeg",
  },
];

const ManageAccessory = () => {
  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3">Quản lý phụ kiện</h1>
        <div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  {/* Recent Orders */}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                  <svg
                    className="stroke-current fill-white dark:fill-gray-800"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.29004 5.90393H17.7067"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.7075 14.0961H2.29085"
                      stroke=""
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                      fill=""
                      stroke=""
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                      fill=""
                      stroke=""
                      strokeWidth="1.5"
                    />
                  </svg>
                  Filter
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                  See all
                </button>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Products
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Price
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {tableData.map((product) => (
                    <TableRow key={product.id} className="">
                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                            <img
                              src={product.image}
                              className="h-[50px] w-[50px]"
                              alt={product.name}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {product.name}
                            </p>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                              {product.variants}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.price}
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.category}
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                            product.status === "Available"
                              ? "bg-green-500 text-white"
                              : product.status === "Out of stock"
                              ? "bg-red-500 text-white"
                              : "bg-gray-300 text-gray-800"
                          }`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAccessory;
