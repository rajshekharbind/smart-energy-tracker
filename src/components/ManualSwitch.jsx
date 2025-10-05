import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useSocket } from '../context/SocketContext';
import { useNotification } from '../context/NotificationContext';

const ManualSwitch = () => {
  const { state, dispatch } = useApp();
  const { sendCommand } = useSocket();
  const { addNotification } = useNotification();

  const handleToggle = () => {
    const newMode = !state.isManualMode;
    dispatch({ type: 'TOGGLE_MANUAL_MODE' });
    
    if (newMode) {
      sendCommand('manual_control', { enabled: true });
      addNotification({
        type: 'info',
        message: 'Manual control enabled',
        timestamp: new Date(),
      });
    } else {
      sendCommand('manual_control', { enabled: false });
      addNotification({
        type: 'info',
        message: 'Automatic mode enabled',
        timestamp: new Date(),
      });
    }
  };

  const handleInverterControl = (action) => {
    if (!state.isManualMode) {
      addNotification({
        type: 'warning',
        message: 'Enable manual mode first',
        timestamp: new Date(),
      });
      return;
    }

    sendCommand('inverter_control', { action });
    addNotification({
      type: 'info',
      message: `Inverter ${action === 'turn_on' ? 'started' : 'stopped'}`,
      timestamp: new Date(),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Manual Control</h3>
      
      {/* Mode Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="font-semibold text-gray-800">Control Mode</p>
          <p className="text-sm text-gray-600">
            {state.isManualMode ? 'Manual Control Active' : 'Automatic Mode Active'}
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className={`relative w-16 h-8 rounded-full transition-colors ${
            state.isManualMode ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <motion.div
            className="w-6 h-6 bg-white rounded-full absolute top-1"
            animate={{ left: state.isManualMode ? '2rem' : '0.25rem' }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleInverterControl('turn_on')}
          disabled={!state.isManualMode}
          className={`p-4 rounded-lg font-semibold text-white transition-all ${
            state.isManualMode
              ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🔌</div>
            <div>Turn On</div>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleInverterControl('turn_off')}
          disabled={!state.isManualMode}
          className={`p-4 rounded-lg font-semibold text-white transition-all ${
            state.isManualMode
              ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl mb-2">🔋</div>
            <div>Turn Off</div>
          </div>
        </motion.button>
      </div>

      {/* Status Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          {state.isManualMode 
            ? 'Manual control is active. Use buttons above to control inverter.'
            : 'Automatic mode is active. Inverter is controlled by schedules and sensors.'
          }
        </p>
      </div>
    </div>
  );
};

export default ManualSwitch;