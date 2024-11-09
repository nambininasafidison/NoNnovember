import p3 from "@/assets/72177.jpg";
import AsHeader from "@/components/AsHeader";
import Post from "@/components/sections/feed/Post";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PhotoType, PostPropsType, UserProfileType } from "@/utils/Type";
import {
  Briefcase,
  Calendar,
  MapPin,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import UserPhotoGallery from "./User-photo-gallery";

const userProfile: UserProfileType = {
  userId: "a",
  name: "Stella Nova",
  email: "stellanova@example.com",
  gender: "Female",
  userAccountType: "Mentor",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Exploratrice de l'espace intérieur et extérieur. Passionnée de santé mentale et d'astronomie. 🚀🌟",
  location: "Station Spatiale Internationale",
  occupation: "Psychologue Spatiale",
  joinDate: "Membre depuis Mars 2023",
  friends: [],
  postsNumber: 42,
};

const userPosts: PostPropsType[] = [
  {
    postId: "kdfjdjf",
    author: {
      authorId: "sdsap53465qd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    body: "Aujourd'hui, j'ai médité en observant la Terre depuis la coupole. C'est incroyable comme ça met les choses en perspective ! 🌍✨ #MeditationSpatiale",
    likes: [""],
    timestamp: "Il y a 2 heures",
    supporters: [""],
    files: [p3],
    commentsNumber: 6,
  },
  {
    postId: "ewrer",
    author: {
      authorId: "sdspllapqd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    body: "Petit rappel : prenez soin de votre santé mentale comme vous prendriez soin d'une plante dans l'espace. Nourrissez-la, donnez-lui de la lumière, et soyez patient. 🌱🧠 #SantéMentale",
    likes: [""],
    timestamp: "Il y a 1 jour",
    supporters: [""],
    files: [p3],
    commentsNumber: 3,
  },
  {
    postId: "asdad",
    author: {
      authorId: "sds1223apqd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    body: "Question du jour : quelle est votre technique préférée pour gérer le stress ? Partagez dans les commentaires ! 🤔💭 #GestionDuStress",
    likes: [""],
    timestamp: "Il y a 3 jours",
    supporters: [""],
    files: [p3],
    commentsNumber: 4,
  },
];

const userPhotos: PhotoType[] = [];
userPosts.map((post) => {
  post.files?.forEach((file) =>
    userPhotos.push({
      id: post.postId,
      src: file,
      alt: post.body,
      likes: post.likes,
      comments: post.commentsNumber,
      body: post.body,
    })
  );
});

export default function UserProfilePublic() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState(userPosts);

  const handleChangeLikes = (value: string[], postId: string) => {
    const updatedposts = posts.map((post) =>
      post.postId === postId ? { ...post, likes: value } : post
    );
    setPosts([...updatedposts]);
  };

  const handleChangeSupporters = (value: string[], postId: string) => {
    const updatedPosts = posts.map((post) =>
      post.postId === postId ? { ...post, supporters: value } : post
    );
    setPosts([...updatedPosts]);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <AsHeader />
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-2xl font-bold text-slate-200">
                {userProfile.name}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {userProfile.name}
              </CardDescription>
              <p className="mt-2 text-slate-300">{userProfile.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <Badge variant="secondary">
                  <MapPin className="w-3 h-3 mr-1" />
                  {userProfile.location}
                </Badge>
                <Badge variant="secondary">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {userProfile.occupation}
                </Badge>
                <Badge variant="secondary">
                  <Calendar className="w-3 h-3 mr-1" />
                  {userProfile.joinDate}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center md:justify-start space-x-4 mb-4">
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
          <div className="flex justify-center md:justify-start space-x-4 text-slate-300">
            <span>
              <strong>{userProfile.friends.length}</strong> amis
            </span>
            <span>
              <strong>{userProfile.postsNumber}</strong> publications
            </span>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="posts">Publications</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="about">À propos</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="py-5 space-y-6">
            {posts.map((item, index) => (
              <Post
                key={index}
                post={item}
                onChangeLikes={(value, postId) =>
                  handleChangeLikes(value, postId)
                }
                onChangeSupporters={(value, postId) =>
                  handleChangeSupporters(value, postId)
                }
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos">
          <UserPhotoGallery photos={userPhotos} />
        </TabsContent>

        <TabsContent value="about">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-slate-200">
                À propos de Stella
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-slate-200">Bio</h3>
                <p className="text-slate-300">{userProfile.bio}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-slate-200">Localisation</h3>
                <p className="text-slate-300">{userProfile.location}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-slate-200">Profession</h3>
                <p className="text-slate-300">{userProfile.occupation}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-slate-200">Membre depuis</h3>
                <p className="text-slate-300">{userProfile.joinDate}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
