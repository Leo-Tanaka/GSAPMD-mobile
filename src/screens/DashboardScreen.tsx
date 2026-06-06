import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { apiService } from '../services/api';
import { SensorData } from '../types';

export default function DashboardScreen() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const loadData = async () => {
    try {
      setLoading(true);
      const readings = await apiService.getSensors();
      setData(readings.reverse());
    } catch (error) {
      console.error("Erro ao buscar telemetria", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  const getStatusColor = (status: string) => {
    if (status === 'CRITICO') return '#E53935';
    if (status === 'ALERTA') return '#FDD835';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estação de Controle Espacial</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0D47A1" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id?.toString() || String(Math.random())}
          renderItem={({ item }) => (
            <View style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.moduleName}>{item.moduleName}</Text>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
              <Text style={styles.details}>{item.sensorType}: <Text style={styles.bold}>{item.readingValue}</Text></Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum sinal recebido dos módulos.</Text>}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Transmitir')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E1A', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#151D33', padding: 15, borderRadius: 8, marginBottom: 12, borderLeftWidth: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  moduleName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  details: { color: '#94A3B8', fontSize: 14 },
  bold: { fontWeight: 'bold', color: '#FFF' },
  empty: { color: '#94A3B8', textAlign: 'center', marginTop: 40 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0D47A1', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#FFF', fontSize: 30, lineHeight: 30 }
});