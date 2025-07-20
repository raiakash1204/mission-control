import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Rocket, Users, Wrench, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MissionEvent {
  id: string;
  title: string;
  type: 'launch' | 'eva' | 'maintenance' | 'docking';
  date: Date;
  duration: string;
  crew?: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'active' | 'completed';
}

export const MissionTimeline: React.FC = () => {
  const [events, setEvents] = useState<MissionEvent[]>([
    {
      id: 'EVT-001',
      title: 'Crew Dragon Launch',
      type: 'launch',
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      duration: '12h 30m',
      crew: ['Robert Behnken', 'Douglas Hurley'],
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: 'EVT-002',
      title: 'EVA Maintenance',
      type: 'eva',
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      duration: '6h 45m',
      crew: ['Christina Koch', 'Jessica Meir'],
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: 'EVT-003',
      title: 'Solar Panel Deployment',
      type: 'maintenance',
      date: new Date(Date.now() + 86400000 * 14), // 14 days from now
      duration: '4h 15m',
      crew: ['Akihiko Hoshide'],
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: 'EVT-004',
      title: 'Cargo Dragon Docking',
      type: 'docking',
      date: new Date(Date.now() + 86400000 * 21), // 21 days from now
      duration: '2h 30m',
      priority: 'medium',
      status: 'scheduled'
    }
  ]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'launch': return Rocket;
      case 'eva': return Users;
      case 'maintenance': return Wrench;
      case 'docking': return Calendar;
      default: return Calendar;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-warning';
      case 'completed': return 'text-success';
      case 'scheduled': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 0) return `${Math.abs(days)}d ago`;
    return `${days}d`;
  };

  return (
    <Card className="mission-card h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <div className="p-2 rounded-lg bg-success/20 glow-effect">
            <Calendar className="h-5 w-5 text-success" />
          </div>
          Mission Timeline
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Upcoming Counter */}
        <div className="text-center p-3 rounded-lg bg-muted/20 border border-border/30">
          <div className="text-xs text-muted-foreground mb-1">NEXT EVENT</div>
          <div className="text-lg font-mono text-primary">
            {getDaysUntil(events[0]?.date)}
          </div>
          <div className="text-xs text-muted-foreground">
            {events[0]?.title}
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.map((event, index) => {
            const EventIcon = getEventIcon(event.type);
            
            return (
              <motion.div
                key={event.id}
                className="status-indicator p-3 rounded-lg bg-muted/10 border border-border/30 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    event.priority === 'high' ? 'bg-destructive/20' :
                    event.priority === 'medium' ? 'bg-warning/20' :
                    'bg-success/20'
                  }`}>
                    <EventIcon className={`h-4 w-4 ${getPriorityColor(event.priority)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium truncate">{event.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${
                        event.status === 'active' ? 'bg-warning text-warning' :
                        event.status === 'completed' ? 'bg-success text-success' :
                        'bg-primary text-primary'
                      }`}>
                        {event.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground">Date</div>
                        <div className="text-primary font-mono">
                          {event.date.toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-muted-foreground">Duration</div>
                        <div className="text-warning font-mono">
                          {event.duration}
                        </div>
                      </div>
                    </div>
                    
                    {event.crew && (
                      <div className="mt-2 text-xs">
                        <div className="text-muted-foreground mb-1">Crew</div>
                        <div className="text-primary">
                          {event.crew.join(', ')}
                        </div>
                      </div>
                    )}
                    
                    {/* Progress bar for time remaining */}
                    <div className="mt-2 h-1 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${
                          event.priority === 'high' ? 'bg-destructive' :
                          event.priority === 'medium' ? 'bg-warning' : 'bg-success'
                        }`}
                        style={{ 
                          width: `${Math.max(0, Math.min(100, 100 - (getDaysUntil(event.date) === 'Today' ? 100 : 
                            parseInt(getDaysUntil(event.date).replace('d', '')) * 2)))}%` 
                        }}
                        animate={{ 
                          opacity: event.status === 'active' ? [0.5, 1, 0.5] : 1
                        }}
                        transition={{ 
                          opacity: { duration: 2, repeat: Infinity }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <span className="text-xs text-muted-foreground">
            {events.length} scheduled events
          </span>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary font-medium">TRACKING</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};