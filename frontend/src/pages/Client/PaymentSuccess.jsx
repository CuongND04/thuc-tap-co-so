import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../lib/axios";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentId = queryParams.get("paymentId");
  const payerId = queryParams.get("PayerID");
  const orderId = queryParams.get("orderId");

  const [status, setStatus] = useState("loading"); // hoặc import useState từ react
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (paymentId && payerId) {
      axiosInstance
        .get("/paypal/success", {
          params: {
            paymentId,
            PayerID: payerId,
            orderId,
          },
        })
        .then((res) => {
          if (res.data.status === "success") {
            setStatus("success");
            setPaymentInfo(res.data);
          } else {
            setStatus("fail");
          }
        })
        .catch((err) => {
          console.error("Lỗi xác nhận thanh toán:", err);
          setStatus("fail");
        });
    }
  }, []);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">
          Đang xác nhận thanh toán...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <CheckCircle className="text-green-600 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-green-800 mb-2">
        Thanh toán thành công!
      </h1>
      <p className="text-gray-700 mb-4">
        Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đang được xử lý.
      </p>
      {paymentInfo?.paymentId && (
        <div className="bg-white shadow-md rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-600">Mã thanh toán:</p>
          <p className="text-lg font-mono text-green-800">
            {paymentInfo.paymentId}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
