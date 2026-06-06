export interface Module {
  id: number;
  name: string;
}

export interface OperationalEvent {
  id: number;
  module: Module;
  sensorType: string;
  readingValue: number;
  status: 'NORMAL' | 'ALERTA' | 'CRITICO';
  timestamp: string;
}

export interface TelemetryDTO {
  moduleName: string;
  sensorType: string;
  readingValue: number;
  status: 'NORMAL' | 'ALERTA' | 'CRITICO';
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}