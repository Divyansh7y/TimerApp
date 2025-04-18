import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import { formatTime, formatDate } from '../utils/timeUtils';

const HistoryScreen = () => {
  const { history } = useContext(TimerContext);

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyHeader}>
        <Text style={styles.historyName}>{item.name}</Text>
        <Text style={styles.historyCategory}>{item.category}</Text>
      </View>
      <View style={styles.historyDetails}>
        <Text>Duration: {formatTime(item.duration)}</Text>
        <Text>Completed: {formatDate(item.completedAt)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No completed timers yet</Text>
        </View>
      ) : (
        <FlatList
          data={history.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))}
          keyExtractor={item => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  historyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyCategory: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  historyDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});

export default HistoryScreen; 