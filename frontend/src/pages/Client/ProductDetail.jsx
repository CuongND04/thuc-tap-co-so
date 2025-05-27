import {React, useEffect, useState} from 'react';
import { Loader } from "lucide-react";
import {useParams} from "react-router-dom"
import "./Detail.css"
import { useProductStore } from '../../store/useProductStore';
import CategoryList from "../../components/Client/CategoryList"

function ProductDetail() {
const {getDetailProduct, isGettingDetailProduct} = useProductStore();
const [product, setProduct] = useState([]);
const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDetailProduct(id);
      console.log(data);
      if (data)
      {
        setProduct(data);
      }
    };
    fetchData();
  }, []);

const inStock = () => {
    if(product){
        if(product.soLuongTonKho>0) return true;
        else if(product.soLuongPhuKien>0) return true;
    }
    else return false;
}

const rating = (rate) => {
    stars = []
    for (let i = 0; i < rate; i++) {
        stars.push(
            <div>
            <i className="fa-regular fa-star bg-amber-300"></i>
            </div>
        );
    }

    for (let i = rate; i < 5; i++) {
        stars.push(
            <div>
            <i className="fa-regular fa-star"></i>
            </div>
        );
    }
    return stars;
}


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
        <aside className='w-[25%]'> <CategoryList /> </aside>
        <article class="w-[75%]">
            <div className="ml-10">
            <div class="w-[100%] flex justify-start content-start mb-[50px]">

                <div class="flex justify-center aspect-square h-[400px]">
                    <img src={product.hinhAnh} alt="product"/>
                </div>


                <div class="info ml-[20px]">
                    <h1 className="font-[Coiny] ml-[10px] mb-[20px] text-[24px] font-bold overflow-hidden text-ellipsis whitespace-nowrap">{product.tenSanPham}</h1>
                    <h1 className=" mb-[13px] font-bold text-[18px] text-[#cf72aa]">{product.giaBan}₫</h1>

                    <div class="form w-[100%]">
                        <div class="function-number flex items-center">
                            <label className="inline-block max-w-[100%] mb-[5px] font-bold" for="number">Số Lượng: </label>
                            <input className="ml-[50px] rounded-[4px] h-[40px] w-[100px] pl-[10px] border-[1px] border-solid border-[#e5e5e5]" type="number" name="number" id="number" placeholder="0" min="0"/>

                            <div class="function-info ml-[20px] flex justify-center items-center rounded-[10px] h-[40px] w-[120px] border-[1px] border-solid border-[#e5e5e5] bg-[#cf72aa]">
                                <button className="text-[#fff] rounded-[10px] h-[35px] w-[115px] border-[2px] border-dashed border-[#e5e5e5] bg-[#de8ebe] after:mt-[10px] after:mb-[5px] after:ml-[5px] after:content-['\203A']" type="button" onclick="buychitiet(this)">Thêm vào giỏ</button>
                            </div>
                        </div>

                        <div class="wishlist mt-[30px] mb-[30px] flex justify-center items-center border-[1px] border-solid border-[#ccc] w-[170px] h-[40px] rounded-[5px]">
                                <a className="bg-transparent text-[#555] font-normal rounded-[4px] text-[14px] align-top leading-[38px]" href=""><i class="fa-regular fa-heart mr-[6px] text-[#cf72aa]"></i> Yêu thích</a>
                        </div>

                        <div class="product_meta">
                            <div class="info-product flex">
                                <label className="min-w-[105px] font-normal text-[14px]">Mã sản phẩm: </label>
                                <span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]">{product.maSanPham}</span>
                            </div>
                            <div class="info-product flex">
                                <label className="min-w-[105px] font-normal text-[14px]">Tình trạng: </label>
                                {inStock && (<span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]" >Còn hàng</span>)}
                                {!inStock && (<span className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]" >Hết hàng</span>)}
                            </div>
                            <div class="info-product flex">
                                <label className="min-w-[105px] font-normal text-[14px]">Danh mục: </label>
                                <div class="info-product-category">
                                    <a className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]" href="">{product.tenDanhMuc}</a>
                                    <a className="inline-block border-[1px] border-solid border-[#e5e5e5] pt-[4px] pb-[4px] pl-[10px] pr-[10px] rounded-[4px] mb-[5px] text-[12px]" href="">Danh mục Cún</a>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>   
            </div>

            <div className="w-[100%] border-solid border-[1px] border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex gap-[10px] mb-[30px]">
                {product.danhGias && (<p className="w-[150px] m-[10px] text-[#cf72aa] font-bold text-[18px]">Đánh Giá ({product.danhGias.length})</p>)}
                <textarea className="text-[18px] border-none w-[100%] p-[10px] focus:outline-none placeholder:text-[18px]" cols="60" rows="7" placeholder="Đánh giá sản phẩm"></textarea>
            </div>

            {product.danhGias && product.danhGias.map((dg) => (
                <div className="w-[100%] h-[100px] border-solid border-[1px] border-[#ccc] border-l-[5px] border-l-[#cf72aa] flex gap-[10px] mb-[30px]">
                    <div>
                    <h1 className="font-bold text-[18px] p-[10px]">{dg.tenNguoiDung}</h1>
                    <div className="product-info-rate p-[10px] flex justify-center">
                          {dg.soSao>=1 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star"></i>)}
                          {dg.soSao>=2 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star"></i>)}
                          {dg.soSao>=3 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star"></i>)}
                          {dg.soSao>=4 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star"></i>)}
                          {dg.soSao>=5 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star"></i>)}
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
};

export default ProductDetail;