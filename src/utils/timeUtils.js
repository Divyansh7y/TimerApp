// Format seconds into MM:SS format
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Calculate progress percentage
export const calculateProgress = (currentTime, totalTime) => {
  if (totalTime === 0) return 0;
  return (currentTime / totalTime) * 100;
};

// Format date for display in history
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
}; 