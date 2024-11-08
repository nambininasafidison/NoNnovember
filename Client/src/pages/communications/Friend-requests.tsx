import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/layouts/Layout";
import { Check, UserPlus, X } from "lucide-react";
import { useState } from "react";

const friendRequests = [
  {
    id: 1,
    name: "Alice Astronaute",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 3,
  },
  {
    id: 2,
    name: "Bob Blackhole",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 1,
  },
  {
    id: 3,
    name: "Charlie Cosmos",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 5,
  },
];

const suggestedFriends = [
  {
    id: 4,
    name: "Diana Dimension",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 2,
  },
  {
    id: 5,
    name: "Ethan Étoile",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 4,
  },
  {
    id: 6,
    name: "Fiona Fusée",
    avatar: "/placeholder.svg?height=50&width=50",
    mutualFriends: 6,
  },
];

export default function FriendRequests() {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState(friendRequests);
  const [suggestions, setSuggestions] = useState(suggestedFriends);

  const handleAccept = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
    // Logique pour ajouter l'ami
  };

  const handleReject = (id: number) => {
    setRequests(requests.filter((request) => request.id !== id));
  };

  const handleSendRequest = (id: number) => {
    setSuggestions(suggestions.filter((suggestion) => suggestion.id !== id));
    // Logique pour envoyer une demande d'ami
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-slate-200">
          Gestion des Amis
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="requests">Demandes d&apos;Amis</TabsTrigger>
            <TabsTrigger value="suggestions">
              Suggestions d&apos;Amis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Demandes d&apos;Amis en Attente
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Gérez vos demandes d&apos;amis entrantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {requests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between mb-4 p-4 bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={request.avatar}
                            alt={request.name}
                          />
                          <AvatarFallback>
                            {request.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-200">
                            {request.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            {request.mutualFriends} amis en commun
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(request.id)}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accepter
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request.id)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suggestions">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Suggestions d&apos;Amis
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Découvrez de nouvelles personnes à ajouter à votre réseau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="flex items-center justify-between mb-4 p-4 bg-slate-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={suggestion.avatar}
                            alt={suggestion.name}
                          />
                          <AvatarFallback>
                            {suggestion.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-200">
                            {suggestion.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            {suggestion.mutualFriends} amis en commun
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleSendRequest(suggestion.id)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
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
