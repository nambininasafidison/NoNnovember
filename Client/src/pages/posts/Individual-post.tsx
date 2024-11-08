import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, Send } from "lucide-react";

// Exemple de données pour un post
const post = {
  id: 1,
  author: "AstronauteCool",
  avatar: "/placeholder.svg?height=50&width=50",
  content:
    "Aujourd'hui, j'ai fait un grand pas dans ma gestion du stress. J'ai essayé une nouvelle technique de méditation et je me sens vraiment plus calme. Quelqu'un d'autre a essayé la méditation récemment ?",
  likes: 15,
  comments: 3,
  category: "Bien-être",
};

// Exemple de commentaires
const comments = [
  {
    id: 1,
    author: "ExplorateurStellar",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "Super ! La méditation m'aide beaucoup aussi. Quelle technique as-tu essayée ?",
  },
  {
    id: 2,
    author: "VoyageurGalactique",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "J'aimerais essayer mais je ne sais pas par où commencer. Des conseils ?",
  },
  {
    id: 3,
    author: "PiloteInterstellaire",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Bravo pour cette initiative ! Continue comme ça !",
  },
];

export default function IndividualPost() {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau commentaire:", newComment);
    setNewComment("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-slate-800 border-slate-700 mb-8">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={post.avatar} alt={post.author} />
              <AvatarFallback>
                {post.author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-slate-200">{post.author}</CardTitle>
              <p className="text-sm text-slate-400">Il y a 2 heures</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 mb-4">{post.content}</p>
          <Badge variant="secondary">{post.category}</Badge>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" className="text-slate-400">
            <Heart className="w-4 h-4 mr-2" />
            {post.likes} J&apos;aime
          </Button>
          <Button variant="ghost" className="text-slate-400">
            <MessageCircle className="w-4 h-4 mr-2" />
            {post.comments} Commentaires
          </Button>
          <Button variant="ghost" className="text-slate-400">
            <Share2 className="w-4 h-4 mr-2" />
            Partager
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-200">Commentaires</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-slate-200">
                    {comment.author}
                  </p>
                  <p className="text-slate-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleCommentSubmit} className="w-full">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Ajouter un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-slate-700 border-slate-600 text-slate-200"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
                <span className="sr-only">Envoyer</span>
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
