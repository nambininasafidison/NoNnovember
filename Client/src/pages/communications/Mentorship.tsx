import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { Calendar, MessageSquare, Search, Star } from "lucide-react";
import { useState } from "react";

const mentors = [
  {
    id: 1,
    name: "Capitaine Stella",
    specialty: "Gestion du Stress",
    rating: 4.8,
    sessions: 120,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Dr. Nova",
    specialty: "Anxiété",
    rating: 4.9,
    sessions: 85,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Conseiller Orion",
    specialty: "Dépression",
    rating: 4.7,
    sessions: 150,
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Thérapeute Luna",
    specialty: "Estime de Soi",
    rating: 4.6,
    sessions: 95,
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function Mentorship() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("find");

  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-200">
          Programme de Mentorat
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="find">Trouver un Mentor</TabsTrigger>
            <TabsTrigger value="my-sessions">Mes Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="find">
            <Card className="bg-slate-800 border-slate-700 mb-6">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Rechercher un Mentor
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Trouvez le mentor parfait pour vous guider dans votre voyage
                  spatial intérieur
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Rechercher par nom ou spécialité..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-slate-200"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={mentor.avatar} alt={mentor.name} />
                        <AvatarFallback>
                          {mentor.name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-slate-200">
                          {mentor.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {mentor.specialty}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-slate-200">{mentor.rating}</span>
                      <span className="text-slate-400">
                        ({mentor.sessions} sessions)
                      </span>
                    </div>
                    <Badge variant="secondary">{mentor.specialty}</Badge>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Réserver une Session</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800 text-slate-200">
                        <DialogHeader>
                          <DialogTitle>
                            Réserver une Session avec {mentor.name}
                          </DialogTitle>
                          <DialogDescription className="text-slate-400">
                            Choisissez une date et décrivez brièvement vos
                            attentes pour cette session.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label
                              htmlFor="session-date"
                              className="text-slate-200"
                            >
                              Date de la Session
                            </Label>
                            <Input
                              id="session-date"
                              type="date"
                              className="bg-slate-700 border-slate-600 text-slate-200"
                            />
                          </div>
                          <div>
                            <Label
                              htmlFor="session-description"
                              className="text-slate-200"
                            >
                              Description
                            </Label>
                            <Textarea
                              id="session-description"
                              placeholder="Décrivez brièvement ce que vous aimeriez aborder durant cette session..."
                              className="bg-slate-700 border-slate-600 text-slate-200"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">
                            Confirmer la Réservation
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-sessions">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Mes Sessions de Mentorat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {[...Array(3)].map((_, index) => (
                    <Card
                      key={index}
                      className="mb-4 bg-slate-700 border-slate-600"
                    >
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-slate-200">
                            Session avec {mentors[index % mentors.length].name}
                          </CardTitle>
                          <Badge variant="outline">À venir</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2 text-slate-400 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>15 Nov 2024, 14:00</span>
                        </div>
                        <p className="text-slate-300">
                          Sujet : Techniques de gestion du stress en mission
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contacter
                        </Button>
                        <Button variant="destructive">Annuler</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
