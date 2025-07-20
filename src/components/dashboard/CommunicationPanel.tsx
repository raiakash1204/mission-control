import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Radio, Wifi, Signal, Antenna, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GroundStation {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  signalStrength: number;
  frequency: number;
  dataRate: number;
  lastContact: Date;
}

export const CommunicationPanel: React.FC = () => {
  const [stations, setStations] = useState<GroundStation[]>([
    {
      id: 'GS-001',
      name: 'Madrid',
      location: 'Spain',
      status: 'online',
      signalStrength: 87,
      frequency: 2.2,
      dataRate: 150.5,
      lastContact: new Date()
    },
    {
      id: 'GS-002',
      name: 'Goldstone',
      location: 'California',
      status: 'online',
      signalStrength: 92,
      frequency: 8.4,
      dataRate: 200.3,
      lastContact: new Date(Date.now() - 300000) // 5 minutes ago
    },
    {
      id: 'GS-003',
      name: 'Canberra',
      location: 'Australia',
      status: 'maintenance',
      signalStrength: 0,
      frequency: 0,
      dataRate: 0,
      lastContact: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 'GS-004',
      name: 'TDRS-East',
      location: 'Orbit',
      status: 'online',
      signalStrength: 78,
      frequency: 15.0,
      dataRate: 300.7,
      lastContact: new Date(Date.now() - 120000) // 2 minutes ago
    }
  ]);

  const [totalDataTransfer, setTotalDataTransfer] = useState(1247.8);

  // Simulate communication updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStations(prev => prev.map(station => ({
        ...station,
        signalStrength: station.status === 'online' 
          ? Math.max(60, Math.min(100, station.signalStrength + (Math.random() - 0.5) * 10))
          : 0,
        dataRate: station.status === 'online'
          ? Math.max(50, station.dataRate + (Math.random() - 0.5) * 20)
          : 0,
        lastContact: station.status === 'online' ? new Date() : station.lastContact
      })));

      setTotalDataTransfer(prev => prev + Math.random() * 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-success';
      case 'offline': return 'text-destructive';
      case 'maintenance': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return Signal;
      case 'offline': return Wifi;
      case 'maintenance': return Antenna;
      default: return Radio;
    }
  };

  const getTimeSinceContact = (lastContact: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastContact.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const onlineStations = stations.filter(s => s.status === 'online').length;

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-warning/20 glow-effect">
            <Radio className="h-5 w-5 text-warning" />
          </div>
          Communication Links
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Network Status */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/20 border border-border/30 text-center">
            <div className="text-xs text-muted-foreground mb-1">ACTIVE LINKS</div>
            <div className="text-xl font-mono text-success">
              {onlineStations}/{stations.length}
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-muted/20 border border-border/30 text-center">
            <div className="text-xs text-muted-foreground mb-1">DATA TRANSFER</div>
            <div className="text-xl font-times text-primary">
              {totalDataTransfer.toFixed(1)} GB
            </div>
          </div>
        </div>

        {/* Ground Stations */}
        <div className="space-y-2">
          {stations.map((station, index) => {
            const StatusIcon = getStatusIcon(station.status);
            
            return (
              <motion.div
                key={station.id}
                className="status-indicator delay-2000 p-3 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${getStatusColor(station.status)}`} />
                    <span className="font-medium text-sm">{station.name}</span>
                    <span className="text-xs text-muted-foreground">{station.location}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${
                    station.status === 'online' ? 'bg-success text-success' :
                    station.status === 'maintenance' ? 'bg-warning text-warning' :
                    'bg-destructive text-destructive'
                  }`}>
                    {station.status.toUpperCase()}
                  </span>
                </div>

                {station.status === 'online' && (
                  <>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                      <div>
                        <div className="text-muted-foreground">Signal</div>
                        <div className="text-primary font-mono">{station.signalStrength}%</div>
                      </div>
                      
                      <div>
                        <div className="text-muted-foreground">Freq</div>
                        <div className="text-warning font-mono">{station.frequency} GHz</div>
                      </div>
                      
                      <div>
                        <div className="text-muted-foreground">Rate</div>
                        <div className="text-success font-mono">{station.dataRate.toFixed(1)} Mbps</div>
                      </div>
                    </div>

                    {/* Signal strength bar */}
                    <div className="h-1 bg-muted/30 rounded-full overflow-hidden mb-2">
                      <motion.div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${station.signalStrength}%` }}
                        animate={{ 
                          opacity: [0.7, 1, 0.7],
                          width: `${station.signalStrength}%`
                        }}
                        transition={{ 
                          opacity: { duration: 2, repeat: Infinity },
                          width: { duration: 0.5 }
                        }}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Last Contact: {getTimeSinceContact(station.lastContact)}</span>
                  {station.status === 'online' && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
                      <span className="text-success">TRANSMITTING</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Network Overview */}
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Globe className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">Deep Space Network</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
              <span className="text-success font-medium">CONNECTED</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};