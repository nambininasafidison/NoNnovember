import AvatarPicker from "@/components/AvatarPicker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layouts/Layout";
import { avatars } from "@/utils/avatars";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("dark");
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(
    undefined
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    console.log("Avatar sélectionné:", avatar);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Paramètres et Personnalisation
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 h-full grid grid-cols-2 md:flex md:space-x-4 gap-2 rounded-lg w-full">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Informations du Profil
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Mettez à jour vos informations personnelles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={selectedAvatar} alt="Avatar" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <Button
                    variant={"secondary"}
                    onClick={() => setIsPickerOpen(!isPickerOpen)}
                    className="hover:bg-foreground hover:text-background"
                  >
                    {isPickerOpen
                      ? "Appliquer le changement"
                      : "Changer l'avatar"}
                  </Button>
                  {isPickerOpen && (
                    <AvatarPicker
                      avatars={avatars}
                      onSelect={handleAvatarSelect}
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-200">
                    Nom d&apos;utilisateur
                  </Label>
                  <Input
                    id="username"
                    defaultValue="AstronauteNova"
                    className="bg-slate-700 border-slate-600 text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="astronaute@espace.com"
                    className="bg-slate-700 border-slate-600 text-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-slate-200">
                    Biographie
                  </Label>
                  <Textarea
                    id="bio"
                    defaultValue="Explorateur de l'espace intérieur et extérieur"
                    className="bg-slate-700 border-slate-600 text-slate-200"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sauvegarder les Modifications</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Préférences de Notification
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Gérez comment et quand vous recevez des notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">
                      Notifications par email
                    </Label>
                    <p className="text-sm text-slate-400">
                      Recevez des mises à jour par email
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">Notifications push</Label>
                    <p className="text-sm text-slate-400">
                      Recevez des notifications sur votre appareil
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="notification-frequency"
                    className="text-slate-200"
                  >
                    Fréquence des notifications
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue placeholder="Sélectionnez la fréquence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Temps réel</SelectItem>
                      <SelectItem value="daily">Quotidien</SelectItem>
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Sauvegarder les Préférences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">
                  Paramètres de Confidentialité
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Contrôlez qui peut voir votre profil et vos activités
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Visibilité du profil</Label>
                  <RadioGroup defaultValue="friends">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public" className="text-slate-200">
                        Public
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="friends" id="friends" />
                      <Label htmlFor="friends" className="text-slate-200">
                        Amis seulement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label htmlFor="private" className="text-slate-200">
                        Privé
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">Activité en ligne</Label>
                    <p className="text-sm text-slate-400">
                      Montrer quand vous êtes actif
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">
                      Historique de recherche
                    </Label>
                    <p className="text-sm text-slate-400">
                      Sauvegarder votre historique de recherche
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Mettre à jour les Paramètres</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-200">Apparence</CardTitle>
                <CardDescription className="text-slate-400">
                  Personnalisez l&apos;apparence de votre interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-200">Thème</Label>
                  <RadioGroup value={theme} onValueChange={setTheme}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="text-slate-200">
                        <Sun className="w-4 h-4 mr-2 inline-block" />
                        Clair
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="text-slate-200">
                        <Moon className="w-4 h-4 mr-2 inline-block" />
                        Sombre
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="text-slate-200">
                        Système
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size" className="text-slate-200">
                    Taille de la police
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="font-size"
                      className="bg-slate-700 border-slate-600 text-slate-200"
                    >
                      <SelectValue placeholder="Sélectionnez la taille de la police" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Petite</SelectItem>
                      <SelectItem value="medium">Moyenne</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-slate-200">Animations</Label>
                    <p className="text-sm text-slate-400">
                      Activer les animations de l&apos;interface
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Appliquer les Changements</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
