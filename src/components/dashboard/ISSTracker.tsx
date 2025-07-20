import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, MapPin, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ISSData {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: Date;
}

export const ISSTracker: React.FC = () => {
  const [issData, setISSData] = useState<ISSData>({
    latitude: 25.7617,
    longitude: -80.1918,
    altitude: 408,
    velocity: 27580,
    timestamp: new Date()
  });

  // Simulate ISS movement
  useEffect(() => {
    const interval = setInterval(() => {
      setISSData(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() - 0.5) * 2,
        longitude: prev.longitude + (Math.random() - 0.5) * 4,
        altitude: 408 + (Math.random() - 0.5) * 10,
        velocity: 27580 + (Math.random() - 0.5) * 100,
        timestamp: new Date()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const dataItems = [
    {
      label: 'Latitude',
      value: `${issData.latitude.toFixed(4)}°`,
      icon: MapPin,
      color: 'text-primary'
    },
    {
      label: 'Longitude',
      value: `${issData.longitude.toFixed(4)}°`,
      icon: MapPin,
      color: 'text-primary'
    },
    {
      label: 'Altitude',
      value: `${issData.altitude.toFixed(1)} km`,
      icon: TrendingUp,
      color: 'text-success'
    },
    {
      label: 'Velocity',
      value: `${issData.velocity.toFixed(0)} km/h`,
      icon: TrendingUp,
      color: 'text-warning'
    }
  ];

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-primary/20 glow-effect animate-pulse">
            <Satellite className="h-5 w-5" />
          </div>
          ISS Live Tracker
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* ISS Visualization */}
        <div className="relative h-32 bg-muted/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          
          <motion.div 
            className="absolute w-4 h-4 bg-primary rounded-full glow-effect"
            style={{
              left: `${((issData.longitude + 180) / 360) * 100}%`,
              top: `${((90 - issData.latitude) / 180) * 100}%`
            }}
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Orbital path */}
          <motion.div 
            className="absolute inset-0 border border-primary/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-3">
          {dataItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="status-indicator p-3 rounded-lg bg-muted/10 border border-border/30"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <item.icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </span>
              </div>
              <div className={`text-sm font-mono ${item.color}`}>
                {item.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Last Update: {issData.timestamp.toLocaleTimeString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
            <span className="text-xs text-success font-medium">ACTIVE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};