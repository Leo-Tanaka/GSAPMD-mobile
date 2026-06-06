import axios from 'axios';
import { SensorData } from '../types';

const API_BASE_URL = 'http://192.168.15.109:8080/api'; 

export const apiService = {
  // GET: Consultar dados gravados
  getSensors: async (): Promise<SensorData[]> => {
    const response = await axios.get<SensorData[]>(`${API_BASE_URL}/sensors`);
    return response.data;
  },

  // POST: Enviar nova leitura/alerta
  sendSensorData: async (data: SensorData): Promise<SensorData> => {
    const response = await axios.post<SensorData>(`${API_BASE_URL}/sensors`, data);
    return response.data;
  }
};