import React from 'react'

const Cart = () => {
    <div className="cart fixed mt-[5px] top-0 right-0 min-h-[100vh] w-[380px] border-[1px] border-solid border-[#cf72aa] z-index-4 bg-white rounded-[10px]">
        <div className="function-close">
            <button>
                <i className="fa-regular fa-circle-xmark"></i>
            </button>
        </div>
        <h2>Giỏ Hàng</h2>
        <ul>{/* Danh sách sản phẩm trong giỏ hàng */}</ul>
        <p>Tổng tiền: 0₫</p>
        <button>Thanh Toán</button>
    </div>
}

export default Cart