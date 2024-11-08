import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const games = [
  {
    id: 1,
    name: "Voyage Spatial Zen",
    category: "Relaxation",
    playTime: "5-10 min",
    difficulty: "Facile",
    link: "/games/voyage-spatial-zen",
  },
  {
    id: 2,
    name: "Défi des Émotions Galactiques",
    category: "Gestion des émotions",
    playTime: "10-15 min",
    difficulty: "Moyen",
    link: "/games/emotions-galactiques",
  },
  {
    id: 3,
    name: "Puzzle de la Pleine Conscience",
    category: "Mindfulness",
    playTime: "15-20 min",
    difficulty: "Difficile",
    link: "/games/puzzle-pleine-conscience",
  },
  {
    id: 4,
    name: "Aventure de l'Estime de Soi",
    category: "Développement personnel",
    playTime: "10-15 min",
    difficulty: "Moyen",
    link: "/games/aventure-estime-de-soi",
  },
  {
    id: 5,
    name: "Quête de la Résilience Cosmique",
    category: "Résilience",
    playTime: "20-25 min",
    difficulty: "Difficile",
    link: "/games/resilience-cosmique",
  },
  {
    id: 6,
    name: "Labyrinthe de l'Anxiété",
    category: "Gestion de l'anxiété",
    playTime: "10-15 min",
    difficulty: "Moyen",
    link: "/games/labyrinthe-anxiete",
  },
  {
    id: 7,
    name: "Constellation des Souvenirs Positifs",
    category: "Pensée positive",
    playTime: "5-10 min",
    difficulty: "Facile",
    link: "/games/constellation-souvenirs",
  },
  {
    id: 8,
    name: "Mission Communication Interstellaire",
    category: "Compétences sociales",
    playTime: "15-20 min",
    difficulty: "Moyen",
    link: "/games/communication-interstellaire",
  },
];

export default function InteractiveGames() {
  const [activeTab, setActiveTab] = useState("games");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-200">
        Jeux Interactifs
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="games">Jeux Disponibles</TabsTrigger>
          <TabsTrigger value="progress">Mon Progrès</TabsTrigger>
        </TabsList>

        <TabsContent value="games">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <Card key={game.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-200">{game.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {game.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{game.playTime}</span>
                  </div>
                  <Badge variant="secondary">{game.difficulty}</Badge>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to={game.link}>Jouer</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Mon Progrès de Jeu
              </CardTitle>
              <CardDescription className="text-slate-400">
                Suivez votre progression et débloquez des récompenses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {games.map((game) => (
                  <div key={game.id} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-slate-200">
                        {game.name}
                      </h3>
                      <Badge variant="outline">
                        {Math.floor(Math.random() * 5) + 1}/5 étoiles
                      </Badge>
                    </div>
                    <Progress value={Math.random() * 100} className="mb-2" />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>Niveau {Math.floor(Math.random() * 10) + 1}</span>
                      <span>{Math.floor(Math.random() * 1000)} points</span>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
