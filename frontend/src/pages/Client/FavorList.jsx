import React from "react";
import { useAuthStore } from "../../store/useAuthStore";
import CellComp from "../../components/Client/CellComp";

const FavorList = () => {
  const {
    userProfile,
    isCheckingAuth,
    favors,
    addToFavorites,
    isAdding,
    removeFromFavorites,
  } = useAuthStore();
  return (
    <div>
      <div>
        <main className="bg-white py-5 px-4">
          <section className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-[Coiny] font-bold text-center mb-4 text-pink-600">
              DANH SÁCH YÊU THÍCH
            </h2>
          </section>
        </main>
      </div>
      <section className="pt-0 pb-0 pl-[138px] pr-[138px] w-[100%] mb-[10px] mt-[10px] ml-0 mr-0">
        <div className="w-[100%] mb-[21px]">
          <div className="mt-[10px] mb-[10px] ml-0 mr-0">
            <div className="text-center uppercase font-bold mb-[20px]">
              <a href="#">
                <strong className="font-[Coiny] text-[30px] text-[#de8ebe]">
                  {/* {text} */}
                </strong>
              </a>
            </div>

            <article>
              <div className="flex flex-wrap items-center justify-start">
                {favors.length > 0 &&
                  favors.map((prod) => (
                    <CellComp
                      key={prod.maSanPham}
                      prodID={prod.maSanPham}
                      imgSource={prod.hinhAnh}
                      prodName={prod.tenSanPham}
                      price={prod.giaBan}
                    />
                  ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FavorList;
