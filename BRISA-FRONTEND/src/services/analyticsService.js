import api from './api';

export const analyticsService = {
  async getCourseProgressionFunnel(classId, options = {}) {
    try {
      const params = { classId };
      if (options.stageId) params.stageId = options.stageId;
      if (options.stage) params.stage = options.stage;

      const response = await api.get('/analytics/course-progression-funnel', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
