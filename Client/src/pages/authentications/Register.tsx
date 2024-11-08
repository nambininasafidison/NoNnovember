import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Rocket, UserPlus } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous implémenteriez la logique d'inscription
    console.log("Tentative d'inscription avec:", username, email, password);
  };

  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-200">
            <Rocket className="w-6 h-6 inline-block mr-2" />
            Rejoignez l&apos;Aventure Spatiale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-200">
                Nom d&apos;utilisateur
              </Label>
              <Input
                id="username"
                placeholder="AstronauteCool"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Adresse e-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="astronaute@espace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-200"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              <UserPlus className="w-4 h-4 mr-2" />
              S&apos;inscrire
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-400">
            Déjà un compte ?{" "}
            <a href="/login" className="text-blue-400 hover:underline">
              Se connecter
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
