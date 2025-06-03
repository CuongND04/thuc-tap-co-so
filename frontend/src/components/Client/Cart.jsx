import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

const Cart = ({ setOpenCart }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState([]);
  const [deletingItems, setDeletingItems] = useState([]);
  const {
    userCart,
    getCart,
    isGettingCart,
    updateItem,
    deleteItem,
    isUpdating,
    isDeleting,
    isAdding,
  } = useCartStore();
  const {
    checkAuth,
    authUser,
    logout,
    getProfile,
    isFetchingProfile,
    userProfile,
  } = useAuthStore();

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart(userProfile.maNguoiDung);
    };
    if (userProfile) fetchCart(); // Gọi hàm async bên trong useEffect
  }, [isUpdating, isDeleting, isAdding, userProfile]);
  const toggleCartOff = () => {
    setOpenCart(false);
  };
  useEffect(() => {
    if (userCart) {
      setIsEditing(Array(userCart.items.length).fill(false));
    }
  }, [userCart]);
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

    if (amount == userCart.items[index].soLuong) {
      console.log("unchanged");
      return;
    } else {
      const res = await updateItem(
        userProfile.maNguoiDung,
        userCart.items[index].maSanPham,
        amount
      );
      if (res) {
        const res2 = await getCart(userProfile.maNguoiDung);
      }
    }

    toggleEditing(index);
  };

  const deleteHandler = async (index=-1, item=null) => {
      if(index!=-1)
      {
        const res = await deleteItem(
        userProfile.maNguoiDung,
        userCart.items[index].maSanPham
      );
      }
      else if(item)
      {
        const res = await deleteItem(
        userProfile.maNguoiDung,
        item.maSanPham
      );
      }
  };

  const deleteAll = async () => {
    if(userCart)
    {
      setDeletingItems([]);
      setDeletingItems(userCart.items);
      deletingItems.map((item) => deleteHandler(-1, item));
    }
  }

  const handleBuy = () => {
    navigate("/thanh-toan", {state: userCart});
  }
  return (
    <div>
      <div className="fixed mt-[5px] top-0 right-0 min-h-[100vh] w-[380px] border-[1px] border-solid border-[#cf72aa] z-150 bg-white rounded-[10px]">
        <div className="text-center">
          <button onClick={toggleCartOff}>
            <i className="fa-regular fa-circle-xmark"></i>
          </button>
        </div>
        <h2 className="m-[20px] text-center text-[#cf72aa] font-[500] text-[30px] text-shadow text-shadow-black text-shadow-[2px] font-[Coiny]">
          Giỏ Hàng
        </h2>
        <button
          className="cursor-pointer flex items-center justify-center justify-self-end-safe rounded-md border-1 mr-1"
          type="button"
          onClick={() => deleteAll()}
        >
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
          Xoá tất cả
        </button>
        <ul className="mr-[10px] ml-[10px]">
          {/* Danh sách sản phẩm trong giỏ hàng */}
          {userCart &&
            userCart.items.map((prod, index) => (
              <form
                key={prod.maSanPham}
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
                  <a href={`/san-pham/${prod.maSanPham}`}>{prod.tenSanPham}</a>
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
                    x{" "}
                    {prod.giaBan?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                  </p>
                </div>
                <div className="w-[20%] flex justify-end">
                  {/* Cancel btn */}
                  {getEditingState(index) && (
                    <button
                      onClick={() => toggleEditing(index)}
                      className="cursor-pointer"
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
                  )}
                  {/* Edit btn */}
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
                      // onClick={() => toggleEditing(index)}
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

                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => deleteHandler(index)}
                  >
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
          {!userCart && <p>Không có sản phẩm nào trong giỏ hàng.</p>}
        </ul>
        <h1 className="w-[100%] h-[36px] bg-[#de8ebe] text-white flex justify-center items-center font-[18px]">
          Tổng tiền:{" "}
          {userCart?.tongTien.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
        </h1>
        <button className="w-[100%] h-[36px] font-[Coiny] font-medium bg-[#ccc] text-fff text-[18px] rounded-[1px] border-solid border-[#de8ebe] cursor-pointer" onClick={handleBuy}>
          Thanh Toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
