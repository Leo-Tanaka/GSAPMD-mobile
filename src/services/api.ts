import axios from 'axios';
import { OperationalEvent, TelemetryDTO, PaginatedResponse } from '../types';

const API_BASE_URL = 'http://192.168.15.109:8080/api'; 

export const apiService = {
  getTelemetry: async (page = 0, size = 50): Promise<PaginatedResponse<OperationalEvent>> => {
    const response = await axios.get<PaginatedResponse<OperationalEvent>>(
      `${API_BASE_URL}/telemetry?page=${page}&size=${size}`
    );
    return response.data;
  },

  sendTelemetry: async (data: TelemetryDTO): Promise<OperationalEvent> => {
    const response = await axios.post<OperationalEvent>(`${API_BASE_URL}/telemetry`, data);
    return response.data;
  }
};