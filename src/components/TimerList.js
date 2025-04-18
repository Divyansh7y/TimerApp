import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TimerContext } from '../context/TimerContext';
import TimerItem from './TimerItem';
import CategoryActions from './CategoryActions';

const TimerList = ({ category }) => {
  const { timers } = useContext(TimerContext);
  
  // Filter timers by the category
  const categoryTimers = timers.filter(timer => timer.category === category);
  
  if (categoryTimers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No timers in this category</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <CategoryActions category={category} />
      
      <FlatList
        data={categoryTimers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TimerItem timer={item} />}
        contentContainerStyle={styles.list}
        scrollEnabled={false} // Disable scrolling for nested list
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 8,
  },
  list: {
    paddingHorizontal: 8,
  },
  emptyContainer: {
    padding: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
  },
});

export default TimerList; 