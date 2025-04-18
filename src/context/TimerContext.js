import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [categories, setCategories] = useState(['Workout', 'Study', 'Break']);
  const intervalRefs = useRef({});
  const [completedTimer, setCompletedTimer] = useState(null);
  const [halfwayModal, setHalfwayModal] = useState(null);

  // Load timers and history from storage on mount
  useEffect(() => {
    loadTimersFromStorage();
    loadHistoryFromStorage();
  }, []);

  // Save timers to storage whenever they change
  useEffect(() => {
    saveTimersToStorage();
  }, [timers]);

  // Save history to storage whenever it changes
  useEffect(() => {
    saveHistoryToStorage();
  }, [history]);

  const loadTimersFromStorage = async () => {
    try {
      const storedTimers = await AsyncStorage.getItem('timers');
      if (storedTimers) {
        setTimers(JSON.parse(storedTimers));
      }
    } catch (error) {
      console.error('Failed to load timers from storage', error);
    }
  };

  const loadHistoryFromStorage = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from storage', error);
    }
  };

  const saveTimersToStorage = async () => {
    try {
      await AsyncStorage.setItem('timers', JSON.stringify(timers));
    } catch (error) {
      console.error('Failed to save timers to storage', error);
    }
  };

  const saveHistoryToStorage = async () => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save history to storage', error);
    }
  };

  const addTimer = (newTimer) => {
    const timer = {
      ...newTimer,
      id: Date.now().toString(),
      status: 'Paused',
      remainingTime: newTimer.duration,
      createdAt: new Date().toISOString(),
    };
    setTimers([...timers, timer]);
  };

  const startTimer = (id) => {
    clearInterval(intervalRefs.current[id]);

    setTimers(currentTimers => 
      currentTimers.map(timer => {
        if (timer.id === id && timer.remainingTime > 0) {
          // Start the interval for this timer
          intervalRefs.current[id] = setInterval(() => {
            updateTimerTime(id);
          }, 1000);
          
          return { ...timer, status: 'Running' };
        }
        return timer;
      })
    );
  };

  const updateTimerTime = (id) => {
    setTimers(currentTimers => {
      const updatedTimers = currentTimers.map(timer => {
        if (timer.id === id && timer.status === 'Running') {
          const newRemainingTime = Math.max(0, timer.remainingTime - 1);
          
          // Check if timer just completed
          if (newRemainingTime === 0 && timer.remainingTime > 0) {
            clearInterval(intervalRefs.current[id]);
            
            // Add to history
            const historyEntry = {
              id: Date.now().toString(),
              timerId: timer.id,
              name: timer.name,
              category: timer.category,
              duration: timer.duration,
              completedAt: new Date().toISOString()
            };
            
            setHistory(prevHistory => [...prevHistory, historyEntry]);
            
            // Set completed timer to show modal
            setCompletedTimer(timer);
            
            return { 
              ...timer, 
              remainingTime: newRemainingTime, 
              status: 'Completed' 
            };
          }
          
          // Check if halfway point is reached
          if (timer.halfwayAlert && 
              Math.ceil(timer.duration / 2) === newRemainingTime) {
            setHalfwayModal({ name: timer.name });
          }
          
          return { ...timer, remainingTime: newRemainingTime };
        }
        return timer;
      });
      
      return updatedTimers;
    });
  };

  const pauseTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    
    setTimers(currentTimers => 
      currentTimers.map(timer => {
        if (timer.id === id && timer.status === 'Running') {
          return { ...timer, status: 'Paused' };
        }
        return timer;
      })
    );
  };

  const resetTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    
    setTimers(currentTimers => 
      currentTimers.map(timer => {
        if (timer.id === id) {
          return { 
            ...timer, 
            status: 'Paused', 
            remainingTime: timer.duration 
          };
        }
        return timer;
      })
    );
  };

  const deleteTimer = (id) => {
    clearInterval(intervalRefs.current[id]);
    setTimers(timers.filter(timer => timer.id !== id));
  };

  const closeCompletionModal = () => {
    setCompletedTimer(null);
  };

  const closeHalfwayModal = () => {
    setHalfwayModal(null);
  };

  // Category operations
  const startAllTimersInCategory = (category) => {
    timers
      .filter(timer => timer.category === category && timer.status !== 'Completed')
      .forEach(timer => startTimer(timer.id));
  };

  const pauseAllTimersInCategory = (category) => {
    timers
      .filter(timer => timer.category === category && timer.status === 'Running')
      .forEach(timer => pauseTimer(timer.id));
  };

  const resetAllTimersInCategory = (category) => {
    timers
      .filter(timer => timer.category === category)
      .forEach(timer => resetTimer(timer.id));
  };

  // Add a new category
  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
    }
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(intervalRefs.current).forEach(interval => {
        clearInterval(interval);
      });
    };
  }, []);

  return (
    <TimerContext.Provider 
      value={{
        timers,
        history,
        categories,
        completedTimer,
        halfwayModal,
        closeHalfwayModal,
        addTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        deleteTimer,
        closeCompletionModal,
        startAllTimersInCategory,
        pauseAllTimersInCategory,
        resetAllTimersInCategory,
        addCategory
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider; 