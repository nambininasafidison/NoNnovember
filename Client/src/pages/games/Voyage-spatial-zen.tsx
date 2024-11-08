import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Star, Clock, ArrowLeft } from "lucide-react";

export default function VoyageSpatialZen() {
  const [stress, setStress] = useState(50);
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        // Simulate stress reduction
        setStress((prevStress) => Math.max(0, prevStress - 0.2));
        // Update score based on stress reduction
        setScore((prevScore) => prevScore + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, time]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStressChange = (value: number[]) => {
    setStress(value[0]);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour aux jeux
      </Button>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-200">
            Voyage Spatial Zen
          </CardTitle>
          <p className="text-slate-400">
            Réduisez votre stress en naviguant dans l&apos;espace
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-slate-200">
              <Clock className="mr-2 h-4 w-4" />
              {formatTime(time)}
            </Badge>
            <Badge variant="outline" className="text-slate-200">
              <Star className="mr-2 h-4 w-4" />
              Score: {score}
            </Badge>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="stress"
              className="text-sm font-medium text-slate-200"
            >
              Niveau de Stress
            </label>
            <Slider
              id="stress"
              max={100}
              step={1}
              value={[stress]}
              onValueChange={handleStressChange}
              className="w-full"
            />
          </div>

          <div className="relative h-60 bg-slate-900 rounded-lg overflow-hidden">
            {/* Placeholder for game visualization */}
            <div
              className="absolute inset-0 bg-blue-500 opacity-20"
              style={{ height: `${100 - stress}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl text-slate-200">🚀</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Progrès
            </label>
            <Progress value={(300 - time) / 3} className="w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={togglePlay} className="w-full">
            {isPlaying ? "Pause" : "Jouer"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
