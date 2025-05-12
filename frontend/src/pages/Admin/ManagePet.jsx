import React, { useEffect, useState } from "react";
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
    name: "PHỐC SÓC BÉ XÍU CƯNG XĨU”",
    variants: "2 Variants",
    category: "PHỐC",
    price: "20.000.000₫",
    status: "Delivered",
    image: "/IMG/ThuCung/ThuCung01.jpg", // Replace with actual image URL
  },
  {
    id: 2,
    name: "POODLE VÀNG MƠ SIÊU CƯNG",
    variants: "1 Variant",
    category: "POODLE",
    price: "25.000.000₫",
    status: "Pending",
    image: "/IMG/ThuCung/ThuCung02.jpg", // Replace with actual image URL
  },
  {
    id: 3,
    name: "MÈO XÁM CHÂN NGẮN TAI CỤP SIÊU YÊU",
    variants: "2 Variants",
    category: "MÈO XÁM",
    price: "25.000.000₫",
    status: "Delivered",
    image: "/IMG/ThuCung/ThuCung03.jpg", // Replace with actual image URL
  },
  {
    id: 4,
    name: "HUSKY NÂU ĐỰC",
    variants: "2 Variants",
    category: "HUSKY",
    price: "25.000.000₫",
    status: "Canceled",
    image: "/IMG/ThuCung/ThuCung04.jpg", // Replace with actual image URL
  },
  {
    id: 5,
    name: "MÈO XÁM CHÂN NGẮN TAI CỤP SIÊU YÊU",
    variants: "1 Variant",
    category: "MÈO XÁM",
    price: "25.000.000₫",
    status: "Delivered",
    image: "/IMG/ThuCung/ThuCung05.jpg", // Replace with actual image URL
  },
];
import { useProductStore } from "../../store/useProductStore.js";
const ManagePet = () => {
  const { getAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getAllProducts();
      setProducts(product);
    };
    fetchProduct(); // Gọi hàm async bên trong useEffect
  }, []);
  console.log("products: ", products);
  return (
    <div className="">
      <div className="bg-white p-4 rounded-xl mb-10">
        <h1 className="text-3xl mb-2 font-medium p-3">Quản lý thú cưng</h1>
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
                      Category
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
                            product.status === "Delivered"
                              ? "bg-green-500 text-white"
                              : product.status === "Canceled"
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

export default ManagePet;
