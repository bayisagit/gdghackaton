// api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const register = (data) =>
  axios.post(`${API_URL}/api/auth/register/`, data);

export const login = (data) => axios.post(`${API_URL}/api/auth/login/`, data);

export const checkSymptoms = (data) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/api/health/checks/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSymptomHistory = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/symptoms/history/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getArticles = () => axios.get(`${API_URL}/api/content/articles/`);

export const getVideos = () => axios.get(`${API_URL}/api/content/videos/`);

export const getFirstAid = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/firstaid/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const searchFirstAid = (query) => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/firstaid/?q=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getHealthChecks = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/health/checks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSymptoms = () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/api/health/symptoms/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getSymptomById = async (id) => {
  const token = localStorage.getItem("token");
  return await axios.get(`${API_URL}/api/health/symptoms/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(res => res.data);
};

export const chatInteract = (message) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/api/chat/interact/`, { message }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadSkinDiagnosis = (formData) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_URL}/api/skin-diagnosis/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};