import React from 'react'

const CellComp = ({prodID, imgSource, prodName, price, rating, newStat}) => {
  newStat = newStat || false;

  return (
    <div className="flex w-[25%] justify-center items-center mt-[10px] mb-[10px] ml-0 mr-0">
                  <div className="group/a1">
                    <div className="">
                      <div className="relative overflow-hidden group">
                        <a href={`/san-pham/${prodID}`}>
                          {newStat && <div className="absolute top-[10px] right-[10px] h-[40px] w-[40px] flex justify-center items-center bg-[#8bc34a] rounded-[50%] group-hover:hidden">
                            <p className="w-[35px] h-[35px] flex justify-center items-center border-[1px] border-dotted border-white text-white font-[Dosis] rounded-[50%]">New</p>
                          </div>}
                          <div className="group-hover:scale-110 group-hover:bg-white/50 transform transition duration-300 ease-in-out">
                            <img
                              src={imgSource}
                              alt="img"
                              width="270px"
                              height="270px"
                            />
                          </div>
                        </a>
                        <div className="absolute hidden top-[35%] left-[27%] group-hover:block">
                          <a href="">
                            <div className="mt-0 mb-0 mr-[10px] ml-[10px] bg-[#de8ebe] w-[40px] h-[40px] text-white text-[18px] inline-flex justify-center items-center rounded-[100px]  hover:bg-white group/b1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="bg-transparent w-[70%] h-[70%] text-white text-[18px] inline-flex justify-center items-center hover:text-[#de8ebe] group-hover/b1:text-[#de8ebe]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                            <div className="absolute bottom-[50px] left-[50%] bg-[#de8ebe] text-white text-[12px] font-[Arial] font-[200] whitespace-nowrap pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[5px] transform hidden -translate-x-1/2 z-100 group-hover/b1:block">Yêu thích</div>
                            </div>

                          </a>
                          <a href={`/san-pham/${prodID}`}>
                            <div className="mt-0 mb-0 mr-[10px] ml-[10px] bg-[#de8ebe] w-[40px] h-[40px] text-white text-[18px] inline-flex justify-center items-center rounded-[100px]  hover:bg-white group/b1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="bg-transparent w-[70%] h-[70%] text-white text-[18px] font-bold inline-flex justify-center items-center hover:text-[#de8ebe] group-hover/b1:text-[#de8ebe]">
                              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                            </svg>

                            <div className="absolute bottom-[50px] left-[50%] bg-[#de8ebe] text-white text-[12px] font-[Arial] font-[200] whitespace-nowrap pt-[5px] pb-[5px] pr-[10px] pl-[10px] rounded-[5px] transform hidden -translate-x-1/2 z-100 group-hover/b1:block">Xem Nhanh</div>
                            </div>
                            
                          </a>
                        </div>

                        <div className="absolute hidden bottom-[90px] left-[50%] bg-[#de8ebe] rounded-[10px] transform -translate-x-[50%] group-hover:block hover:bg-[#cf72aa]">
                          <div className="flex justify-center items-center w-[140px] h-[40px] rounded-[10px]">
                            <button onClick={addToCart} class="flex justify-center items-center bg-[#de8ebe] w-[130px] h-[35px] rounded-[10px] border-[1px] border-dashed border-[#fff] hover:bg-[#cf72aa] cursor-pointer" id="useFunctionBtn">
                              <span className="text-white text-[14px] font-bold after:content-['\276F']after:m-[10px] after:font-[400]">Thêm vào giỏ</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="relative mt-[15px] mb-[15px] ml-0 mr-0 flex justify-between">
                        <span className="font-bold text-[#de8ebe] text-[12px]">ID:{prodID}</span>
                        <div className="absolute hidden right-0 group-hover/a1:block">
                         {rating>=1 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star text-gray-500"></i>)}
                          {rating>=2 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star text-gray-500"></i>)}
                          {rating>=3 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star text-gray-500"></i>)}
                          {rating>=4 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star text-gray-500"></i>)}
                          {rating>=5 ? (<i className="fa-regular fa-star text-amber-500"></i>) : (<i className="fa-regular fa-star text-gray-500"></i>)}
                        </div>
                      </div>
                      <h3 className="font-[Coiny] overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px] hover:text-[#cf72aa]">
                        <a href={`/san-pham/${prodID}`}>{prodName}</a>
                      </h3>
                      <p className="font-[Arial] text-[18px] pt-0 pb-0 pr-[2px] pl-[2px] mt-[20px] mb-[20px] mr-0 ml-0 font-extrabold text-[#cf72aa]">{price}₫</p>
                    </div>
                  </div>
                </div>
  )
}

export default CellComp