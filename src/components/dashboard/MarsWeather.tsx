import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Gauge, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MarsWeatherData {
  temperature: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  sol: number;
  season: string;
}

export const MarsWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<MarsWeatherData>({
    temperature: -65,
    pressure: 610,
    windSpeed: 12,
    windDirection: 245,
    sol: 4156,
    season: 'Northern Spring'
  });

  // Simulated weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        ...prev,
        temperature: -65 + (Math.random() - 0.5) * 20,
        pressure: 610 + (Math.random() - 0.5) * 50,
        windSpeed: 12 + (Math.random() - 0.5) * 8,
        windDirection: (prev.windDirection + (Math.random() - 0.5) * 30) % 360,
        sol: prev.sol + Math.random() * 0.01
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTemperatureColor = (temp: number) => {
    if (temp > -50) return 'text-warning';
    if (temp > -70) return 'text-primary';
    return 'text-blue-400';
  };

  const getPressureLevel = (pressure: number) => {
    if (pressure > 620) return { level: 'HIGH', color: 'text-warning' };
    if (pressure > 600) return { level: 'NORM', color: 'text-success' };
    return { level: 'LOW', color: 'text-blue-400' };
  };

  const pressureStatus = getPressureLevel(weatherData.pressure);

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-warning/20 glow-effect">
            <Sun className="h-5 w-5 text-warning" />
          </div>
          Mars Weather Station
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Sol Counter */}
        <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
          <div className="text-xs text-muted-foreground mb-1">MARTIAN SOL</div>
          <div className="text-2xl font-mono text-primary">
            {Math.floor(weatherData.sol)}
          </div>
          <div className="text-xs text-muted-foreground">
            {weatherData.season}
          </div>
        </div>

        {/* Weather Data */}
        <div className="space-y-3">
          {/* Temperature */}
          <motion.div 
            className="status-indicator p-3 rounded-lg bg-muted/10 border border-border/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className={`h-4 w-4 ${getTemperatureColor(weatherData.temperature)}`} />
                <span className="text-sm font-medium">Temperature</span>
              </div>
              <div className={` font-mono-custom text-lg font-mono ${getTemperatureColor(weatherData.temperature)}`}>
                {weatherData.temperature.toFixed(1)}°C
              </div>
            </div>
            
            {/* Temperature gauge */}
            <div className="mt-2 h-2 bg-muted/30 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${getTemperatureColor(weatherData.temperature).replace('text-', 'bg-')}`}
                style={{ width: `${((weatherData.temperature + 100) / 50) * 100}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${((weatherData.temperature + 100) / 50) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Pressure */}
          <motion.div 
            className="status-indicator p-3 rounded-lg bg-muted/10 border border-border/30"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className={`h-4 w-4 ${pressureStatus.color}`} />
                <span className="text-sm font-medium">Pressure</span>
              </div>
              <div className=" text-right">
                <div className={`text-lg font-mono ${pressureStatus.color}`}>
                  {weatherData.pressure.toFixed(0)} Pa
                </div>
                <div className={`text-xs ${pressureStatus.color}`}>
                  {pressureStatus.level}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Wind */}
          <motion.div 
            className="status-indicator p-3 rounded-lg bg-muted/10 border border-border/30"
            whileHover={{scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Wind</span>
              </div>
              <div className="text-lg font-mono text-primary">
                {weatherData.windSpeed.toFixed(1)} m/s
              </div>
            </div>
            
            {/* Wind direction compass */}
            <div className="flex items-center justify-center">
              <div className="relative w-12 h-12 rounded-full border-2 border-primary/30">
                <motion.div
                  className="absolute top-1 left-1/2 w-1 h-4 bg-primary rounded-full origin-bottom"
                  style={{ 
                    transform: `translateX(-50%) rotate(${weatherData.windDirection}deg)`,
                    transformOrigin: '50% 100%'
                  }}
                  animate={{ rotate: weatherData.windDirection }}
                  transition={{ duration: 1 }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-primary font-mono">
                  {Math.round(weatherData.windDirection)}°
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            Curiosity Rover • Gale Crater
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full pulse-glow" />
            <span className="text-xs text-success font-medium">ONLINE</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};