import React from 'react'

const CellComp = ({prodID, imgSource, prodName, price, newStat}) => {
  newStat = newStat || false;
  return (
    <div className="article-iteam">
                  <div className="product-iteam">
                    <div className="product-thumb">
                      <div className="product-thumb-img">
                        <a href={`/san-pham/${prodID}`}>
                          {newStat && <div className="badge">
                            <p>New</p>
                          </div>}
                          <div className="img">
                            <img
                              src={imgSource}
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div className="function-icon">
                          <a href="">
                            <i className="fa-regular fa-heart">
                              <div className="tooltip">Yêu Thích</div>
                            </i>
                          </a>
                          <a href="">
                            <i className="fa-solid fa-magnifying-glass">
                              <div className="tooltip">Xem Nhanh</div>
                            </i>
                          </a>
                        </div>
                        <div className="function-buy">
                          <div className="function-buy-boder">
                            <button onclick="buy(this)" id="useFunctionBtn">
                              <span>Mua Hàng</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-info">
                      <div className="product-info-id">
                        <span>ID:{prodID}</span>
                        <div className="product-info-rate">
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                          <i className="fa-regular fa-star"></i>
                        </div>
                      </div>
                      <h3>
                        <a href={`/san-pham/${prodID}`}>{prodName}</a>
                      </h3>
                      <p>{price}₫</p>
                    </div>
                  </div>
                </div>

    // <div className="article-iteam">
    //             <div className="product-iteam">
    //               <div className="product-thumb">
    //                 <div className="relative overflow-hidden group">
    //                   <a href="#">   
    //                     <div className="absolute top-[10px] right-[10px] h-[40px] w-[40px] flex justify-center items-center bg-[#8bc34a] rounded-[20px] group-hover:hidden">
    //                         <p className="w-[35px] h-[35px] flex justify-center items-center border-[1px] border-dotted border-white text-white font-[Dosis] rounded-[17.5px]">New</p>
    //                     </div>

    //                     <div className="group-hover:scale-110 group-hover:bg-white/50 transform transition duration-300 ease-in-out">
    //                       <img
    //                         src={imgSource} ///IMG/TrangChu/TrangChu20.jpg
    //                         alt="img"
    //                         width="270px"
    //                         height="270px"
    //                       />
    //                     </div>
    //                   </a>

    //                   <div className=" absolute hidden top-7/20 left-27/100 group-hover:block">
    //                     <a href="#">
    //                       <i className="mt-0 mb-0 mr-[10px] ml-[10px] bg-[#de8ebe] w-[40px] h-[40px] text-white text-[18px] inline-flex justify-center
    //                       items-center rounded-[100px] fa-regular fa-heart hover:text-[#de8ebe] hover:bg-white group/b1">
    //                         <div className="absolute bottom-[50px] left-1/2 bg-[#de8ebe] text-white text-[12px] font-[Arial] font-[200] whitespace-nowrap pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[5px] transform hidden -translate-x-1/2 z-100 group-hover/b1:block">Yêu Thích</div>
    //                       </i>
    //                     </a>
    //                     <a href="#">
    //                       <i className="mt-0 mb-0 mr-[10px] ml-[10px] bg-[#de8ebe] w-[40px] h-[40px] text-white text-[18px] inline-flex justify-center items-center rounded-[100px] hover:text-[#de8ebe] hover:bg-white group/b1 fa-solid fa-magnifying-glass">
    //                         <div className="absolute bottom-[50px] left-1/2 bg-[#de8ebe] text-white text-[12px] font-[Arial] font-[200] font-weight whitespace-nowrap pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[5px] hidden transform -translate-x-1/2 z-100 group-hover/b1:block">Xem Nhanh</div>
    //                       </i>
    //                     </a>
    //                   </div>

    //                   <div className="function-buy group-hover:inline-block">
    //                     <div className="function-buy-boder">
    //                       <button onclick="buy(this)">
    //                         <span>Mua Hàng</span>
    //                       </button>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="product-info">
    //                 <div className="product-info-id">
    //                   <span>ID:{prodID}</span>
    //                   <div className="product-info-rate">
    //                     <i className="fa-regular fa-star"></i>
    //                     <i className="fa-regular fa-star"></i>
    //                     <i className="fa-regular fa-star"></i>
    //                     <i className="fa-regular fa-star"></i>
    //                     <i className="fa-regular fa-star"></i>
    //                   </div>
    //                 </div>
    //                 <h3>
    //                   <a href="#">{prodName}</a>
    //                 </h3>
    //                 <p>{price}₫</p>
    //               </div>
    //             </div>
    //           </div>
  )
}

export default CellComp