import axiosInstance from './axios';

export const orderApi = {
  // Get orders for the current logged-in user
  getMyOrders: async () => {
    try {
      const response = await axiosInstance.get('/orders/my-orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get order details by ID
  getOrderById: async (orderId) => {
    try {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 