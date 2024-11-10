import astro from "@/assets/Astro_gen.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Calendar,
  Gamepad,
  Heart,
  LogIn,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100 pb-12">
      <header className="container mx-auto px-4 py-5">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-5">
              <div className="aspect-video h-20 w-20">
                <img src={astro} alt="astrogen" className="object-cover" />
              </div>
              <h1 className="md:text-3xl text-xl font-bold">Astrogen</h1>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-1 items-center justify-center"
          >
            <Button variant="outline" asChild className="text-foreground">
              <Link to="/login">
                <LogIn />
                <span className="md:block hidden ml-2">Connexion</span>
              </Link>
            </Button>
            <Button
              variant={"secondary"}
              asChild
              className="hover:bg-foreground"
            >
              <Link to="/register">
                <UserPlus />
                <span className="md:block hidden ml-2">Inscription</span>
              </Link>
            </Button>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            Explorez votre univers intérieur
          </h2>
          <p className="text-xl mb-8">
            Rejoignez notre communauté spatiale dédiée à la santé mentale des
            jeunes explorateurs comme vous.
          </p>
          <Button size="lg" asChild>
            <Link to="/register">Commencez votre voyage</Link>
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="mb-8 h-full grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg md:w-fit w-full">
              <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
              <TabsTrigger value="community">Communauté</TabsTrigger>
              <TabsTrigger value="events">Événements</TabsTrigger>
              <TabsTrigger value="resources">Ressources</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 min-h-64">
                    {[
                      {
                        icon: Heart,
                        title: "Suivi de l'humeur",
                        description:
                          "Enregistrez et analysez vos émotions quotidiennes",
                      },
                      {
                        icon: Users,
                        title: "Groupes de soutien",
                        description:
                          "Connectez-vous avec des pairs partageant les mêmes idées",
                      },
                      {
                        icon: Calendar,
                        title: "Méditations guidées",
                        description:
                          "Pratiquez la pleine conscience avec nos experts",
                      },
                      {
                        icon: Gamepad,
                        title: "Jeux thérapeutiques",
                        description: "Améliorez votre santé mentale en jouant",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="pt-6 bg-primary rounded-lg">
                            <feature.icon className="w-12 min-h-24 mb-4 text-blue-500" />
                            <h3 className="text-lg font-semibold mb-2">
                              {feature.title}
                            </h3>
                            <p className="text-slate-300">
                              {feature.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="community">
              <Card>
                <CardContent className="pt-6 min-h-64">
                  <h3 className="text-2xl font-bold mb-4">
                    Rejoignez une communauté bienveillante
                  </h3>
                  <p className="mb-4 text-secondary">
                    Connectez-vous avec des milliers de jeunes qui partagent des
                    expériences similaires. Ensemble, nous créons un espace sûr
                    pour grandir et s&apos;épanouir.
                  </p>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center items-center space-x-2"
                  >
                    <Users className="w-8 h-8 text-blue-500" />
                    <span className="text-3xl font-bold">10,000+</span>
                    <span className="text-xl">membres actifs</span>
                  </motion.div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="events">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-8">
                    Événements à venir
                  </h3>
                  <ul className="space-y-4 min-h-64">
                    {[
                      {
                        title: "Atelier de gestion du stress",
                        date: "15 Mai 2024",
                        participants: 50,
                      },
                      {
                        title: "Séance de méditation collective",
                        date: "22 Mai 2024",
                        participants: 100,
                      },
                      {
                        title: "Conférence : La santé mentale à l'ère spatiale",
                        date: "1 Juin 2024",
                        participants: 200,
                      },
                    ].map((event, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex justify-between items-center border-b border-slate-700 pb-2"
                      >
                        <div>
                          <h4 className="font-semibold">{event.title}</h4>
                          <p className="text-sm text-slate-400">{event.date}</p>
                        </div>
                        <Badge variant="secondary">
                          {event.participants} participants
                        </Badge>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">
                    Ressources exclusives
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        title: "Guide de méditation spatiale",
                        type: "E-book",
                        rating: 4.8,
                      },
                      {
                        title: "Podcast : Voix de l'espace intérieur",
                        type: "Audio",
                        rating: 4.9,
                      },
                      {
                        title:
                          "Cours en ligne : Gestion du stress en apesanteur",
                        type: "Vidéo",
                        rating: 4.7,
                      },
                    ].map((resource, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card>
                          <CardContent className="pt-6 min-h-64 bg-primary rounded-lg">
                            <h4 className="font-semibold mb-2">
                              {resource.title}
                            </h4>
                            <p className="text-sm text-slate-400 mb-2">
                              {resource.type}
                            </p>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 mr-1" />
                              <span>{resource.rating}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.section>
      </main>

      <footer className="bg-slate-900 py-8 mt-12 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Astrogen. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
