import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  X, 
  Clock,
  Zap
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
}

export const AlertSystem: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Simulated incoming alerts
  useEffect(() => {
    const alertMessages = [
      {
        type: 'info' as const,
        title: 'Data Sync Complete',
        message: 'ISS telemetry data synchronized successfully',
        duration: 5000
      },
      {
        type: 'warning' as const,
        title: 'Solar Panel Efficiency Drop',
        message: 'Panel efficiency down to 85% - scheduling maintenance',
        duration: 8000
      },
      {
        type: 'success' as const,
        title: 'Communication Link Restored',
        message: 'Madrid ground station connection re-established',
        duration: 6000
      },
      {
        type: 'critical' as const,
        title: 'Asteroid Trajectory Update',
        message: 'NEO-003 trajectory adjusted - impact risk lowered',
        duration: 10000
      }
    ];

    const interval = setInterval(() => {
      const randomAlert = alertMessages[Math.floor(Math.random() * alertMessages.length)];
      const newAlert: Alert = {
        id: `alert-${Date.now()}`,
        ...randomAlert,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]); // limit max 5 alerts
    }, 15000); // added New alert every 15 seconds

    // Added initial alert
    setTimeout(() => {
      setAlerts([{
        id: 'alert-initial',
        type: 'info',
        title: 'Mission Control Online',
        message: 'All systems initialized and monitoring active',
        timestamp: new Date(),
        duration: 5000
      }]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Automatically-remove alerts after their duration
  useEffect(() => {
    alerts.forEach(alert => {
      if (alert.duration) {
        setTimeout(() => {
          removeAlert(alert.id);
        }, alert.duration);
      }
    });
  }, [alerts]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'info': return Info;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'info': return 'border-primary bg-primary/10 text-primary';
      case 'warning': return 'border-warning bg-warning/10 text-warning';
      case 'critical': return 'border-destructive bg-destructive/10 text-destructive';
      case 'success': return 'border-success bg-success/10 text-success';
      default: return 'border-primary bg-primary/10 text-primary';
    }
  };

  const getAlertGlow = (type: string) => {
    switch (type) {
      case 'info': return 'shadow-primary/20';
      case 'warning': return 'shadow-warning/20';
      case 'critical': return 'shadow-destructive/20';
      case 'success': return 'shadow-success/20';
      default: return 'shadow-primary/20';
    }
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 w-80 space-y-2">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => {
          const AlertIcon = getAlertIcon(alert.type);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: 300, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.9 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 25 
              }}
              className={`relative p-4 rounded-lg border backdrop-blur-lg ${getAlertColor(alert.type)} ${getAlertGlow(alert.type)}`}
              style={{ 
                boxShadow: `0 8px 32px -8px var(--${alert.type === 'info' ? 'primary' : 
                  alert.type === 'warning' ? 'warning' : 
                  alert.type === 'critical' ? 'destructive' : 'success'}) / 0.3` 
              }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-current opacity-30"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <AlertIcon className="h-5 w-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold terminal-text">
                      {alert.title}
                    </h4>
                    <button
                      onClick={() => removeAlert(alert.id)}
                      className="flex-shrink-0 p-1 rounded-full hover:bg-current/20 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <p className="text-sm opacity-90 mb-2">
                    {alert.message}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Clock className="h-3 w-3" />
                    <span className="font-mono-custom">
                      {alert.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress bar for timed alerts */}
              {alert.duration && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-current rounded-b-lg"
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: alert.duration / 1000, ease: "linear" }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};