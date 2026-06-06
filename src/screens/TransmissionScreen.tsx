import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../services/api';
import { TelemetryDTO } from '../types';

export default function TransmitScreen() {
  const [moduleName, setModuleName] = useState('');
  const [sensorType, setSensorType] = useState('');
  const [readingValue, setReadingValue] = useState('');
  const [status, setStatus] = useState<'NORMAL' | 'ALERTA' | 'CRITICO'>('NORMAL');
  
  const navigation = useNavigation();

  const handleSend = async () => {
    if (!moduleName || !sensorType || !readingValue) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios da telemetria.');
      return;
    }

    const payload: TelemetryDTO = {
      moduleName,
      sensorType,
      readingValue: parseFloat(readingValue),
      status
    };

    try {
      await apiService.sendTelemetry(payload);
      Alert.alert('Sucesso', 'Telemetria transmitida com sucesso para a Terra!');
      
      navigation.goBack();
    } catch (error) {
      console.error("Erro na transmissão: ", error);
      Alert.alert('Falha na Comunicação', 'Não foi possível conectar ao centro de controle.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Transmissão</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Módulo (Ex: Propulsão Principal)" 
        placeholderTextColor="#64748B" 
        value={moduleName} 
        onChangeText={setModuleName} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Tipo de Sensor (Ex: Temperatura)" 
        placeholderTextColor="#64748B" 
        value={sensorType} 
        onChangeText={setSensorType} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Valor da Leitura (Apenas números)" 
        placeholderTextColor="#64748B" 
        keyboardType="numeric" 
        value={readingValue} 
        onChangeText={setReadingValue} 
      />
      
      <Text style={styles.label}>Status do Sistema:</Text>
      <View style={styles.statusContainer}>
        {(['NORMAL', 'ALERTA', 'CRITICO'] as const).map((s) => (
          <TouchableOpacity 
            key={s} 
            style={[styles.statusBtn, status === s && styles.statusBtnActive]} 
            onPress={() => setStatus(s)}
          >
            <Text style={styles.statusBtnText}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Transmitir Sinal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0A0E1A', 
    padding: 20, 
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#FFF', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: '#151D33', 
    color: '#FFF', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  label: { 
    color: '#94A3B8', 
    marginBottom: 10, 
    fontSize: 16 
  },
  statusContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 30 
  },
  statusBtn: { 
    flex: 1, 
    backgroundColor: '#151D33', 
    padding: 12, 
    marginHorizontal: 4, 
    borderRadius: 6, 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B'
  },
  statusBtnActive: { 
    backgroundColor: '#0D47A1',
    borderColor: '#0D47A1'
  },
  statusBtnText: { 
    color: '#FFF', 
    fontWeight: 'bold',
    fontSize: 12
  },
  button: { 
    backgroundColor: '#0D47A1', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: { 
    color: '#FFF', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});