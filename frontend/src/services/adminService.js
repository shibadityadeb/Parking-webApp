import apiClient from './parkingService';

// Admin Analytics Service
export const adminService = {
  // Get all insights (total collection, cars, active parkings, etc.)
  getInsights: async () => {
    try {
      const response = await apiClient.get('/admin/insights');
      return response.data;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  },
};

export default adminService;
