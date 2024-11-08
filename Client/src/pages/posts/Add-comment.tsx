import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function AddComment({ postId = "123" }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous implémenteriez la logique pour ajouter le commentaire
    console.log("Nouveau commentaire pour le post", postId, ":", comment);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-200">
            <MessageCircle className="w-6 h-6 inline-block mr-2" />
            Ajouter un Commentaire
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="comment" className="text-slate-200">
                  Votre commentaire
                </Label>
                <Textarea
                  id="comment"
                  placeholder="Partagez vos pensées ou votre soutien..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 bg-slate-700 border-slate-600 text-slate-200"
                  rows={3}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">
              <Send className="w-4 h-4 mr-2" />
              Publier le commentaire
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
