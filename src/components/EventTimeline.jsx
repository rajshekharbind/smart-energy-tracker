import React from 'react';
import { motion } from 'framer-motion';
import { formatTime, formatDate } from '../utils/format';

const EventTimeline = ({ events }) => {
  const getEventColor = (type) => {
    switch (type) {
      case 'power_cut': return 'bg-red-500';
      case 'inverter_on': return 'bg-green-500';
      case 'inverter_off': return 'bg-gray-500';
      case 'battery_low': return 'bg-orange-500';
      case 'normal': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'power_cut': return '⚡';
      case 'inverter_on': return '🔌';
      case 'inverter_off': return '🔋';
      case 'battery_low': return '🪫';
      case 'normal': return '✅';
      default: return '📝';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Events</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`w-3 h-3 rounded-full mt-2 ${getEventColor(event.type)}`}></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-800">{event.title}</p>
                <span className="text-2xl">{getEventIcon(event.type)}</span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{event.description}</p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                <span>{formatTime(event.timestamp)}</span>
                <span>•</span>
                <span>{formatDate(event.timestamp)}</span>
              </div>
            </div>
          </motion.div>
        ))}
        {events.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No events to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTimeline;