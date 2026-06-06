export interface SensorData {
  id?: number;
  moduleName: string;   // Ex: "Navegação", "Suporte de Vida"
  sensorType: string;   // Ex: "Oxigênio", "Combustível", "Temperatura"
  readingValue: number; // Valor numérico da leitura
  status: 'NORMAL' | 'ALERTA' | 'CRITICO';
  timestamp?: string;   // Gerado automaticamente pelo backend
}