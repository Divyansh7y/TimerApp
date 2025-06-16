# Timer App

A React Native application for creating and managing multiple customizable timers.

## Download

Download the latest APK from the [Releases](https://github.com/Divyansh7y/TimerApp/releases) section.

## Features

- **Create Timers**: Add timers with name, duration, category, and optional halfway alerts
- **Timer Management**: Start, pause, and reset individual timers
- **Categorization**: Group timers by categories for better organization
- **Bulk Actions**: Perform actions on all timers in a category at once
- **Progress Visualization**: Visual representation of timer progress
- **Timer History**: Track and view completed timers
- **Persistent Storage**: Save timers and history data locally using AsyncStorage

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```
git clone <repository-url>
cd TimerApp
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npx expo start
```

4. Follow the instructions in the terminal to open the app on your device or emulator

## Usage

- **Home Screen**: Displays all timers grouped by categories
- **Add Timer**: Tap the '+' button to create a new timer
- **Timer Controls**: Use the buttons on each timer to start, pause, reset, or delete it
- **Bulk Actions**: Use the category-level controls to perform actions on all timers in that category
- **History**: View completed timers on the History screen

## Project Structure

```
TimerApp/
├── App.js                  # Main app component with navigation
├── index.js                # Entry point
├── src/
│   ├── components/         # Reusable components
│   │   ├── AddTimerForm.js # Form for adding new timers
│   │   ├── CategoryActions.js # Category-level bulk actions
│   │   ├── CompletionModal.js # Modal shown when timer completes
│   │   ├── TimerItem.js    # Individual timer display
│   │   └── TimerList.js    # List of timers for a category
│   ├── context/
│   │   └── TimerContext.js # Context for state management
│   ├── screens/
│   │   ├── HomeScreen.js   # Main screen with timer list
│   │   └── HistoryScreen.js # Screen for viewing timer history
│   └── utils/
│       └── timeUtils.js    # Utility functions for time formatting
```

## Assumptions

- This app is designed to work on both iOS and Android platforms
- The app uses local storage only; no server-side data persistence
- Categories are managed within the app; there's no external category management
- The app assumes active use; background execution is not fully implemented

## Dependencies

- React Native
- Expo
- React Navigation
- AsyncStorage for data persistence 