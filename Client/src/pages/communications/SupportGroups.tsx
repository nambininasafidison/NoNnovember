import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { Lock, Plus, Search, Unlock, Users } from "lucide-react";
import { useState } from "react";

const supportGroups = [
  {
    id: 1,
    name: "Gestion du Stress Interstellaire",
    members: 42,
    category: "Stress",
    isprivate: true,
  },
  {
    id: 2,
    name: "Anxiété en Apesanteur",
    members: 28,
    category: "Anxiété",
    isprivate: false,
  },
  {
    id: 3,
    name: "Dépression dans l'Espace Profond",
    members: 35,
    category: "Dépression",
    isPrivate: true,
  },
  {
    id: 4,
    name: "Sommeil en Orbite",
    members: 20,
    category: "Sommeil",
    isPromised: false,
  },
  {
    id: 5,
    name: "Méditation Cosmique",
    members: 50,
    category: "Bien-être",
    isPromised: false,
  },
];

export default function SupportGroups() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");

  const filteredGroups = supportGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau groupe créé:", {
      name: newGroupName,
      description: newGroupDescription,
    });
    setNewGroupName("");
    setNewGroupDescription("");
    // Ici, vous ajouteriez la logique pour créer effectivement le groupe
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Groupes de Soutien
        </h1>

        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Rechercher des groupes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-200"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hover:bg-muted">
                <Plus className="w-4 h-4 mr-2" />
                Créer un Groupe
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 text-slate-200">
              <DialogHeader>
                <DialogTitle>Créer un Nouveau Groupe</DialogTitle>
                <DialogDescription>
                  Créez un espace sûr pour discuter et se soutenir mutuellement.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateGroup}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name" className="text-slate-200">
                      Nom du Groupe
                    </Label>
                    <Input
                      id="group-name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-200"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="group-description"
                      className="text-slate-200"
                    >
                      Description
                    </Label>
                    <Textarea
                      id="group-description"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-slate-200"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button type="submit">Créer le Groupe</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200 flex justify-between items-center">
                  {group.name}{" "}
                  {group.isPrivate ? (
                    <Badge variant="secondary">
                      <Lock className="w-4 h-4 mr-1" />
                      Privé
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-secondary">
                      <Unlock className="w-4 h-4 mr-1 " />
                      Public
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-slate-400 mb-4">
                  <Users className="w-4 h-4" />
                  <span>{group.members} membres</span>
                </div>
                <Badge className="pb-1">{group.category}</Badge>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-background text-foreground hover:bg-secondary">
                  Rejoindre le Groupe
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
