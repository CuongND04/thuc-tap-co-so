import React, { useEffect, useState } from "react";
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
const userMenu = [
  { label: "Trang cá nhân", path: "/trang-ca-nhan" },
  { label: "Đơn hàng của tôi", path: "/don-hang" },
  { label: "Danh sách yêu thích", path: "/yeu-thich" },
];

const Header = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [currentCart, setCurrentCart] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [isEditing, setIsEditing] = useState([]);
  const {
    checkAuth,
    authUser,
    logout,
    getProfile,
    isFetchingProfile,
    userProfile,
  } = useAuthStore();

  const { getAllCategories } = useCategoryStore();
  const { getCart, isGettingCart, updateItem } = useCartStore();
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

  const toggleCartOff = () => {
    setOpenCart(false);
  };

  const toggleEditing = (index) => {
    const edited = isEditing.map((val, i) => {
      if (i == index) return !val;
      else return val;
    });
    setIsEditing(edited);
  };

  const getEditingState = (index) => {
    return isEditing[index];
  };

  const updateRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { amount, index } = Object.fromEntries(formData);

    // console.log(amount, index);

    if (amount == currentCart.items[index].soLuong) {
      console.log("unchanged");
      return;
    } else {
      const res = await updateItem(
        userProfile.maNguoiDung,
        currentCart.items[index].maSanPham,
        amount
      );
      if (res) {
        const res2 = await getCart(userProfile.maNguoiDung);
        if (res2) {
          setCurrentCart(res2);
          console.log("changed");
        }
      }
    }

    toggleEditing(index);
  };

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCurrentProfile = async () => {
      const res = await getProfile();
      if (res) setCurrentUserProfile(res);
    };
    if (authUser) fetchCurrentProfile();
    // if (authUser && localStorage.getItem("userProfile")==null) fetchCurrentProfile();
    // else setCurrentUserProfile(localStorage.getItem("userProfile"));
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart(currentUserProfile.maNguoiDung);
      if (res) setCurrentCart(res);
    };
    if (currentUserProfile) fetchCart(); // Gọi hàm async bên trong useEffect
  }, [currentUserProfile]);

  useEffect(() => {
    if (currentCart) {
      setIsEditing(Array(currentCart.items.length).fill(false));
    }
  }, [currentCart]);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getAllCategories();
      setCategories(category);
    };
    fetchCategory(); // Gọi hàm async bên trong useEffect
  }, []);

  if (isGettingCart || isFetchingProfile) {
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
                              href={`/danh-muc-cun/${cat.tenDanhMuc}`}
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

                  {openCart && (
                    <div className="fixed mt-[5px] top-0 right-0 min-h-[100vh] w-[380px] border-[1px] border-solid border-[#cf72aa] z-150 bg-white rounded-[10px]">
                      <div className="text-center">
                        <button onClick={toggleCartOff}>
                          <i className="fa-regular fa-circle-xmark"></i>
                        </button>
                      </div>
                      <h2 className="m-[20px] text-center text-[#cf72aa] font-[500] text-[30px] text-shadow text-shadow-black text-shadow-[2px] font-[Coiny]">
                        Giỏ Hàng
                      </h2>
                      <ul className="mr-[10px] ml-[10px]">
                        {/* Danh sách sản phẩm trong giỏ hàng */}
                        {currentCart &&
                          currentCart.items.map((prod, index) => (
                            <form
                              key={index}
                              onSubmit={updateRequest}
                              className="flex justify-between items-center mb-[10px]"
                            >
                              <input
                                name="index"
                                className="hidden"
                                defaultValue={index}
                                readOnly={true}
                              />
                              <div className="w-[20%]">
                                <a href={`/san-pham/${prod.maSanPham}`}>
                                  <img
                                    width="75px"
                                    height="75px"
                                    src={prod.hinhAnh}
                                    alt="product"
                                  />
                                </a>
                              </div>
                              <div className="w-[60%] pl-[10px] pr-[10px]">
                                <a href={`/san-pham/${prod.maSanPham}`}>
                                  {prod.tenSanPham}
                                </a>
                                <p>
                                  {!getEditingState(index) && prod.soLuong}{" "}
                                  {getEditingState(index) && (
                                    <input
                                      className="rounded-[4px] h-[35px] w-[50px] pl-[10px] border-[1px] border-solid border-[#e5e5e5]"
                                      type="number"
                                      name="amount"
                                      id="amount"
                                      placeholder={prod.soLuong}
                                      min="1"
                                      defaultValue={prod.soLuong}
                                    />
                                  )}{" "}
                                  x {prod.giaBan}₫
                                </p>
                              </div>
                              <div className="w-[20%] flex justify-end">
                                {!getEditingState(index) && (
                                  <button
                                    onClick={() => toggleEditing(index)}
                                    className="cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                )}

                                {getEditingState(index) && (
                                  <button
                                    type="submit"
                                    className="cursor-pointer"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="size-6"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                )}

                                <button className="cursor-pointer">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="#ff0000"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </form>
                          ))}
                        {!currentCart && (
                          <p>Không có sản phẩm nào trong giỏ hàng.</p>
                        )}
                      </ul>
                      <h1 className="w-[100%] h-[36px] bg-[#de8ebe] text-white flex justify-center items-center font-[18px]">
                        Tổng tiền: {currentCart?.tongTien}₫
                      </h1>
                      <button className="w-[100%] h-[36px] font-[Coiny] font-medium bg-[#ccc] text-fff text-[18px] rounded-[1px] border-solid border-[#de8ebe]">
                        Thanh Toán
                      </button>
                    </div>
                  )}
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
