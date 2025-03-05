import { Cloud, Sun, Thermometer } from 'lucide-react';
import { Card, CardContent } from '@mui/material';
import WeatherComponent from "./weather";



function Cards() {
  let weather = WeatherComponent();
  // console.log(weather['forecast'][1]['weather'][0]['description']);
  // console.log(weather['forecast'][1]['main']['temp']);
  // console.log(weather['forecast'][2]['weather'][0]['description']);
  // console.log(weather['forecast'][2]['main']['temp']);
  // console.log(weather['forecast'][3]['weather'][0]['description']);
  // console.log(weather['forecast'][3]['main']['temp']);
  if (!weather || !weather['forecast']) {
    return <div>Loading Weather Data...</div>;
  }
  return(<div className="grid grid-cols-3 gap-4">
    {[
      { value: '2.25', label: 'AM PM N S', icon: <Thermometer className="w-6 h-6" /> },
      { value: '4.27', label: 'W E/W F', icon: <Thermometer className="w-6 h-6" /> },
      { value: '4.16', label: 'E/W/E 2019', icon: <Thermometer className="w-6 h-6" /> },
    ].map((widget, i) => (
      <Card key={i} sx={{ backgroundColor: "transparent" }} style={{ "box-shadow":"0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff" }}>
        <CardContent className="p-4">
          <div className="flex flex-col items-center gap-2" style={{ color:"white" , "text-shadow":"0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff"}}>
            {widget.icon}
            <div className="text-xl font-bold" style={{ color:"white" , "text-shadow":"0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff"}}>{weather['forecast'][i + 1]['main']['temp']}</div>
            <div className="text-xl font-bold" style={{ color:"white" , "text-shadow":"0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff"}}>{weather['forecast'][i + 1]['weather'][0]['description']}</div>
            {/* <div className="text-xs text-white/60">{widget.label}</div> */}
          </div>
        </CardContent>
      </Card>
    ))}
</div>
);


}
export default Cards;

