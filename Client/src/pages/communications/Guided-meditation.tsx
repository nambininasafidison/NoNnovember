import meghan from "@/assets/Meghan.mp3";
import no from "@/assets/NO.mp3";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import Layout from "@/layouts/Layout";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const meditations = [
  {
    id: 1,
    title: "Respiration Spatiale",
    duration: "5 min",
    category: "Débutant",
    audioSrc: meghan, // Ajouter la source audio pour chaque méditation
  },
  {
    id: 2,
    title: "Voyage Interstellaire",
    duration: "10 min",
    category: "Intermédiaire",
    audioSrc: no,
  },
  {
    id: 3,
    title: "Exploration de la Conscience Cosmique",
    duration: "15 min",
    category: "Avancé",
    audioSrc: meghan, // Ajouter la source audio pour chaque méditation
  },
  {
    id: 4,
    title: "Relaxation sur une Planète Lointaine",
    duration: "8 min",
    category: "Tous niveaux",
    audioSrc: no,
  },
  {
    id: 5,
    title: "Méditation de la Nébuleuse",
    duration: "12 min",
    category: "Intermédiaire",
    audioSrc: no,
  },
];

export default function GuidedMeditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [selectedAudio, setSelectedAudio] = useState(meditations[0]); // Par défaut, commencer avec la première méditation
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.src = selectedAudio.audioSrc; // Mettre à jour la source audio chaque fois que la méditation change
      audioRef.current.load(); // Recharger le fichier audio
    }
  }, [volume, selectedAudio]);

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

  // Avance rapide et retour rapide
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // Reculer de 10 secondes
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // Avancer de 10 secondes
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Méditation Guidée
        </h1>

        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Lecteur de Méditation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-slate-200">
                  {selectedAudio.title}
                </h2>
                <p className="text-slate-400">{formatTime(duration)}</p>
              </div>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <Button variant="outline" size="icon" onClick={skipBackward}>
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button size="lg" onClick={togglePlayPause}>
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
                <Button variant="outline" size="icon" onClick={skipForward}>
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>
              <Slider
                value={[currentTime]}
                max={duration}
                step={1}
                className="mb-2 bg-secondary"
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
                  className="w-full bg-secondary"
                  onValueChange={(value) => {
                    setVolume(value[0] / 100);
                  }}
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
                    className="w-full justify-start mb-5 h-10 text-left bg-accent border-none"
                    onClick={() => {
                      setSelectedAudio(meditation);
                    }}
                  >
                    <div className="space-y-3">
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
          src={selectedAudio.audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </Layout>
  );
}
