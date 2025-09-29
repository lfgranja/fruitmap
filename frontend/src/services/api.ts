// src/services/api.ts
import axios, { AxiosResponse } from 'axios';

// Base API URL - will use environment variable or default to local development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ensure headers object exists
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token might be expired, clear it
      localStorage.removeItem('token');
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

// Tree-related API calls
export const treeAPI = {
  // Get all trees
  getAllTrees: (params?: {
    speciesId?: string;
    accessibility?: string;
    status?: string;
    limit?: number;
    offset?: number;
    minLat?: number;
    maxLat?: number;
    minLng?: number;
    maxLng?: number;
    lat?: number;
    lng?: number;
    radius?: number;
  }): Promise<AxiosResponse> => {
    return apiClient.get('/trees', { params });
  },

  // Get tree by ID
  getTreeById: (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/trees/${id}`);
  },

  // Create a new tree
  createTree: (treeData: {
    speciesId: number;
    location: string; // GeoJSON or coordinate string
    title: string;
    description?: string;
    accessibility?: string;
  }): Promise<AxiosResponse> => {
    return apiClient.post('/trees', treeData);
  },

  // Update a tree
  updateTree: (id: string, treeData: Partial<{
    speciesId: number;
    location: string;
    title: string;
    description?: string;
    accessibility?: string;
    status?: string;
  }>): Promise<AxiosResponse> => {
    return apiClient.patch(`/trees/${id}`, treeData);
  },

  // Delete a tree
  deleteTree: (id: string): Promise<AxiosResponse> => {
    return apiClient.delete(`/trees/${id}`);
  },

  // Search trees
  searchTrees: (params: {
    query?: string;
    species?: string;
    lat?: number;
    lng?: number;
    radius?: number;
  }): Promise<AxiosResponse> => {
    return apiClient.get('/trees/search', { params });
  },
};

// Auth-related API calls
export const authAPI = {
  // Login
  login: (email: string, password: string): Promise<AxiosResponse> => {
    return apiClient.post('/auth/login', { email, password });
  },

  // Register
  register: (userData: {
    email: string;
    password: string;
    fullName: string;
    username: string;
  }): Promise<AxiosResponse> => {
    return apiClient.post('/auth/register', userData);
  },

  // Get current user profile
  getProfile: (): Promise<AxiosResponse> => {
    return apiClient.get('/auth/profile');
  },
};

// Other API calls as needed
export default apiClient;

// Species-related API calls
export const speciesAPI = {
  // Get all species
  getAllSpecies: (): Promise<AxiosResponse> => {
    return apiClient.get('/species');
  },

  // Get species by ID
  getSpeciesById: (id: string): Promise<AxiosResponse> => {
    return apiClient.get(`/species/${id}`);
  },
};