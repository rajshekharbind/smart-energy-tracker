import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

const ScheduleManager = () => {
  const { state, dispatch } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: '',
    action: 'turn_on',
    time: '',
    days: [],
    enabled: true
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.name || !newSchedule.time) return;

    const schedule = {
      id: Date.now(),
      ...newSchedule
    };

    dispatch({ type: 'ADD_SCHEDULE', payload: schedule });
    setNewSchedule({
      name: '',
      action: 'turn_on',
      time: '',
      days: [],
      enabled: true
    });
    setShowForm(false);
  };

  const handleRemoveSchedule = (id) => {
    dispatch({ type: 'REMOVE_SCHEDULE', payload: id });
  };

  const toggleDay = (day) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Schedule Manager</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          + Add Schedule
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h4 className="text-lg font-bold mb-4">Add New Schedule</h4>
              <form onSubmit={handleAddSchedule} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Name
                  </label>
                  <input
                    type="text"
                    value={newSchedule.name}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Morning Startup"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Action
                  </label>
                  <select
                    value={newSchedule.action}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, action: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="turn_on">Turn On</option>
                    <option value="turn_off">Turn Off</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          newSchedule.days.includes(day)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Save Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {state.schedules.map((schedule) => (
          <motion.div
            key={schedule.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  schedule.enabled ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <div>
                  <h4 className="font-semibold text-gray-800">{schedule.name}</h4>
                  <p className="text-sm text-gray-600">
                    {schedule.action === 'turn_on' ? 'Turn On' : 'Turn Off'} at {schedule.time}
                  </p>
                  <p className="text-xs text-gray-500">
                    {schedule.days.length > 0 ? schedule.days.join(', ') : 'No days selected'}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemoveSchedule(schedule.id)}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
            >
              🗑️
            </button>
          </motion.div>
        ))}
        {state.schedules.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No schedules configured</p>
            <p className="text-sm">Add a schedule to automate your inverter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManager;