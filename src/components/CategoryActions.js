import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimerContext } from '../context/TimerContext';

const CategoryActions = ({ category }) => {
  const { 
    startAllTimersInCategory, 
    pauseAllTimersInCategory, 
    resetAllTimersInCategory 
  } = useContext(TimerContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bulk Actions</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.startButton]} 
          onPress={() => startAllTimersInCategory(category)}
        >
          <Text style={styles.buttonText}>Start All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.pauseButton]} 
          onPress={() => pauseAllTimersInCategory(category)}
        >
          <Text style={styles.buttonText}>Pause All</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={() => resetAllTimersInCategory(category)}
        >
          <Text style={styles.buttonText}>Reset All</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginHorizontal: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default CategoryActions; 