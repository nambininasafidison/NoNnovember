

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Calendar,
  MessageCircle,
  Rocket,
  Star,
  Users,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-200">
        Bienvenue, Explorateur Spatial!
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Votre Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold text-slate-200">Niveau 5</p>
                <p className="text-slate-400">Explorateur Novice</p>
              </div>
            </div>
            <Progress value={65} className="mb-2" />
            <p className="text-sm text-slate-400">
              65 XP pour le prochain niveau
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-200">Activités Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center text-slate-300">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                Quiz complété : Gestion du stress
              </li>
              <li className="flex items-center text-slate-300">
                <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />
                Nouveau post dans le groupe de soutien
              </li>
              <li className="flex items-center text-slate-300">
                <BookOpen className="w-4 h-4 mr-2 text-green-500" />
                Lu l&apos;article : Techniques de méditation
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommandations" className="mt-8">
        <TabsList className="mb-4">
          <TabsTrigger value="recommandations">Recommandations</TabsTrigger>
          <TabsTrigger value="evenements">Événements à venir</TabsTrigger>
        </TabsList>
        <TabsContent value="recommandations">
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-auto flex flex-col items-start p-4 space-y-2"
            >
              <Users className="w-6 h-6" />
              <span className="text-lg font-semibold">Rejoindre un groupe</span>
              <span className="text-sm text-slate-400">
                Connectez-vous avec d&apos;autres explorateurs
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-start p-4 space-y-2"
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-lg font-semibold">Commencer un quiz</span>
              <span className="text-sm text-slate-400">
                Testez vos connaissances en santé mentale
              </span>
            </Button>
            <Button
              variant="outline"
              className="h-auto flex flex-col items-start p-4 space-y-2"
            >
              <Rocket className="w-6 h-6" />
              <span className="text-lg font-semibold">Méditation guidée</span>
              <span className="text-sm text-slate-400">
                Commencez votre voyage intérieur
              </span>
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="evenements">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <ul className="space-y-4">
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">
                      Atelier sur la gestion du stress
                    </p>
                    <p className="text-sm text-slate-400">
                      Apprenez des techniques efficaces
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Demain, 18h
                  </Badge>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-200">
                      Groupe de discussion : Anxiété sociale
                    </p>
                    <p className="text-sm text-slate-400">
                      Partagez vos expériences
                    </p>
                  </div>
                  <Badge variant="secondary">
                    <Calendar className="w-4 h-4 mr-2" />
                    Jeudi, 20h
                  </Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
