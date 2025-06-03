import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { useAuthStore } from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore.js";
import { useCategoryStore } from "../../store/useCategoryStore.js";
import Cart from "./Cart.jsx";

// **TODO: xóa bớt một cái header không dùng đi
const images = [
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu09.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu10.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu11.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu12.jpg?raw=true",
];

const userMenu = [
  { label: "Trang cá nhân", path: "/trang-ca-nhan" },
  { label: "Đơn hàng của tôi", path: "/don-hang" },
  { label: "Danh sách yêu thích", path: "/yeu-thich" },
];

const Header = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openCart, setOpenCart] = useState(false);

  const {
    checkAuth,
    authUser,
    logout,
    getProfile,
    isFetchingProfile,
    userProfile,
  } = useAuthStore();

  const { getAllCategories } = useCategoryStore();

  const [categories, setCategories] = useState([]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const comeback = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  const toggleCart = () => {
    setOpenCart(!openCart);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { keyword, category } = Object.fromEntries(formData);
    if (keyword) {
      if (category == "Tất cả danh mục")
        navigate(`/danh-muc-san-pham`, { state: keyword });
      else navigate(`/danh-muc-san-pham/${category}`, { state: keyword });
    } else console.log("keyword is empty");
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCurrentProfile = async () => {
      const res = await getProfile();
    };
    if (authUser) fetchCurrentProfile();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getAllCategories();
      setCategories(category);
    };
    fetchCategory(); // Gọi hàm async bên trong useEffect
  }, []);

  if (isFetchingProfile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  // console.log("currentUserProfile: ", currentUserProfile);

  return (
    <div className="flex justify-center items-center">
      <header className="flex justify-center">
        {/* Logo Space */}
        <div>
          <a href="/" className="">
            <img
              alt="logo"
              src="https://raw.githubusercontent.com/DoanQuocHuy2308/MatPetFamiLy/refs/heads/master/IMG/TrangChu/TrangChu08.png"
              className="h-auto w-auto"
            />
          </a>
        </div>

        {/* Navigation Bar */}
        <div className="w-[900px] grid grid-rows-2 ">
          <nav className="mt-5 h-10 w-full flex justify-center">
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <a
                href="/"
                className="block relative w-30 h-8 font-semibold bg-[#de8ebe] text-white uppercase text-lg text-center place-content-center tracking-wide rounded-md hover:text-white hover:bg-[#de8ebe]/87 duration-200"
              >
                Trang chủ
              </a>

              <Popover className="relative">
                <PopoverButton className="flex items-center text-lg font-semibold text-gray-900 hover:text-[#de8ebe]/87 duration-200">
                  Thú cưng
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="size-5 flex-none text-gray-400"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute top-full -left-8 z-10 w-50 max-w-md overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="p-4">
                    {categories &&
                      categories.map((cat) => (
                        <div
                          key={cat.maDanhMuc}
                          className="group relative flex items-center gap-x-6 rounded-lg p-1 text-sm/6 hover:bg-gray-50"
                        >
                          <div className="flex-auto">
                            <a
                              href={`/danh-muc-san-pham/${cat.tenDanhMuc}`}
                              className="block font-semibold text-gray-900"
                            >
                              {cat.tenDanhMuc}
                              <span className="absolute inset-0" />
                            </a>
                          </div>
                        </div>
                      ))}
                  </div>
                </PopoverPanel>
              </Popover>

              <a
                href="#"
                className="text-lg font-semibold text-gray-900 hover:text-[#de83be]"
              >
                Phụ kiện
              </a>

              <a
                href={`gioi-thieu`}
                className="text-lg font-semibold text-gray-900 hover:text-[#de83be]"
              >
                Giới thiệu
              </a>
              <a
                href={`lien-he`}
                className="text-lg font-semibold text-gray-900 hover:text-[#de83be]"
              >
                Liên hệ
              </a>

              {/* Login components */}
              {checkAuth}
              {authUser && (
                <>
                  <div className="inline-flex items-center">
                    <div className="mt-[6px] mb-[10px] ml-[10px] rounded-[50%] w-[50px] h-[50px] flex justify-center items-center bg-[#de8ebe]">
                      <div className="rounded-[50%] border-[1px] border-white border-dotted bg-[#cf72aa]">
                        <button
                          type="button"
                          onClick={toggleCart}
                          className="bg-transparent border-0 w-[45px] h-[45px] text-[30px] group/btn1"
                        >
                          <i className="fa-solid fa-bag-shopping fa-fw text-white group-hover/btn1:text-[#de8ebe]"></i>
                        </button>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-gray-900 ml-5">
                      {/* Chào mừng, {authUser.hoTen}!{" "}
                  <button onClick={logout} className="hover:text-[#de83be]">
                    Đăng xuất
                  </button> */}
                      <Popover className="relative">
                        <PopoverButton className="flex items-center text-lg font-semibold text-gray-900 hover:text-[#de8ebe]/87 duration-200">
                          <img
                            src={userProfile?.avatar}
                            alt="profile image"
                            className="object-cover size-12 overflow-hidden rounded-full"
                          />
                        </PopoverButton>

                        <PopoverPanel
                          transition
                          className="absolute top-full -left-8 z-10 w-60 max-w-md overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                        >
                          <div className="p-4">
                            {userMenu.map((item) => (
                              <div
                                key={item.path}
                                className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm/6 hover:bg-gray-50"
                              >
                                <div className="flex-auto">
                                  <a
                                    href={item.path}
                                    className="block font-semibold text-gray-900"
                                  >
                                    {item.label}
                                    <span className="absolute inset-0" />
                                  </a>
                                </div>
                              </div>
                            ))}
                            {/* Đăng xuất */}
                            <div className="mt-2 border-t pt-2">
                              <button
                                onClick={logout}
                                className="w-full text-left font-semibold text-gray-900 hover:text-[#de83be] px-2 py-1 text-sm/6"
                              >
                                Đăng xuất
                              </button>
                            </div>
                          </div>
                        </PopoverPanel>
                      </Popover>
                    </p>
                  </div>

                  {openCart && <Cart setOpenCart={setOpenCart} />}
                </>
              )}

              {!authUser && (
                <p className="text-lg font-semibold text-gray-900">
                  <a
                    href="/dang-nhap"
                    className="pr-1 text-lg font-semibold text-gray-900 hover:text-[#de83be]"
                  >
                    Đăng nhập
                  </a>
                  /
                  <a
                    href="/dang-ky"
                    className="pl-1  text-lg font-semibold text-gray-900 hover:text-[#de83be]"
                  >
                    Đăng ký
                  </a>
                </p>
              )}
            </PopoverGroup>
          </nav>

          {/* Scrolling Frame */}

          <div className=" flex h-auto justify-center">
            <div className="-mt-23">
              <img
                className="w-[768px] h-[267.15px] rounded-3xl"
                src={images[currentIndex]}
                alt="Slider"
              />
              <div className="flex justify-between bg-transparent">
                <button
                  className="-ml-[30px] -mt-37 h-full cursor-pointer pointers-events-auto border-2 border-gray-900 hover:border-[#de8ebe] rounded-md"
                  onClick={comeback}
                >
                  <ChevronLeftIcon className="w-5 h-5 fill-gray-900 hover:fill-[#de8ebe]" />
                </button>
                <button
                  className="-mr-[30px] -mt-37 h-full cursor-pointer pointers-events-auto border-2 border-gray-900 hover:border-[#de8ebe] rounded-md"
                  onClick={next}
                >
                  <ChevronRightIcon className="w-5 h-5 fill-gray-900 hover:fill-[#de8ebe]" />
                </button>
              </div>
            </div>
          </div>

          {/* Seaching Bar */}

          <div>
            <form className="mt-5 ml-40" onSubmit={handleSearch}>
              <div className="flex w-150 items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-black has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#de8ebe]">
                <MagnifyingGlassIcon className="w-5 h-5" />
                <input
                  id="keyword"
                  name="keyword"
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="peer py-1.5 pr-3 pl-1 grow text-base text-gray-900 placeholder:text-gray-400 focus:outline-none "
                />
                <button
                  type="reset"
                  className="visible peer-placeholder-shown:invisible cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#ff0000"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="grid grid-cols-1 shrink-0 focus-within:relative">
                  <select
                    id="category"
                    name="category"
                    aria-label="Currency"
                    className="col-start-1 row-start-1 appearance-none rounded-md cursor-pointer py-1.5 pr-7 pl-3 text-base placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#de8ebe]"
                  >
                    <option>Tất cả danh mục</option>
                    {categories &&
                      categories.map((cat) => (
                        <option key={cat.maDanhMuc}>{cat.tenDanhMuc}</option>
                      ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#de8ebe] text-white shrink-0 w-20 h-10 cursor-pointer rounded-r-md tracking-wide"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
