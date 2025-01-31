'use client';

import { useEffect, useState } from 'react';
import { BarChart, Cloud, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import { AnalogClock } from './AnalogClock'
import { WeatherForecast } from './WeatherForecast'
import TheSun from "./assets/3d/Sun"
import  Sphere  from './assets/3d/SPhere';
import Earthshape from './assets/3d/Earth'
import News from "./home_components/news";

export default function SmartMirror() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-[40px] bg-gray-900 p-8 text-white shadow-2xl">
    {/* LED border effect */}
    <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]" />
    
    <div className="relative z-10 h-full flex flex-col gap-8">
      {/* Top row: Clock and Weather */}
      <div className="flex justify-between items-start h-64">
        {/* Clock */}
        <div className="flex-shrink-0">
          <AnalogClock />
        </div>
        <TheSun/>
        {/* Weather Forecast */}
        <div className="w-64 h-64">
          <Earthshape />
         
        </div>
        
        {/*<Sphere/>*/}
      </div>
      <div>
      
      </div>
      {/* Weather Widgets */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: '2.25', label: 'AM PM N S', icon: <Sun className="w-6 h-6" /> },
          { value: '4.27', label: 'W E/W F', icon: <Cloud className="w-6 h-6" /> },
          { value: '4.16', label: 'E/W/E 2019', icon: <Thermometer className="w-6 h-6" /> },
        ].map((widget, i) => (
          <Card key={i} className="bg-white/10 rounded-xl backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex flex-col items-center gap-2">
                {widget.icon}
                <div className="text-xl font-bold">{widget.value}</div>
                <div className="text-xs text-white/60">{widget.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Landscape Widget */}
      <Card className="relative overflow-hidden h-32 bg-white/10 rounded-xl backdrop-blur-sm">
        <CardContent className="p-0">
          <img
            src="/placeholder.svg?height=200&width=400"
            alt="Landscape view"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-sm font-semibold">House</h3>
            <p className="text-xs text-white/60">Connected Innovations Notes.55</p>
          </div>
        </CardContent>
      </Card>

      <News />
      {/* Chart */}
      <Card className="bg-white/10 rounded-xl backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm font-semibold">Controls</div>
              <div className="text-xs text-white/60">Energy 25.6 kWh</div>
            </div>
            <div className="text-sm text-white/60">M3</div>
          </div>
          <div className="h-16 flex items-end gap-2">
            {[40, 60, 30, 70, 50, 80, 45].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-white/40 rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Icons */}
      <div className="flex justify-between mt-auto">
        {[Sun, Cloud, Droplets, Wind, Thermometer].map((Icon, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm"
          >
            <Icon className="w-4 h-4" />
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
