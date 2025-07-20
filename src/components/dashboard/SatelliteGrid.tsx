import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Battery, Signal, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SatelliteData {
  id: string;
  name: string;
  status: 'operational' | 'warning' | 'critical';
  battery: number;
  signalStrength: number;
  solarPanels: number;
  altitude: number;
}

export const SatelliteGrid: React.FC = () => {
  const [satellites, setSatellites] = useState<SatelliteData[]>([
    {
      id: 'SAT-001',
      name: 'Hubble',
      status: 'operational',
      battery: 89,
      signalStrength: 95,
      solarPanels: 98,
      altitude: 547
    },
    {
      id: 'SAT-002', 
      name: 'JWST',
      status: 'operational',
      battery: 92,
      signalStrength: 87,
      solarPanels: 100,
      altitude: 1500000
    },
    {
      id: 'SAT-003',
      name: 'Sentinel-1A',
      status: 'warning',
      battery: 67,
      signalStrength: 78,
      solarPanels: 85,
      altitude: 693
    },
    {
      id: 'SAT-004',
      name: 'TerraSAR-X',
      status: 'operational',
      battery: 95,
      signalStrength: 92,
      solarPanels: 97,
      altitude: 514
    }
  ]);

  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSatellites(prev => prev.map(sat => ({
        ...sat,
        battery: Math.max(0, Math.min(100, sat.battery + (Math.random() - 0.5) * 2)),
        signalStrength: Math.max(0, Math.min(100, sat.signalStrength + (Math.random() - 0.5) * 3)),
        solarPanels: Math.max(0, Math.min(100, sat.solarPanels + (Math.random() - 0.5) * 1)),
        status: sat.battery < 70 ? 'warning' : sat.battery < 50 ? 'critical' : 'operational'
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return Signal;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Signal;
    }
  };

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-primary/20 glow-effect">
            <Satellite className="h-5 w-5" />
          </div>
          Satellite Telemetry
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {satellites.map((satellite, index) => {
          const StatusIcon = getStatusIcon(satellite.status);
          return (
            <motion.div
              key={satellite.id}
              className="status-indicator delay-2500 p-3 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors cursor-pointer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${getStatusColor(satellite.status)}`} />
                  <span className="font-medium text-sm">{satellite.name}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {satellite.id}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                {/* Battery */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Battery className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">BAT</span>
                  </div>
                  <div className="text-primary font-mono">{satellite.battery.toFixed(0)}%</div>
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${
                        satellite.battery > 80 ? 'bg-success' :
                        satellite.battery > 50 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${satellite.battery}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${satellite.battery}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Signal */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Signal className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">SIG</span>
                  </div>
                  <div className="text-primary font-mono">{satellite.signalStrength.toFixed(0)}%</div>
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${satellite.signalStrength}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${satellite.signalStrength}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Solar Panels */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-warning" />
                    <span className="text-muted-foreground">PWR</span>
                  </div>
                  <div className="text-warning font-mono">{satellite.solarPanels.toFixed(0)}%</div>
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-warning rounded-full"
                      style={{ width: `${satellite.solarPanels}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${satellite.solarPanels}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground">
                ALT: {satellite.altitude.toLocaleString()} km
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};