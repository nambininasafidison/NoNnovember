import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const meditations = [
  {
    id: 1,
    title: "Respiration Spatiale",
    duration: "5 min",
    category: "Débutant",
  },
  {
    id: 2,
    title: "Voyage Interstellaire",
    duration: "10 min",
    category: "Intermédiaire",
  },
  {
    id: 3,
    title: "Exploration de la Conscience Cosmique",
    duration: "15 min",
    category: "Avancé",
  },
  {
    id: 4,
    title: "Relaxation sur une Planète Lointaine",
    duration: "8 min",
    category: "Tous niveaux",
  },
  {
    id: 5,
    title: "Méditation de la Nébuleuse",
    duration: "12 min",
    category: "Intermédiaire",
  },
];

export default function GuidedMeditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-200">
        Méditation Guidée
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">
              Lecteur de Méditation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-slate-200">
                Respiration Spatiale
              </h2>
              <p className="text-slate-400">5:00</p>
            </div>
            <div className="flex justify-center items-center space-x-4 mb-4">
              <Button variant="outline" size="icon">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button size="lg" onClick={togglePlayPause}>
                {isPlaying ? (
                  <Pause className="h-6 w-6" />
                ) : (
                  <Play className="h-6 w-6" />
                )}
              </Button>
              <Button variant="outline" size="icon">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="mb-2"
              onValueChange={(value) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = value[0];
                }
              }}
            />
            <div className="flex justify-between text-sm text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-2 w-full">
              <Volume2 className="h-4 w-4 text-slate-400" />
              <Slider
                value={[volume * 100]}
                max={100}
                step={1}
                className="w-full"
                onValueChange={(value) => setVolume(value[0] / 100)}
              />
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">
              Méditations Disponibles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              {meditations.map((meditation) => (
                <Button
                  key={meditation.id}
                  variant="outline"
                  className="w-full justify-start mb-2 text-left"
                >
                  <div>
                    <p className="font-semibold text-slate-200">
                      {meditation.title}
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <Badge variant="secondary">{meditation.duration}</Badge>
                      <Badge>{meditation.category}</Badge>
                    </div>
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <audio
        ref={audioRef}
        src="/path-to-your-audio-file.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
}
