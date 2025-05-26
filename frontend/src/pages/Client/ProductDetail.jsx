import {React, useEffect, useState} from 'react';
import { Loader } from "lucide-react";
import {useParams} from "react-router-dom"
import "./Detail.css"
import { useProductStore } from '../../store/useProductStore';

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


  if (isGettingDetailProduct) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

return (
    <div>
    <section>
            <article>
                <div class="section-article">
                    <div class="section-article-img">
                        <div class="img">
                            <img src="../IMG/ChiTiet/ChiTiet06.jpg" alt="product" id="panel"/>
                        </div>
                        <div class="icon-img">
                            <button onclick="comeback_product()"></button>
                            <img src="../IMG/ChiTiet/ChiTiet07.jpg" alt="img icon"/>
                            <img src="../IMG/ChiTiet/ChiTiet08.jpg" alt="img icon"/>
                            <img src="../IMG/ChiTiet/ChiTiet09.jpg" alt="img icon"/>
                            <img src="../IMG/ChiTiet/ChiTiet10.jpg" alt="img icon"/>
                            <button onclick="next_product()"></button>
                        </div>
                        <div class="icon-contact">
                            <a href="" class="mail"><i class="fa-regular fa-envelope"></i> <span>0</span></a> 
                            <a href="" class="face"><i class="fa-brands fa-facebook"></i><span>0</span></a>
                            <a href="" class="twitter"><i class="fa-brands fa-twitter"></i><span>1</span></a>
                            <a href="" class="pinterest"><i class="fa-brands fa-pinterest"></i><span>0</span></a>
                        </div>
                    </div>
                    <div class="info">
                        <h1 id="name">{product.tenSanPham}</h1>
                        <p id="price">{product.giaBan}₫</p>
                        <div class="form">
                            <div class="function-number">
                                <label for="number">Số Lượng: </label>
                                <input type="number" name="number" id="number" placeholder="0" min="0"/>
                                <div class="function-info">
                                    <button type="button" onclick="buychitiet(this)">Thêm vào giỏ</button>
                                </div>
                            </div>
                            <div class="wishlist">
                                <a href="TrangChu.html"><i class="fa-regular fa-heart"></i> Add to Wishlist</a>
                            </div>
                            <div class="product_meta">
                                <div class="info-product">
                                    <label>Mã san pham: </label>
                                    <span>{product.maSanPham}</span>
                                </div>
                                <div class="info-product">
                                    <label>Tình trạng: </label>
                                    <span>Còn hàng</span>
                                </div>
                                <div class="info-product">
                                    <label>Danh mục: </label>
                                    <div class="info-product-category">
                                        <a href="http://127.0.0.1:3000/DuAn/MatPetFamily/HTML/ThuCung.html">Chó Phốc Sóc - Pomeranian</a>
                                        <a href="http://127.0.0.1:3000/DuAn/MatPetFamily/HTML/ThuCung.html">Danh Mục Cún</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="danhgia">
                    <p>Đánh Giá (0)</p>
                    <textarea cols="60" rows="7" placeholder="Đánh giá sản phẩm"></textarea>
                </div>
            </article>
        </section>
        </div>
 );
};

export default ProductDetail;