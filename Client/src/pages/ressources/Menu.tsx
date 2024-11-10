import rewards from "@/assets/menu-icones/badges.png";
import event from "@/assets/menu-icones/check.png";
import mentorship from "@/assets/menu-icones/comunications.png";
import dashboard from "@/assets/menu-icones/dashboard.png";
import mood from "@/assets/menu-icones/diary.png";
import games from "@/assets/menu-icones/gamepad.png";
import meditation from "@/assets/menu-icones/meditation.png";
import friends from "@/assets/menu-icones/people.png";
import ressources from "@/assets/menu-icones/stakeholder.png";
import { AlertDialogDemo } from "@/components/AlertDialogDemo";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthProvider";
import Layout from "@/layouts/Layout";
import {
  Brain,
  FileText,
  HelpCircle,
  HelpingHand,
  Search,
  Settings,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const menu = [
  {
    id: 1,
    name: "Tableau de bord",
    icone: dashboard,
    link: "/dashboard",
  },
  { id: 2, name: "Evènement", icone: event, link: "/event" },
  {
    id: 3,
    name: "Amis",
    icone: friends,
    link: "/friends",
  },
  {
    id: 4,
    name: "Jeux",
    icone: games,
    link: "/games",
  },
  {
    id: 5,
    name: "Méditation guidé",
    icone: meditation,
    link: "/guidedMeditation",
  },
  {
    id: 6,
    name: "Mentorat",
    icone: mentorship,
    link: "/mentorship",
  },
  {
    id: 7,
    name: "Journal d'humeur",
    icone: mood,
    link: "/moodJournal",
  },
  {
    id: 8,
    name: "Ressources",
    icone: ressources,
    link: "/resources",
  },
  {
    id: 9,
    name: "Récompenses et badges",
    icone: rewards,
    link: "/rewards",
  },
];

export default function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const { clearTokens } = useAuth();

  const filteredMenus = menu.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Menu</h1>

        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Rechercher des menus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenus.map((menu) => (
            <Link to={menu.link} key={menu.id + menu.link}>
              <Card key={menu.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="w-16 my-5">
                    <img
                      src={menu.icone}
                      alt={menu.name}
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-slate-200 flex justify-between items-center">
                    {menu.name}{" "}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <div className="my-10 ">
          <Separator className="my-5" />
          <Link to={"/help"}>
            <div className="flex gap-4 w-fit text-xl items-center">
              <HelpCircle className="h-12 w-12" />
              Aide et soutien
            </div>
          </Link>
          <Separator className="my-5" />

          <Link to={"/supportGroups"}>
            <div className="flex gap-4 w-fit text-xl items-center">
              <HelpingHand className="h-12 w-12" />
              Groupe de soutien
            </div>
          </Link>
          <Separator className="my-5" />
          <Link to={"/profile"}>
            <div className="flex gap-4 w-fit text-xl items-center">
              <UserCog className="h-12 w-12" />
              Espace Personnel{" "}
            </div>
          </Link>
          <Separator className="my-5" />
          <Link to="/quiz">
            <div className="flex gap-4 w-fit text-xl items-center">
              <Brain className="h-12 w-12" />
              Take Quiz
            </div>
          </Link>
          <Separator className="my-5" />
          <Link to="/createPost">
            <div className="flex gap-4 w-fit text-xl items-center">
              <FileText className="h-12 w-12" />
              Create Post
            </div>
          </Link>
          <Separator className="my-5" />
          <Link to={"/settings"}>
            <div className="flex gap-4 w-fit text-xl items-center">
              <Settings className="h-12 w-12" />
              Paramètres et confidentialité
            </div>
          </Link>
          <Separator className="my-5" />
          <AlertDialogDemo
            label="Se déconnecter"
            title="Êtes-vous sûr de vouloir vous déconnecter ?"
            className="text-xl text-background bg-foreground hover:text-secondary, hover:bg-secondary-foreground p-6 px-8 md:w-fit w-full"
            alertStatus={() => {
              clearTokens();
            }}
          />
        </div>
      </div>
    </Layout>
  );
}
