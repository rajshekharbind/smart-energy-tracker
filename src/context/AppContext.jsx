import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  inverterStatus: 'offline',
  powerCut: false,
  batteryLevel: 75,
  energyConsumption: 0,
  temperature: 32,
  humidity: 65,
  schedules: [],
  isManualMode: false,
  currentTime: new Date().toLocaleTimeString(),
};

function appReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INVERTER_STATUS':
      return { ...state, inverterStatus: action.payload };
    case 'UPDATE_POWER_STATUS':
      return { ...state, powerCut: action.payload };
    case 'UPDATE_BATTERY_LEVEL':
      return { ...state, batteryLevel: action.payload };
    case 'UPDATE_ENERGY_DATA':
      return { ...state, energyConsumption: action.payload };
    case 'UPDATE_SENSOR_DATA':
      return { 
        ...state, 
        temperature: action.payload.temperature,
        humidity: action.payload.humidity
      };
    case 'ADD_SCHEDULE':
      return { 
        ...state, 
        schedules: [...state.schedules, action.payload]
      };
    case 'REMOVE_SCHEDULE':
      return { 
        ...state, 
        schedules: state.schedules.filter(s => s.id !== action.payload)
      };
    case 'TOGGLE_MANUAL_MODE':
      return { ...state, isManualMode: !state.isManualMode };
    case 'UPDATE_TIME':
      return { ...state, currentTime: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}