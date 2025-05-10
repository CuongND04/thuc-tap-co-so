import {
  BellOutlined,
  DoubleLeftOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
export const Header = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div>
      <header className=" z-10 flex h-[60px] items-center justify-between bg-white px-4 shadow-md transition-colors dark:bg-slate-900 !border-b-0">
        <div className="flex items-center gap-x-3">
          <button
            className="btn-ghost size-10"
            onClick={() => setCollapsed(!collapsed)}
          >
            <DoubleLeftOutlined className={collapsed && "rotate-180"} />
          </button>
          <div className="hidden h-10 flex-shrink-0 items-center gap-x-2 rounded-lg border border-slate-300 px-2 text-base text-slate-900 transition-colors has-[input:focus]:border-blue-500 md:flex md:w-auto lg:w-80 dark:border-slate-700 dark:text-slate-50 dark:focus:border-blue-600">
            <SearchOutlined size={20} className="text-slate-300" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search..."
              className="w-full bg-transparent text-slate-900 outline-0 placeholder:text-slate-300 dark:text-slate-50"
            />
          </div>
        </div>
        <div className="flex gap-x-3">
          <button className="btn-ghost size-10">
            <BellOutlined size={20} />
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              className="size-10 overflow-hidden rounded-full"
              onClick={() => setOpen(!open)}
            >
              <img
                src={"https://i.pravatar.cc/300"}
                alt="profile image"
                className="size-full object-cover"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-2xl   z-50">
                <ul className="py-1 text-sm ">
                  <li>
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 !text-gray-700"
                    >
                      <UserOutlined />
                      Hồ sơ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 !text-gray-700"
                    >
                      <SettingOutlined />
                      Cài đặt
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/logout"
                      className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 !text-gray-700"
                    >
                      <LogoutOutlined />
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
