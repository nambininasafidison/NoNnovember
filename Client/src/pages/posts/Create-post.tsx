import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Rocket, Send } from "lucide-react";
import { useState } from "react";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous implémenteriez la logique pour publier le post
    console.log("Nouveau post:", { content, category });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-200">
            <Rocket className="w-6 h-6 inline-block mr-2" />
            Partagez Votre Expérience Spatiale
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="content" className="text-slate-200">
                  Votre message
                </Label>
                <Textarea
                  id="content"
                  placeholder="Partagez vos pensées, expériences ou demandez du soutien..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
                  rows={5}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-slate-200">
                  Catégorie
                </Label>
                <Select onValueChange={setCategory} required>
                  <SelectTrigger className="mt-1 bg-slate-700 border-slate-600 text-slate-200">
                    <SelectValue placeholder="Choisissez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motivation">Motivation</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="victoire">Victoire</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              <Send className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
