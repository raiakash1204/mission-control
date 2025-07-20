import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Satellite,
  Radar,
  TrendingUp,
  Activity,
  Radio,
  Calendar,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ISSTracker } from './ISSTracker';
import { MarsWeather } from './MarsWeather';
import { SatelliteGrid } from './SatelliteGrid';
import { AsteroidTracker } from './AsteroidTracker';
import { MissionTimeline } from './MissionTimeline';
import { CommunicationPanel } from './CommunicationPanel';
import { SystemStatusBar } from './SystemStatusBar';
import { BackgroundBeams } from './effects/BackgroundBeams';
import { AlertSystem } from './AlertSystem';

const MissionControlDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [missionStatus, setMissionStatus] = useState('NOMINAL');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-background data-grid relative overflow-hidden">
      <BackgroundBeams />
      
      {/* Header */}
      <motion.header 
        className="relative z-10 border-b bg-background border-border/30 bg-card/50 backdrop-blur-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/20 glow-effect">
                <Satellite className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold terminal-text text-primary">
                  MISSION CONTROL CENTER
                </h1>
                <p className="text-sm text-muted-foreground">
                  Space Operations Command
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">UTC TIME</div>
                <div className="text-lg font-mono text-primary">
                  {currentTime.toUTCString().split(' ')[4]}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full pulse-glow ${
                  missionStatus === 'NOMINAL' ? 'bg-success' : 
                  missionStatus === 'CAUTION' ? 'bg-warning' : 'bg-destructive'
                }`} />
                <span className="text-sm font-medium terminal-text">
                  {missionStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Alert System */}
      <AlertSystem />

      {/* Main Dashboard Grid */}
      <motion.main 
        className="container mx-auto px-6 py-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ISS Tracker */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <ISSTracker />
          </motion.div>

          {/* Mars Weather */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <MarsWeather />
          </motion.div>

          {/* Communication Panel */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <CommunicationPanel />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Satellite Grid */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <SatelliteGrid />
          </motion.div>

          {/* Asteroid Tracker */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <AsteroidTracker />
          </motion.div>

          {/* Mission Timeline */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <MissionTimeline />
          </motion.div>
        </div>

        {/* System Status Bar */}
        <motion.div variants={itemVariants}>
          <SystemStatusBar />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default MissionControlDashboard;