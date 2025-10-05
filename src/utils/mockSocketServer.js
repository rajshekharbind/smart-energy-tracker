// Mock WebSocket server for development
class MockSocketServer {
  constructor() {
    this.listeners = {};
    this.interval = null;
    this.isConnected = false;
  }

  connect() {
    this.isConnected = true;
    this.trigger('connect');
    
    // Start mock data emission
    this.interval = setInterval(() => {
      this.emitMockData();
    }, 2000);

    return this;
  }

  disconnect() {
    this.isConnected = false;
    clearInterval(this.interval);
    this.trigger('disconnect');
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    console.log(`Emitting ${event}:`, data);
  }

  trigger(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  emitMockData() {
    // Mock inverter status
    const statuses = ['online', 'offline', 'standby'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    this.trigger('inverterStatus', { status: randomStatus });

    // Mock power cut (5% chance)
    if (Math.random() < 0.05) {
      this.trigger('powerStatus', { powerCut: true });
      setTimeout(() => {
        this.trigger('powerStatus', { powerCut: false });
      }, 5000);
    }

    // Mock battery level
    const batteryLevel = Math.max(20, Math.min(100, Math.floor(Math.random() * 30) + 70));
    this.trigger('batteryUpdate', { level: batteryLevel });

    // Mock energy consumption
    const energyConsumption = Math.floor(Math.random() * 500) + 100;
    this.trigger('energyUpdate', { consumption: energyConsumption });

    // Mock sensor data
    const temperature = Math.floor(Math.random() * 10) + 28;
    const humidity = Math.floor(Math.random() * 20) + 60;
    this.trigger('sensorData', { temperature, humidity });
  }
}

export const mockSocket = new MockSocketServer();