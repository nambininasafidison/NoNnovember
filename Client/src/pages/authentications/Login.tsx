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
import { Rocket, Lock } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous implémenteriez la logique de connexion
    console.log("Tentative de connexion avec:", email, password);
  };

  return (
    <div className="container px-4 py-8 flex items-center justify-center w-screen min-h-screen bg-background">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-slate-200">
            <Rocket className="w-6 h-6 inline-block mr-2" />
            Connexion à Votre Voyage Spatial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin}>
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
            <Button type="submit" className="w-full mt-4">
              <Lock className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-slate-400">
            Pas encore de compte ?{" "}
            <a href="/register" className="text-blue-400 hover:underline">
              S&apos;inscrire
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
