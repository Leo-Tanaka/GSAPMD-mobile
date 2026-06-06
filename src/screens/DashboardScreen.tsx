import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { apiService } from '../services/api';
import { OperationalEvent } from '../types';

export default function DashboardScreen() {
  const [data, setData] = useState<OperationalEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'TODOS' | 'NORMAL' | 'ALERTA' | 'CRITICO'>('TODOS');
  
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();

  const loadData = async () => {
    try {
      const response = await apiService.getTelemetry(0, 50);
      setData(response.content);
    } catch (error) {
      console.error("Erro ao buscar telemetria", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  useEffect(() => {
    if (isFocused) loadData();
  }, [isFocused]);

  // Cálculos para os Cards de Métricas
  const criticalCount = data.filter(item => item.status === 'CRITICO').length;
  const uniqueModules = new Set(data.map(item => item.module.name)).size;
  const generalStatus = criticalCount > 0 ? 'PERIGO' : 'ESTÁVEL';

  // Aplicação do Filtro na Lista
  const filteredData = useMemo(() => {
    if (filter === 'TODOS') return data;
    return data.filter(item => item.status === filter);
  }, [data, filter]);

  const getStatusColor = (status: string) => {
    if (status === 'CRITICO') return '#E53935';
    if (status === 'ALERTA') return '#FDD835';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      {/* Cards de Métricas */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Status</Text>
          <Text style={[styles.metricValue, { color: generalStatus === 'PERIGO' ? '#E53935' : '#4CAF50' }]}>{generalStatus}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Módulos</Text>
          <Text style={styles.metricValue}>{uniqueModules}</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>Críticos</Text>
          <Text style={[styles.metricValue, { color: criticalCount > 0 ? '#E53935' : '#FFF' }]}>{criticalCount}</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {(['TODOS', 'NORMAL', 'ALERTA', 'CRITICO'] as const).map((f) => (
          <TouchableOpacity key={f} style={[styles.filterChip, filter === f && styles.filterChipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista de Eventos */}
      {loading ? (
        <ActivityIndicator size="large" color="#0D47A1" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />}
          renderItem={({ item }) => (
            <View style={[styles.card, { borderLeftColor: getStatusColor(item.status) }]}>
              <View style={styles.cardHeader}>
                <Text style={styles.moduleName}>{item.module.name}</Text>
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
              <Text style={styles.details}>{item.sensorType}: <Text style={styles.bold}>{item.readingValue}</Text></Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum registro encontrado.</Text>}
        />
      )}

      {/* Botão Flutuante */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Transmitir')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0E1A', paddingHorizontal: 15, paddingTop: 15 },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  metricCard: { backgroundColor: '#151D33', flex: 1, marginHorizontal: 4, padding: 15, borderRadius: 8, alignItems: 'center' },
  metricTitle: { color: '#94A3B8', fontSize: 12, marginBottom: 5 },
  metricValue: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  filtersContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  filterChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 15, backgroundColor: '#151D33', borderWidth: 1, borderColor: '#334155' },
  filterChipActive: { backgroundColor: '#0D47A1', borderColor: '#0D47A1' },
  filterText: { color: '#94A3B8', fontSize: 12, fontWeight: 'bold' },
  filterTextActive: { color: '#FFF' },
  card: { backgroundColor: '#151D33', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 6 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  moduleName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  details: { color: '#94A3B8', fontSize: 14 },
  bold: { fontWeight: 'bold', color: '#FFF' },
  empty: { color: '#94A3B8', textAlign: 'center', marginTop: 40 },
  fab: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#0D47A1', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#FFF', fontSize: 30, lineHeight: 30 }
});