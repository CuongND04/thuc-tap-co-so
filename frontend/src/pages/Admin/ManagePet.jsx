import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/Admin/Table";

import { useProductStore } from "../../store/useProductStore.js";
const ManagePet = () => {
  const { getAllProducts, isGettingAllProducts } = useProductStore();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getAllProducts();
      setProducts(product);
    };
    fetchProduct(); // Gọi hàm async bên trong useEffect
  }, []);

  if (isGettingAllProducts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  console.log("products: ", products);
  const filteredProducts = products.filter((product) => {
    const name = product.tenDanhMuc.toLowerCase();
    return name.startsWith("chó") || name.startsWith("mèo");
  });
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
                      Mã số
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Sản phẩm
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Giá tiền
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Mô tả
                    </TableCell>
                    <TableCell
                      isHeader
                      className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Hành động
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}

                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredProducts.map((product) => (
                    <TableRow key={product.maSanPham} className="">
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.maSanPham}
                      </TableCell>

                      <TableCell className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                            <img
                              src={product.hinhAnh}
                              className="h-[50px] w-[50px]"
                              alt={product.tenSanPham}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {product.tenSanPham}
                            </p>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                              {product.tenDanhMuc}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.giaBan.toLocaleString("vi-VN")} ₫
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {product.moTa}
                      </TableCell>
                      <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Link
                          to={`/admin/pet/${product.maSanPham}/detail`}
                          className=" text-blue-500 hover:underline text-sm font-medium"
                        >
                          Xem chi tiết
                        </Link>
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
