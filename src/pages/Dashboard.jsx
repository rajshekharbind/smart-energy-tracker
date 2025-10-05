import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import StatusCard from '../components/StatusCard';
import EventTimeline from '../components/EventTimeline';
import EnergyCharts from '../components/EnergyCharts';
import ManualSwitch from '../components/ManualSwitch';
import NotificationList from '../components/NotificationList';

const Dashboard = () => {
  const { state, dispatch } = useApp();

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      type: 'power_cut',
      title: 'Power Cut Detected',
      description: 'Grid power interrupted, running on inverter',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      type: 'inverter_on',
      title: 'Inverter Activated',
      description: 'Inverter started automatically due to power cut',
      timestamp: new Date(Date.now() - 280000),
    },
    {
      id: 3,
      type: 'battery_low',
      title: 'Battery Level Low',
      description: 'Battery level dropped below 30%',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: 4,
      type: 'normal',
      title: 'Grid Power Restored',
      description: 'Grid power is back, inverter in standby',
      timestamp: new Date(Date.now() - 120000),
    },
  ];

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_TIME',
        payload: new Date().toLocaleTimeString(),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">InvertorGuard Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time monitoring and control of your power system</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>🟢 System Online</span>
              <span>•</span>
              <span>Last update: {state.currentTime}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Status Cards Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatusCard
          title="Inverter Status"
          value="Online"
          subtitle="All systems normal"
          icon="🔌"
          color="status-online"
        />
        <StatusCard
          title="Power Supply"
          value="Grid Active"
          subtitle="Stable power supply"
          icon="⚡"
          color="status-online"
        />
        <StatusCard
          title="Battery Level"
          value="75%"
          subtitle="Adequate charge"
          icon="🔋"
          color="status-online"
        />
        <StatusCard
          title="Energy Usage"
          value="320W"
          subtitle="Moderate consumption"
          icon="📊"
          color="status-standby"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Energy Charts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <EnergyCharts />
          </motion.div>

          {/* Event Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EventTimeline events={mockEvents} />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Manual Control */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ManualSwitch />
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <NotificationList />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;