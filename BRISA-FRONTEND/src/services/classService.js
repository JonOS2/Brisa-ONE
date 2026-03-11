import api from './api';

export const classService = {
  async getAll() {
    try {
      const response = await api.get('/classes');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/classes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(classData) {
    try {
      const response = await api.post('/classes', classData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, classData) {
    try {
      const response = await api.put(`/classes/${id}`, classData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/classes/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async importExcel(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/classes/import/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
