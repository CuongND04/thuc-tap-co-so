import { React, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
// import "./Detail.css";
import { useProductStore } from "../../store/useProductStore";
import CategoryList from "../../components/Client/CategoryList";
import { useCartStore } from "../../store/useCartStore";
import { useAuthStore } from "../../store/useAuthStore";
import toast from "react-hot-toast";

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
  const { userCart, addItem, getCart, isUpdating, isDeleting } = useCartStore();
  const { createReview, updateReview, deleteReview } = useProductStore();

  const [product, setProduct] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { id } = useParams();
  const [editingReviewId, setEditingReviewId] = useState(null); // id đang sửa

  const handleReviewSubmit = async () => {
    if (!rating || !reviewContent.trim()) {
      toast.error("Vui lòng nhập nội dung và chọn số sao");
      return;
    }

    setSubmitting(true);
    const reviewPayload = {
      soSao: rating,
      noiDung: reviewContent.trim(),
    };

    let success = false;

    if (editingReviewId) {
      // Gọi hàm sửa
      const res = await updateReview(editingReviewId, reviewPayload);
      success = !!res;
      if (success) toast.success("Cập nhật đánh giá thành công!");
    } else {
      // Gọi hàm tạo
      const res = await createReview({
        ...reviewPayload,
        maSanPham: product.maSanPham,
        maKhachHang: userProfile.maNguoiDung,
      });
      success = !!res;
      if (success) toast.success("Đánh giá thành công!");
    }

    if (success) {
      setReviewContent("");
      setRating(0);
      setEditingReviewId(null);

      // Gọi lại API để reload danh sách đánh giá nếu cần
      // ví dụ: await fetchProduct();
    } else {
      toast.error("Thao tác thất bại");
    }

    setSubmitting(false);
  };

  useEffect(() => {
    const fetchCart = async () => {
      const res = await getCart(userProfile.maNguoiDung);
    };
    if (userProfile) fetchCart(); // Gọi hàm async bên trong useEffect
  }, [isUpdating, isDeleting, isAdding, userProfile]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      console.log(data);
      if (data) {
        setProduct(data);
      }
    };
    fetchData();
  }, [submitting, deleting]);

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

  // if (isGettingDetailProduct) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // }

  return (
    <div className="mt-15 ml-30 w-[1200px]">
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

            <div className="w-full border border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex flex-col gap-[10px] mb-[30px] p-3">
              <div className="flex items-center justify-between">
                <p className="text-[#cf72aa] font-bold text-[18px]">
                  Đánh Giá ({product.danhGias?.length || 0})
                </p>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa-star fa-regular cursor-pointer text-[20px] ${
                        star <= rating ? "text-amber-500" : "text-gray-400"
                      }`}
                      onClick={() => setRating(star)}
                    ></i>
                  ))}
                </div>
              </div>

              <textarea
                className="text-[18px] border border-[#ccc] rounded p-2 focus:outline-none placeholder:text-[16px]"
                rows="4"
                placeholder="Nhập đánh giá sản phẩm..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              ></textarea>

              <button
                className="self-end px-4 py-2 bg-[#cf72aa] text-white rounded hover:bg-[#b25f95] disabled:opacity-50"
                onClick={handleReviewSubmit}
                disabled={submitting}
              >
                {submitting ? "Đang gửi..." : "Gửi đánh giá"}
              </button>
            </div>

            {product.danhGias &&
              product.danhGias.map((dg) => (
                <div
                  key={dg.maDanhGia}
                  className="w-full border border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex justify-between mb-[30px]"
                >
                  <div>
                    <h1 className="font-bold text-[18px] p-[10px]">
                      {dg.tenNguoiDung}
                    </h1>
                    <div className="p-[10px] flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i
                          key={star}
                          className={`fa-star fa-regular ${
                            star <= dg.soSao
                              ? "text-amber-500"
                              : "text-gray-400"
                          }`}
                        ></i>
                      ))}
                    </div>
                    <p className="text-[18px] p-[10px]">{dg.noiDung}</p>
                  </div>

                  {dg.tenNguoiDung === userProfile.hoTen && (
                    <div className="flex flex-col justify-center items-center p-2 gap-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => {
                          setRating(dg.soSao);
                          setReviewContent(dg.noiDung);
                          setEditingReviewId(dg.maDanhGia);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={async () => {
                          const confirm = window.confirm(
                            "Bạn có chắc chắn muốn xóa?"
                          );
                          if (confirm) {
                            setDeleting(true);
                            const success = await deleteReview(dg.maDanhGia);
                            if (success) {
                              toast.success("Xóa đánh giá thành công!");
                              // reload lại đánh giá
                              // ví dụ: await fetchProduct();
                            } else {
                              toast.error("Xóa đánh giá thất bại!");
                            }
                            setDeleting(false);
                          }
                        }}
                      >
                        Xóa
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default ProductDetail;
