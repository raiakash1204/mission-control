import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AsteroidData {
  id: string;
  name: string;
  distance: number; // AU
  velocity: number; // km/s
  diameter: number; // meters
  riskLevel: 'low' | 'medium' | 'high';
  approach: Date;
}

export const AsteroidTracker: React.FC = () => {
  const [asteroids, setAsteroids] = useState<AsteroidData[]>([
    {
      id: 'NEO-001',
      name: 'Apophis',
      distance: 0.0025,
      velocity: 7.4,
      diameter: 340,
      riskLevel: 'medium',
      approach: new Date(Date.now() + 86400000 * 45) // 45 days from now
    },
    {
      id: 'NEO-002',
      name: 'Bennu',
      distance: 0.012,
      velocity: 6.1,
      diameter: 492,
      riskLevel: 'low',
      approach: new Date(Date.now() + 86400000 * 122) // 122 days from now
    },
    {
      id: 'NEO-003',
      name: '2023 DZ2',
      distance: 0.0033,
      velocity: 12.3,
      diameter: 50,
      riskLevel: 'high',
      approach: new Date(Date.now() + 86400000 * 12) // 12 days from now
    }
  ]);

  // Simulate asteroid movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAsteroids(prev => prev.map(asteroid => ({
        ...asteroid,
        distance: Math.max(0.001, asteroid.distance - 0.00001),
        velocity: asteroid.velocity + (Math.random() - 0.5) * 0.1
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return Target;
      case 'medium': return TrendingUp;
      case 'high': return AlertTriangle;
      default: return Target;
    }
  };

  const getDaysUntilApproach = (approach: Date) => {
    const now = new Date();
    const diff = approach.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-destructive/20 glow-effect">
            <Target className="h-5 w-5 text-destructive" />
          </div>
          Near-Earth Objects
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Radar Visualization */}
        <div className="relative h-24 bg-muted/20 rounded-lg overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent" />
          
          {/* Radar sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-conic from-transparent via-primary/30 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ 
              background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.3) 30deg, transparent 60deg)`
            }}
          />
          
          {/* Concentric circles */}
          {[0.3, 0.6, 0.9].map((scale, i) => (
            <div
              key={i}
              className="absolute border border-primary/20 rounded-full"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </div>

        {/* Asteroid List */}
        <div className="space-y-2">
          {asteroids.map((asteroid, index) => {
            const RiskIcon = getRiskIcon(asteroid.riskLevel);
            const daysUntil = getDaysUntilApproach(asteroid.approach);
            
            return (
              <motion.div
                key={asteroid.id}
                className="status-indicator delay-1500 p-3 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <RiskIcon className={`h-4 w-4 ${getRiskColor(asteroid.riskLevel)}`} />
                    <span className="font-medium text-sm">{asteroid.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${
                    asteroid.riskLevel === 'high' ? 'bg-destructive text-destructive' :
                    asteroid.riskLevel === 'medium' ? 'bg-warning text-warning' :
                    'bg-success text-success'
                  }`}>
                    {asteroid.riskLevel.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-muted-foreground mb-1">Distance</div>
                    <div className="text-primary font-mono">
                      {asteroid.distance.toFixed(4)} AU
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground mb-1">Velocity</div>
                    <div className="text-warning font-mono">
                      {asteroid.velocity.toFixed(1)} km/s
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground mb-1">Diameter</div>
                    <div className="text-primary font-mono">
                      {asteroid.diameter}m
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-muted-foreground mb-1">Approach</div>
                    <div className={`font-mono ${daysUntil < 30 ? 'text-destructive' : 'text-success'}`}>
                      {daysUntil}d
                    </div>
                  </div>
                </div>

                {/* Trajectory indicator */}
                <div className="mt-2 h-1 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${
                      asteroid.riskLevel === 'high' ? 'bg-destructive' :
                      asteroid.riskLevel === 'medium' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${100 - (asteroid.distance * 1000)}%` }}
                    animate={{ 
                      width: `${100 - (asteroid.distance * 1000)}%`,
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      width: { duration: 0.5 },
                      opacity: { duration: 2, repeat: Infinity }
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            Tracking {asteroids.length} objects
          </span>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-warning" />
            <span className="text-xs text-warning font-medium">SCANNING</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};