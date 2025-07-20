import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Thermometer, 
  Users, 
  HardDrive, 
  Wifi, 
  Shield,
  Activity,
  Battery
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SystemMetrics {
  powerLevel: number;
  temperature: number;
  crewCount: number;
  storage: number;
  networkHealth: number;
  systemIntegrity: number;
  cpuUsage: number;
  batteryBackup: number;
}

export const SystemStatusBar: React.FC = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    powerLevel: 94,
    temperature: 22,
    crewCount: 7,
    storage: 78,
    networkHealth: 96,
    systemIntegrity: 99,
    cpuUsage: 45,
    batteryBackup: 87
  });

  // Simulate system metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        powerLevel: Math.max(85, Math.min(100, prev.powerLevel + (Math.random() - 0.5) * 2)),
        temperature: Math.max(18, Math.min(28, prev.temperature + (Math.random() - 0.5) * 0.5)),
        crewCount: prev.crewCount, // Static
        storage: Math.max(70, Math.min(85, prev.storage + (Math.random() - 0.5) * 1)),
        networkHealth: Math.max(90, Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 3)),
        systemIntegrity: Math.max(95, Math.min(100, prev.systemIntegrity + (Math.random() - 0.5) * 1)),
        cpuUsage: Math.max(30, Math.min(70, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        batteryBackup: Math.max(80, Math.min(95, prev.batteryBackup + (Math.random() - 0.5) * 2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getMetricColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-success';
    if (value >= thresholds.warning) return 'text-warning';
    return 'text-destructive';
  };

  const statusItems = [
    {
      icon: Zap,
      label: 'Power',
      value: `${metrics.powerLevel.toFixed(0)}%`,
      color: getMetricColor(metrics.powerLevel, { good: 90, warning: 80 }),
      progress: metrics.powerLevel
    },
    {
      icon: Thermometer,
      label: 'Temp',
      value: `${metrics.temperature.toFixed(1)}°C`,
      color: metrics.temperature > 25 || metrics.temperature < 20 ? 'text-warning' : 'text-success',
      progress: ((metrics.temperature - 15) / 15) * 100
    },
    {
      icon: Users,
      label: 'Crew',
      value: `${metrics.crewCount}`,
      color: 'text-primary',
      progress: (metrics.crewCount / 10) * 100
    },
    {
      icon: HardDrive,
      label: 'Storage',
      value: `${metrics.storage.toFixed(0)}%`,
      color: getMetricColor(metrics.storage, { good: 30, warning: 20 }),
      progress: metrics.storage
    },
    {
      icon: Wifi,
      label: 'Network',
      value: `${metrics.networkHealth.toFixed(0)}%`,
      color: getMetricColor(metrics.networkHealth, { good: 95, warning: 85 }),
      progress: metrics.networkHealth
    },
    {
      icon: Shield,
      label: 'Integrity',
      value: `${metrics.systemIntegrity.toFixed(0)}%`,
      color: getMetricColor(metrics.systemIntegrity, { good: 98, warning: 95 }),
      progress: metrics.systemIntegrity
    },
    {
      icon: Activity,
      label: 'CPU',
      value: `${metrics.cpuUsage.toFixed(0)}%`,
      color: metrics.cpuUsage > 60 ? 'text-warning' : 'text-success',
      progress: metrics.cpuUsage
    },
    {
      icon: Battery,
      label: 'Backup',
      value: `${metrics.batteryBackup.toFixed(0)}%`,
      color: getMetricColor(metrics.batteryBackup, { good: 85, warning: 75 }),
      progress: metrics.batteryBackup
    }
  ];

  return (
    <Card className="mission-card">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary terminal-text">
            SYSTEM STATUS OVERVIEW
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded-full pulse-glow" />
            <span className="text-success text-sm font-medium">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {statusItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="status-indicator delay-1500 delay-1000 p-3 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-lg bg-opacity-20 ${
                  item.color === 'text-success' ? 'bg-success' :
                  item.color === 'text-warning' ? 'bg-warning' :
                  item.color === 'text-destructive' ? 'bg-destructive' :
                  'bg-primary'
                }`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                
                <div className="text-center">
                  <div className="text-xs text-muted-foreground font-medium mb-1">
                    {item.label.toUpperCase()}
                  </div>
                  <div className={`text-sm font-mono ${item.color}`}>
                    {item.value}
                  </div>
                </div>
                
                {/* Progress indicator */}
                <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      item.color === 'text-success' ? 'bg-success' :
                      item.color === 'text-warning' ? 'bg-warning' :
                      item.color === 'text-destructive' ? 'bg-destructive' :
                      'bg-primary'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, item.progress))}%` }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${Math.min(100, Math.max(0, item.progress))}%`,
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      width: { duration: 0.5 },
                      opacity: { duration: 2, repeat: Infinity }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional system info */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="text-center">
              <div className="text-muted-foreground">UPTIME</div>
              <div className="text-primary font-mono">247d 15h 42m</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">LAST MAINTENANCE</div>
              <div className="text-success font-mono">3d 8h 15m ago</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">NEXT SCHEDULED</div>
              <div className="text-warning font-mono">12d 4h 30m</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};