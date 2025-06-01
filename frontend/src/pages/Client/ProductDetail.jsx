import { React, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
// import "./Detail.css";
import { useProductStore } from "../../store/useProductStore";
import CategoryList from "../../components/Client/CategoryList";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";

function ProductDetail() {
  const { getDetailProduct, isGettingDetailProduct } = useProductStore();
  const {
    userProfile,
    isCheckingAuth,
    favors,
    addToFavorites,
    isAdding,
    removeFromFavorites,
  } = useAuthStore();
  // const { ,  } = useCartStore();
  // console.log("favors ProductDetail: ", favors);
  const { userCart, addItem } = useCartStore();
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      console.log(data);
      if (data) {
        setProduct(data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      console.log(data);
      if (data) {
        setProduct(data);
      }
    };
    fetchData();
  }, []);

  const inStock = () => {
    if (product) {
      if (product.soLuongTonKho > 0) return true;
      else if (product.soLuongPhuKien > 0) return true;
    } else return false;
  };

  const addToCart = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    var { amount } = Object.fromEntries(formData);
    amount = amount || 1;

    console.log(userCart.maGioHang, product.maSanPham, amount);
    addItem(userCart.maGioHang, product.maSanPham, amount);
  };
  const isFavorite = favors.some((sp) => sp.maSanPham === product.maSanPham);

  const handleToggleFavorite = async (e) => {
    e.preventDefault(); // Ngăn load lại trang khi click <a>
    if (!userProfile) {
      toast.error("Bạn cần đăng nhập để thao tác");
      return;
    }
    if (isFavorite) {
      // Đã yêu thích => xóa yêu thích
      await removeFromFavorites(userProfile.maNguoiDung, product.maSanPham);
    } else {
      // Chưa yêu thích => thêm yêu thích
      await addToFavorites(userProfile.maNguoiDung, product.maSanPham);
    }
  };
  if (isGettingDetailProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-15 ml-30">
      <section className="flex">
        <aside className="w-[25%]">
          {" "}
          <CategoryList />{" "}
        </aside>
        <article className="w-[75%]">
          <div className="ml-10">
            <div className="w-[100%] flex justify-start content-start mb-[50px]">
              <div className="flex justify-center aspect-square h-[400px]">
                <img src={product.hinhAnh} alt="product" />
              </div>

              <div className="info ml-[20px]">
                <h1 className="font-[Coiny] ml-[10px] mb-[20px] text-[24px] font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.tenSanPham}
                </h1>
                <h1 className="mb-[13px] font-bold text-[18px] text-[#cf72aa]">
                  {product?.giaBan?.toLocaleString("vi-VN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  ₫
                </h1>

                <div className="w-[100%]">
                  <form onSubmit={addToCart} className="flex items-center">
                    <label
                      className="inline-block max-w-[100%] mb-[5px] font-bold"
                      for="number"
                    >
                      Số Lượng:{" "}
                    </label>
                    <input
                      className="ml-[50px] rounded-[4px] h-[40px] w-[100px] pl-[10px] border-[1px] border-solid border-[#e5e5e5]"
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="1"
                      min="1"
                    />

                    <div className="function-info ml-[20px] flex justify-center items-center rounded-[10px] h-[40px] w-[120px] border-[1px] border-solid border-[#e5e5e5] bg-[#cf72aa]">
                      <button
                        className="text-[#fff] rounded-[10px] h-[35px] w-[115px] border-[2px] border-dashed border-[#e5e5e5] bg-[#de8ebe] after:mt-[10px] after:mb-[5px] after:ml-[5px] after:content-['\203A'] hover:bg-[#cf72aa] cursor-pointer"
                        type="submit"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </form>

                  <div
                    className="wishlist mt-[30px] mb-[30px] flex justify-center items-center border-[1px] border-solid border-[#ccc] w-[170px] h-[40px] rounded-[5px]"
                    onClick={handleToggleFavorite}
                  >
                    <a
                      className="bg-transparent text-[#555] font-normal rounded-[4px] text-[14px] align-top leading-[38px]"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i
                        className={`fa-heart mr-[6px] ${
                          isFavorite
                            ? "fa-solid text-[#cf72aa]"
                            : "fa-regular text-[#ccc]"
                        }`}
                      ></i>{" "}
                      Yêu thích
                    </a>
                  </div>

                  <div className="product_meta">
                    <div className="info-product flex">
                      <label className="min-w-[105px] font-normal text-[14px]">
                        Mã sản phẩm:{" "}
                      </label>
                      <span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]">
                        {product.maSanPham}
                      </span>
                    </div>
                    <div className="info-product flex">
                      <label className="min-w-[105px] font-normal text-[14px]">
                        Tình trạng:{" "}
                      </label>
                      {inStock && (
                        <span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]">
                          Còn hàng
                        </span>
                      )}
                      {!inStock && (
                        <span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]">
                          Hết hàng
                        </span>
                      )}
                    </div>
                    <div className="info-product flex">
                      <label className="min-w-[105px] font-normal text-[14px]">
                        Danh mục:{" "}
                      </label>
                      <div className="info-product-category">
                        <a
                          className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]"
                          href=""
                        >
                          {product.tenDanhMuc}
                        </a>
                        <a
                          className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]"
                          href=""
                        >
                          Danh mục Cún
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[100%] border-solid border-[1px] border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex gap-[10px] mb-[30px]">
              {product.danhGias && (
                <p className="w-[150px] m-[10px] text-[#cf72aa] font-bold text-[18px]">
                  Đánh Giá ({product.danhGias.length})
                </p>
              )}
              <textarea
                className="text-[18px] border-none w-[100%] p-[10px] focus:outline-none placeholder:text-[18px]"
                cols="60"
                rows="7"
                placeholder="Đánh giá sản phẩm"
              ></textarea>
            </div>

            {product.danhGias &&
              product.danhGias.map((dg) => (
                <div
                  key={dg.maDanhGia}
                  className="w-[100%] h-[100px] border-solid border-[1px] border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex gap-[10px] mb-[30px]"
                >
                  <div>
                    <h1 className="font-bold text-[18px] p-[10px]">
                      {dg.tenNguoiDung}
                    </h1>
                    <div className="product-info-rate p-[10px] flex justify-center">
                      {dg.soSao >= 1 ? (
                        <i className="fa-regular fa-star text-amber-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                      {dg.soSao >= 2 ? (
                        <i className="fa-regular fa-star text-amber-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                      {dg.soSao >= 3 ? (
                        <i className="fa-regular fa-star text-amber-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                      {dg.soSao >= 4 ? (
                        <i className="fa-regular fa-star text-amber-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                      {dg.soSao >= 5 ? (
                        <i className="fa-regular fa-star text-amber-500"></i>
                      ) : (
                        <i className="fa-regular fa-star"></i>
                      )}
                    </div>
                  </div>
                  <p className="text-[18px] p-[10px]">{dg.noiDung}</p>
                </div>
              ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default ProductDetail;
