import api from './api';

export const enrollmentService = {
  async getAll() {
    try {
      const response = await api.get('/enrollments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getByClassId(classId) {
    try {
      const response = await api.get(`/enrollments/class/${classId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getByPeopleId(peopleId) {
    try {
      const response = await api.get(`/enrollments/people/${peopleId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(enrollmentData) {
    try {
      const response = await api.post('/enrollments', enrollmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id, enrollmentData) {
    try {
      const response = await api.put(`/enrollments/${id}`, enrollmentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/enrollments/${id}`);
    } catch (error) {
      throw error;
    }
  },

  async importExcel(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/enrollments/import/excel', formData, {
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
