import { useEffect, useState } from "react";
import { DatePicker, Spin, Card, Statistic, Row, Col } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import { useRevenueStore } from "../../store/useRevenueStore";

const { RangePicker } = DatePicker;

const Dashboard = () => {
  // Khoảng thời gian mặc định: tháng hiện tại
  const [range, setRange] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);

  const { revenueData, isGettingRevenue, getRevenue } = useRevenueStore();

  useEffect(() => {
    getRevenue(range[0], range[1]);
  }, [range]);

  const handleRangeChange = (dates) => {
    if (dates) {
      setRange(dates);
    }
  };

  const chartData = [
    {
      name: "Bán hàng",
      value: revenueData?.doanhThuBanHang || 0,
    },
    {
      name: "Nhập hàng",
      value: revenueData?.tienNhapHang || 0,
    },
    {
      name: "Lợi nhuận",
      value: revenueData?.loiNhuan || 0,
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen rounded-xl">
      <h1 className="text-3xl font-semibold mb-4">Thống kê doanh thu</h1>

      <div className="mb-6">
        <RangePicker
          value={range}
          onChange={handleRangeChange}
          allowClear={false}
          format="DD/MM/YYYY"
        />
      </div>

      {isGettingRevenue ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tổng đơn hàng"
                  value={revenueData?.tongDonHang || 0}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Doanh thu bán hàng"
                  value={revenueData?.doanhThuBanHang || 0}
                  suffix="₫"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tiền nhập hàng"
                  value={revenueData?.tienNhapHang || 0}
                  suffix="₫"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Lợi nhuận"
                  value={revenueData?.loiNhuan || 0}
                  valueStyle={{
                    color: revenueData?.loiNhuan < 0 ? "#cf1322" : "#3f8600",
                  }}
                  suffix="₫"
                />
              </Card>
            </Col>
          </Row>

          <Card title="Biểu đồ doanh thu">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value.toLocaleString()}₫`} />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}
    </div>
  );
};

export default Dashboard;
