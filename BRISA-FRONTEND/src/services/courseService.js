import api from './api';

export const courseService = {
  async getAll() {
    try {
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getProgressionsByClassId(classId) {
    try {
      const response = await api.get(`/courses/progressions/class/${classId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ✅ Novo: detalhes completos de um curso para uma turma
  async getCourseDetails(courseId, classId) {
    try {
      const response = await api.get(`/courses/${courseId}/details/class/${classId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // ✅ Novo: envia alerta por email para alunos pendentes de um curso em uma turma
  // Endpoint a ser implementado na Tela 5
  async sendAlert(courseId, classId, payload) {
    try {
      const response = await api.post(`/courses/${courseId}/alert/class/${classId}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};