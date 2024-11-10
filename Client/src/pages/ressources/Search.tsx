import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, MessageCircle, Star } from "lucide-react";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
}

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  participants: number;
}

interface Resource {
  id: number;
  title: string;
  type: string;
  rating: number;
}

interface SearchResults {
  users: User[];
  posts: Post[];
  events: Event[];
  resources: Resource[];
}

// Example search data
const searchResults: SearchResults = {
  users: [
    {
      id: 1,
      name: "Alice Astronaute",
      username: "@alice_astro",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Exploratrice de l'espace et de l'esprit 🚀🧠",
    },
    {
      id: 2,
      name: "Bob Blackhole",
      username: "@bob_bh",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Passionné de trous noirs et de méditation profonde 🕳️🧘‍♂️",
    },
  ],
  posts: [
    {
      id: 1,
      author: "Charlie Cosmos",
      content:
        "La méditation en apesanteur est une expérience incroyable ! #SantéMentaleSpaciale",
      likes: 42,
      comments: 7,
    },
    {
      id: 2,
      author: "Diana Dimension",
      content:
        "Nouveau guide : '10 techniques pour gérer l'anxiété lors de longs voyages spatiaux' 📚🌠",
      likes: 89,
      comments: 15,
    },
  ],
  events: [
    {
      id: 1,
      title: "Atelier de Pleine Conscience Interstellaire",
      date: "2024-12-15",
      participants: 50,
    },
    {
      id: 2,
      title: "Conférence : La Psychologie dans l'Exploration Spatiale",
      date: "2025-01-20",
      participants: 200,
    },
  ],
  resources: [
    {
      id: 1,
      title: "Guide de Méditation pour Astronautes",
      type: "PDF",
      rating: 4.8,
    },
    {
      id: 2,
      title: "Podcast : Santé Mentale en Orbite",
      type: "Audio",
      rating: 4.6,
    },
  ],
};

type SearchCategory = keyof SearchResults;
type SearchResult = User | Post | Event | Resource;

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<SearchCategory | "all">("all");

  const filterResults = (category: SearchCategory) => {
    return searchResults[category].filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const allResults: SearchResult[] = [
    ...filterResults("users"),
    ...filterResults("posts"),
    ...filterResults("events"),
    ...filterResults("resources"),
  ];

  const renderResultCard = (result: SearchResult) => {
    if ("username" in result) {
      return (
        <Card key={result.id} className="mb-4 bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-2">
              <Avatar>
                <AvatarImage src={result.avatar} alt={result.name} />
                <AvatarFallback>{result.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-slate-200">
                  {result.name}
                </h3>
                <p className="text-sm text-slate-400">{result.username}</p>
              </div>
            </div>
            <p className="text-slate-300">{result.bio}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Voir le profil
            </Button>
          </CardFooter>
        </Card>
      );
    } else if ("content" in result) {
      return (
        <Card key={result.id} className="mb-4 bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-slate-200 mb-2">
              {result.author}
            </h3>
            <p className="text-slate-300 mb-2">{result.content}</p>
            <div className="flex space-x-4 text-slate-400">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {result.likes}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {result.comments}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Voir le post
            </Button>
          </CardFooter>
        </Card>
      );
    } else if ("date" in result) {
      return (
        <Card key={result.id} className="mb-4 bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-slate-200">
              {result.title}
            </h3>
            <p className="text-sm text-slate-400">Date: {result.date}</p>
            <p className="text-sm text-slate-400">
              Participants: {result.participants}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Plus d&apos;infos
            </Button>
          </CardFooter>
        </Card>
      );
    } else {
      return (
        <Card key={result.id} className="mb-4 bg-slate-800 border-slate-700">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-slate-200">
              {result.title}
            </h3>
            <p className="text-sm text-slate-400">Type: {result.type}</p>
            <div className="flex items-center mt-2">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-slate-300">{result.rating}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Accéder à la ressource
            </Button>
          </CardFooter>
        </Card>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div
        className={`fixed top-0 right-0 bg-popover border-border backdrop-blur-lg border-b z-40 w-full flex items-center pr-5`}
      >
        <ArrowLeft
          onClick={() => window.history.back()}
          className="h-10 w-10 mx-4 my-2"
        />
        <Input
          type="text"
          placeholder="Rechercher des utilisateurs, posts, événements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 bg-none border-none text-xl py-5 truncate"
        />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-slate-200">Resultats</h1>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SearchCategory | "all")}
      >
        <TabsList className="mb-4 h-full bg-slate-800 border-slate-700 grid grid-cols-2 gap-2 md:flex md:space-x-4 rounded-lg md:w-fit w-full">
          <TabsTrigger value="all">Tout</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ScrollArea className="h-[75vh] -mr-3 pr-3">
            {allResults.map((result) => renderResultCard(result))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="users">
          <ScrollArea className="h-[75vh] -mr-3 pr-3">
            {filterResults("users").map((user) => renderResultCard(user))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="posts">
          <ScrollArea className="h-[75vh] -mr-3 pr-3">
            {filterResults("posts").map((post) => renderResultCard(post))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="events">
          <ScrollArea className="h-[75vh] -mr-3 pr-3">
            {filterResults("events").map((event) => renderResultCard(event))}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="resources">
          <ScrollArea className="h-[75vh] -mr-3 pr-3">
            {filterResults("resources").map((resource) =>
              renderResultCard(resource)
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
