import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  Switch,
  Alert
} from 'react-native';
import { TimerContext } from '../context/TimerContext';
import TimerList from '../components/TimerList';
import AddTimerForm from '../components/AddTimerForm';
import CompletionModal from '../components/CompletionModal';
import HalfwayModal from '../components/HalfwayModal';

const HomeScreen = () => {
  const { categories, completedTimer, closeCompletionModal, halfwayModal, closeHalfwayModal } = useContext(TimerContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(categories.reduce((acc, category) => {
    acc[category] = true; // Default to expanded
    return acc;
  }, {}));
  
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {categories.map(category => (
          <View key={category} style={styles.categoryContainer}>
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => toggleCategory(category)}
            >
              <Text style={styles.categoryTitle}>{category}</Text>
              <Text>{expandedCategories[category] ? '▼' : '►'}</Text>
            </TouchableOpacity>
            
            {expandedCategories[category] && (
              <TimerList category={category} />
            )}
          </View>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AddTimerForm 
              onClose={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      
      {completedTimer && (
        <CompletionModal
          visible={!!completedTimer}
          timerName={completedTimer.name}
          onClose={closeCompletionModal}
        />
      )}
      {halfwayModal && (
        <HalfwayModal
          visible={!!halfwayModal}
          timerName={halfwayModal.name}
          onClose={closeHalfwayModal}
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
  scrollView: {
    flex: 1,
    padding: 16,
  },
  categoryContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen; 