import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
// **TODO: xóa bớt một cái header không dùng đi
const images = [
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu09.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu10.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu11.jpg?raw=true",
  "https://github.com/DoanQuocHuy2308/MatPetFamiLy/blob/master/IMG/TrangChu/TrangChu12.jpg?raw=true",
];

const menu1 = [
  "Chó Alaska Malamute",
  "Chó Beagle",
  "Chó Corgi",
  "Chó Golden Retriever",
  "Chó Husky Siberian",
  "Chó Phốc Sóc – Pomeranian",
  "Chó Poodle",
  "Chó Pug",
  "Chó Samoyed",
  "Mèo Anh (Dài + Ngắn)",
  "Mèo Chân Ngắn",
  "Mèo Tai Cụp",
];

const menu2 = ["Đấu giá thú cưng - Từ thiện"];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const authUser = useAuthStore((state) => state.authUser);
  const logout = useAuthStore((state) => state.logout);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const comeback = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // const loggingOut = () => {
  //   if (checkAuth) {
  //   logout;
  //   } else {
  //     console.log("User is not logged in!");
  //   }
  // };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
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
        <div className="w-300 grid grid-rows-2 -gap-y-100">
          <nav className="mt-5 -ml-30 h-10 w-full flex justify-center">
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
                    {menu1.map((item) => (
                      <div
                        key={item}
                        className="group relative flex items-center gap-x-6 rounded-lg p-1 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a
                            href={`/danh-muc-cun/${item}`}
                            className="block font-semibold text-gray-900"
                          >
                            {item}
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

              <Popover className="relative">
                <PopoverButton className="flex items-center text-lg font-semibold text-gray-900 hover:text-[#de8ebe]/87 duration-200">
                  Dịch vụ
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
                    {menu2.map((item) => (
                      <div
                        key={item}
                        className="group relative flex items-center gap-x-6 rounded-lg p-1 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex-auto">
                          <a
                            href={`/danh-muc-cun/${item}`}
                            className="block font-semibold text-gray-900"
                          >
                            {item}
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
                Giới thiệu
              </a>
              <a
                href="#"
                className="text-lg font-semibold text-gray-900 hover:text-[#de83be]"
              >
                Liên hệ
              </a>
              {/* Login components */}
              {checkAuth}
              {authUser && (
                <p className="text-lg font-semibold text-gray-900">
                  Chào mừng, {authUser.hoTen}!{" "}
                  <button onClick={logout} className="hover:text-[#de83be]">
                    Đăng xuất
                  </button>
                </p>
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

          <div className="-ml-70 flex h-auto justify-center">
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
            <form className="mt-5 ml-40">
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
                  className="visible peer-placeholder-shown:invisible"
                >
                  X
                </button>
                <div className="grid grid-cols-1 shrink-0 focus-within:relative">
                  <select
                    id="category"
                    name="category"
                    aria-label="Currency"
                    className="col-start-1 row-start-1 appearance-none rounded-md cursor-pointer py-1.5 pr-7 pl-3 text-base placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#de8ebe]"
                  >
                    <option>Tất cả danh mục</option>
                    <option>Chó</option>
                    <option>Mèo</option>
                    <option>Phụ kiện</option>
                    <option>Thức ăn</option>
                    <option>Dịch vụ</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
                <button type="submit" className="bg-[#de8ebe] text-white shrink-0 w-20 h-10 cursor-pointer rounded-r-md tracking-wide">
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
