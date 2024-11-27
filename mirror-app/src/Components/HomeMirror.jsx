'use client';

import { useEffect, useState } from 'react';
import { BarChart, Cloud, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';

export default function SmartMirror() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 h-full flex flex-col gap-8 bg-gray-900 text-white p-4">
      {/* Analog Clock */}
      <div className="flex justify-center items-center">
        <div className="relative w-64 h-64 rounded-full bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-[8px] border-gray-400 rounded-full"></div>

          {/* Numbers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-lg font-semibold"
              style={{
                top: `calc(50% + ${Math.cos((i * 30 - 90) * (Math.PI / 180)) * 85}px)`,
                left: `calc(50% + ${Math.sin((i * 30 - 90) * (Math.PI / 180)) * 85}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {i === 0 ? 12 : i}
            </div>
          ))}

          {/* Hour Hand */}
          <div
            className="absolute top-12 left-1/2 w-[4px] h-20 bg-white rounded-full"
            style={{
              transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() / 2}deg)`,
              transformOrigin: 'center bottom',
            }}
          ></div>

          {/* Minute Hand */}
          <div
            className="absolute top-5 left-1/2 w-[3px] h-28 bg-blue-300 rounded-full"
            style={{
              transform: `rotate(${time.getMinutes() * 6}deg)`,
              transformOrigin: 'center bottom',
            }}
          ></div>

          {/* Second Hand */}
          <div
            className="absolute top-5 left-1/2 w-[2px] h-28 bg-red-500 rounded-full"
            style={{
              transform: `rotate(${time.getSeconds() * 6}deg)`,
              transformOrigin: 'center bottom',
            }}
          ></div>

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>

      {/* Weather Widgets */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { value: '2.25', label: 'AM PM N S', icon: <Sun className="w-6 h-6" /> },
          { value: '4.27', label: 'W E/W F', icon: <Cloud className="w-6 h-6" /> },
          { value: '4.16', label: 'E/W/E 2019', icon: <Thermometer className="w-6 h-6" /> },
        ].map((widget, i) => (
          <Card key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <CardContent>
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
        <CardContent>
          <img
            src="/placeholder.svg?height=200&width=400"
            alt="Landscape"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-sm font-semibold">House</h3>
            <p className="text-xs text-white/60">Connected Innovations Notes.55</p>
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
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
      </div>

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
  );
}
