import AsHeader from "@/components/AsHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Heart, Rocket, Star } from "lucide-react";
import { useState } from "react";

export default function PersonalSpace() {
  const [moodLog, setMoodLog] = useState("");
  const [gratitudeLog, setGratitudeLog] = useState("");

  const handleMoodLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Journal d'humeur soumis:", moodLog);
    setMoodLog("");
  };

  const handleGratitudeLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Journal de gratitude soumis:", gratitudeLog);
    setGratitudeLog("");
  };

  return (
    <div className="container mx-auto px-4 md:py-24 py-14">
      <AsHeader />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt="Astronaute"
            />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="md:text-3xl text-xl font-bold text-slate-200">
              Espace Personnel d&apos;Astronaute
            </h1>
            <p className="text-slate-400">Explorateur Niveau 11 • 450 XP</p>
          </div>
        </div>

        <Tabs defaultValue="tableau-de-bord">
          <TabsList className="mb-8 h-full grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg md:w-fit w-full">
            <TabsTrigger value="tableau-de-bord">
              <Star className="w-4 h-4 md:hidden" /> Tableau de Bord
            </TabsTrigger>
            <TabsTrigger value="journal-humeur">
              <Heart className="w-4 h-4 md:hidden" /> Journal d'Humeur
            </TabsTrigger>
            <TabsTrigger value="journal-gratitude">
              <BookOpen className="w-4 h-4 md:hidden" /> Journal de Gratitude
            </TabsTrigger>
            <TabsTrigger value="realisations">
              <Rocket className="w-4 h-4 md:hidden" /> Réalisations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tableau-de-bord">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Aperçu de Votre Bien-être
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-300">
                        Progression vers le Niveau Suivant
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        450/1000 XP
                      </span>
                    </div>
                    <Progress value={45} className="w-full bg-muted" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-200">
                      Réalisations Récentes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <Star className="w-4 h-4 mr-1" />
                        Journaliste Assidu
                      </Badge>
                      <Badge variant="secondary">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Chercheur de Connaissances
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-200">
                      Objectifs de Bien-être
                    </h3>
                    <ul className="list-disc list-inside text-slate-300">
                      <li>Méditer pendant 10 minutes par jour</li>
                      <li>Compléter 3 quiz cette semaine</li>
                      <li>Noter son humeur pendant 7 jours consécutifs</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal-humeur">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Journal d&apos;Humeur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMoodLogSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="mood"
                        className="block text-sm font-medium text-slate-300"
                      >
                        Comment vous sentez-vous aujourd&apos;hui ?
                      </label>
                      <Input
                        id="mood"
                        placeholder="ex: Heureux, Anxieux, Excité"
                        value={moodLog}
                        onChange={(e) => setMoodLog(e.target.value)}
                        className="mt-1 bg-slate-700 text-slate-200 border-slate-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mood-details"
                        className="block text-sm font-medium text-slate-300"
                      >
                        Des pensées ou événements spécifiques influencent-ils
                        votre humeur ?
                      </label>
                      <Textarea
                        id="mood-details"
                        placeholder="Partagez plus sur vos sentiments..."
                        value={moodLog}
                        onChange={(e) => setMoodLog(e.target.value)}
                        className="mt-1 bg-slate-700 text-slate-200 border-slate-600"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="mt-4">
                    Enregistrer l&apos;Humeur
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="journal-gratitude">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Journal de Gratitude
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGratitudeLogSubmit}>
                  <div>
                    <label
                      htmlFor="gratitude"
                      className="block text-sm font-medium text-slate-300"
                    >
                      De quoi êtes-vous reconnaissant aujourd&apos;hui ?
                    </label>
                    <Textarea
                      id="gratitude"
                      placeholder="Listez trois choses pour lesquelles vous êtes reconnaissant..."
                      value={gratitudeLog}
                      onChange={(e) => setGratitudeLog(e.target.value)}
                      className="mt-1 bg-slate-700 text-slate-200 border-slate-600"
                    />
                  </div>
                  <Button type="submit" className="mt-4">
                    Enregistrer la Gratitude
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="realisations">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Vos Réalisations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Badge
                    variant="secondary"
                    className="p-4 flex items-center justify-center"
                  >
                    <Star className="w-6 h-6 mr-2" />
                    Série de 7 Jours
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="p-4 flex items-center justify-center"
                  >
                    <BookOpen className="w-6 h-6 mr-2" />
                    Maître du Quiz
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="p-4 flex items-center justify-center"
                  >
                    <Heart className="w-6 h-6 mr-2" />
                    Gourou de la Gratitude
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="p-4 flex items-center justify-center"
                  >
                    <Rocket className="w-6 h-6 mr-2" />
                    Expert en Pleine Conscience
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
