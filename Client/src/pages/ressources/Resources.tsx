import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layouts/Layout";
import { BookOpen, Headphones, Search, Video } from "lucide-react";
import { useState } from "react";

const resources = [
  {
    id: 1,
    title: "Comprendre l'anxiété",
    type: "Article",
    category: "Anxiété",
  },
  {
    id: 2,
    title: "Techniques de respiration pour la relaxation",
    type: "Vidéo",
    category: "Stress",
  },
  {
    id: 3,
    title: "Méditation guidée pour débutants",
    type: "Audio",
    category: "Méditation",
  },
  {
    id: 4,
    title: "Construire une image de soi positive",
    type: "Article",
    category: "Estime de soi",
  },
  {
    id: 5,
    title: "Gérer les pensées négatives",
    type: "Vidéo",
    category: "Dépression",
  },
  {
    id: 6,
    title: "Podcast sur la pleine conscience",
    type: "Audio",
    category: "Mindfulness",
  },
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredResources = resources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeTab === "all" || resource.type.toLowerCase() === activeTab)
  );

  const ResourceIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "Article":
        return <BookOpen className="w-4 h-4" />;
      case "Vidéo":
        return <Video className="w-4 h-4" />;
      case "Audio":
        return <Headphones className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-200">Ressources</h1>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Rechercher des ressources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Tout</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="vidéo">Vidéos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                Ressources Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4 ">
                {filteredResources.map((resource) => (
                  <Button
                    key={resource.id}
                    variant="outline"
                    className="w-full justify-start mb-4 h-10 text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <ResourceIcon type={resource.type} />
                      <div>
                        <p className="font-semibold">{resource.title}</p>
                        <div className="flex space-x-2 mt-1">
                          <Badge variant="secondary">{resource.type}</Badge>
                          <Badge>{resource.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </Layout>
  );
}
