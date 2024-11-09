import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhotoType } from "@/utils/Type";
import { Heart, MessageCircle, Share2, X } from "lucide-react";
import { useState } from "react";

const userProfile = {
  id: 1,
  name: "Stella Nova",
  username: "@stellanova",
  avatar: "/placeholder.svg?height=128&width=128",
};

const photos: PhotoType[] = [
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Vue de la Terre depuis l'espace",
    likes: ["245"],
    comments: 23,
    body: "La Terre vue depuis la Station Spatiale. Un rappel de notre place dans l'univers. 🌍✨ #VueSpaciale",
  },
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Séance de méditation en apesanteur",
    likes: ["189"],
    comments: 15,
    body: "Méditer en apesanteur : une expérience unique pour la pleine conscience. 🧘‍♀️🚀 #MéditationSpatiale",
  },
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Groupe de soutien virtuel",
    likes: ["132"],
    comments: 28,
    body: "Notre groupe de soutien virtuel en action. Ensemble, même à des années-lumière de distance. 👥💻 #SoutienEnLigne",
  },
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Expérience scientifique sur le sommeil dans l'espace",
    likes: ["201"],
    comments: 19,
    body: "Étudier le sommeil dans l'espace. Chaque découverte nous rapproche d'une meilleure santé mentale pour les futures missions. 🛌🔬 #ScienceDuSommeil",
  },
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Aurore boréale depuis l'espace",
    likes: ["378"],
    comments: 41,
    body: "Les aurores boréales vues d'en haut. Un spectacle qui apaise l'âme. 💚💜 #AuroraSpaciale",
  },
  {
    id: "",
    src: "/placeholder.svg?height=400&width=400",
    alt: "Exercice de cohésion d'équipe",
    likes: ["156"],
    comments: 12,
    body: "Exercice de cohésion d'équipe : construire la confiance, même en orbite ! 🤝🛰️ #ÉquipeSpatiale",
  },
];

export default function UserPhotoGallery(props: { photos: PhotoType[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const allPhotos = props.photos && props.photos.length ? props.photos : photos;

  return (
    <>
      <Card className="bg-slate-800 border-slate-700 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-slate-200">
            Galerie Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allPhotos.map((photo, index) => (
              <div key={photo.id + index} className="relative aspect-square">
                <img
                  alt={photo.alt}
                  className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setSelectedPhoto(photo)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={selectedPhoto !== null}
        onOpenChange={(open) => !open && setSelectedPhoto(null)}
      >
        <DialogContent className="max-w-3xl bg-slate-800 border-slate-700">
          <ScrollArea>
            <DialogHeader>
              <DialogTitle className="text-slate-200">
                Photo de {userProfile.name}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {selectedPhoto?.body}
              </DialogDescription>
            </DialogHeader>
            <div className="relative aspect-square">
              <img
                src={selectedPhoto?.src}
                alt={selectedPhoto?.alt}
                className="object-contain w-full h-full rounded-lg"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  {selectedPhoto?.likes.length}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {selectedPhoto?.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
