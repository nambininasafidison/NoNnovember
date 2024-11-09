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
import Layout from "@/layouts/Layout";
import {
  Award,
  BookOpen,
  Heart,
  Rocket,
  Star,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";

const badges = [
  {
    id: 1,
    name: "Première Connexion",
    icon: Rocket,
    description: "Bienvenue à bord de notre vaisseau spatial !",
    earned: true,
  },
  {
    id: 2,
    name: "Explorateur Social",
    icon: Users,
    description: "Rejoignez 5 groupes de soutien",
    earned: true,
  },
  {
    id: 3,
    name: "Maître de la Méditation",
    icon: Heart,
    description: "Complétez 10 sessions de méditation",
    earned: false,
  },
  {
    id: 4,
    name: "Érudit de l'Espace",
    icon: BookOpen,
    description: "Lisez 20 articles sur la santé mentale",
    earned: false,
  },
  {
    id: 5,
    name: "Super Nova",
    icon: Star,
    description: "Obtenez 100 likes sur vos posts",
    earned: false,
  },
];

const rewards = [
  {
    id: 1,
    name: "Consultation Gratuite",
    icon: Zap,
    description: "Une session gratuite avec un professionnel",
    cost: 500,
  },
  {
    id: 2,
    name: "Badge Personnalisé",
    icon: Award,
    description: "Créez votre propre badge unique",
    cost: 1000,
  },
  {
    id: 3,
    name: "Accès VIP",
    icon: Trophy,
    description: "Accès anticipé aux nouvelles fonctionnalités",
    cost: 2000,
  },
];

export default function RewardsAndBadges() {
  const [activeTab, setActiveTab] = useState("badges");
  const [points, setPoints] = useState(750);

  const earnedBadges = badges.filter((badge) => badge.earned);
  const unearnedBadges = badges.filter((badge) => !badge.earned);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Récompenses et Badges
        </h1>

        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-slate-200">
              Vos Points Stellaires
            </CardTitle>
            <CardDescription className="text-slate-400">
              Gagnez des points en participant activement à la communauté
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-slate-200">
                {points}
              </span>
              <span className="text-sm text-slate-400">
                Prochain palier : 1000
              </span>
            </div>
            <Progress value={(points % 1000) / 10} className="w-full" />
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="rewards">Récompenses</TabsTrigger>
          </TabsList>
          <TabsContent value="badges">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-200">
                    Badges Gagnés
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {earnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center space-x-4 mb-4"
                      >
                        <badge.icon className="w-8 h-8 text-yellow-500" />
                        <div>
                          <p className="font-semibold text-slate-200">
                            {badge.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-slate-200">
                    Badges à Débloquer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {unearnedBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="flex items-center space-x-4 mb-4"
                      >
                        <badge.icon className="w-8 h-8 text-slate-500" />
                        <div>
                          <p className="font-semibold text-slate-200">
                            {badge.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="rewards">
            <div className="grid md:grid-cols-3 gap-6">
              {rewards.map((reward) => (
                <Card key={reward.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-slate-200">
                        {reward.name}
                      </CardTitle>
                      <reward.icon className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400">{reward.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => setPoints(points - reward.cost)}
                      disabled={points < reward.cost}
                    >
                      Échanger ({reward.cost} points)
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
