import axios, { AxiosInstance } from 'axios';
import { auth } from '@/config/firebase';

// Create axios instance with interceptor for Firebase auth token
let apiClient: AxiosInstance;

export const initializeApiClient = () => {
  apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
    timeout: 10000,
  });

  // Add auth token to requests
  apiClient.interceptors.request.use(
    async (config) => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error getting auth token:', error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return apiClient;
};

export const getApiClient = () => {
  if (!apiClient) {
    initializeApiClient();
  }
  return apiClient;
};
