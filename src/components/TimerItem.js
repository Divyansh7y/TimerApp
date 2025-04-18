import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import { formatTime, calculateProgress } from '../utils/timeUtils';

const TimerItem = ({ timer }) => {
  const { startTimer, pauseTimer, resetTimer, deleteTimer } = useContext(TimerContext);
  
  // Calculate progress percentage
  const progressPercentage = calculateProgress(timer.remainingTime, timer.duration);
  
  // Determine status color
  const getStatusColor = () => {
    switch(timer.status) {
      case 'Running': return '#4CAF50'; // Green
      case 'Paused': return '#FF9800';  // Orange
      case 'Completed': return '#2196F3'; // Blue
      default: return '#888';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{timer.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{timer.status}</Text>
        </View>
      </View>
      
      <Text style={styles.time}>{formatTime(timer.remainingTime)}</Text>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${100 - progressPercentage}%` }
          ]} 
        />
      </View>
      
      <View style={styles.controls}>
        {timer.status !== 'Completed' && timer.status === 'Paused' && (
          <TouchableOpacity 
            style={[styles.button, styles.startButton]} 
            onPress={() => startTimer(timer.id)}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        
        {timer.status === 'Running' && (
          <TouchableOpacity 
            style={[styles.button, styles.pauseButton]} 
            onPress={() => pauseTimer(timer.id)}
          >
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={() => resetTimer(timer.id)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]} 
          onPress={() => deleteTimer(timer.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 70,
    alignItems: 'center',
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
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerItem; 