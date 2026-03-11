import api from './api';

export const programService = {
  async getAll() {
    try {
      const response = await api.get('/programs');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/programs/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(programData) {
    try {
      const response = await api.post('/programs', programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, programData) {
    try {
      const response = await api.put(`/programs/${id}`, programData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/programs/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async importExcel(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/programs/import/excel', formData, {
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
