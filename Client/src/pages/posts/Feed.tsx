import p1 from "@/assets/16218.jpg";
import p2 from "@/assets/16494.jpg";
import p3 from "@/assets/72177.jpg";
import Post from "@/components/sections/feed/Post";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PostPropsType } from "@/utils/Type";
import { MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import Layout from "../../layouts/Layout";

const data: PostPropsType[] = [
  {
    postId: "fdgdfg",
    author: {
      authorId: "sdsad",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 2 heures",
    body: `Aujourd'hui marque une étape importante dans mon parcours 
                Après des mois de thérapie et le soutien de cette incroyable
                communauté, je me sens enfin mieux. N'oubliez pas,
                c'est normal de demander de l'aide.`,
    likes: ["15"],
    supporters: ["15"],
    files: [p3],
    commentsNumber: 87,
  },
  {
    postId: "ghfgdf",
    author: {
      authorId: "sdsakjhd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 5 heures",
    body: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand
                vous vous sentez anxieux :
                <br />
                1. Inspirez pendant 4 secondes
                <br />
                2. Retenez votre souffle pendant 7 secondes
                <br />
                3. Expirez pendant 8 secondes
                <br />
                Répétez 4 fois. Cette technique peut vous aider à vous calmer
                rapidement.`,
    likes: [],
    supporters: ["15"],
    files: [p1, p2, p3],
    commentsNumber: 223,
  },
  {
    postId: "fdgdfg",
    author: {
      authorId: "sdsadalao",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 2 heures",
    body: `Aujourd'hui marque une étape importante dans mon parcours 
                Après des mois de thérapie et le soutien de cette incroyable
                communauté, je me sens enfin mieux. N'oubliez pas,
                c'est normal de demander de l'aide.`,
    likes: ["15"],
    supporters: ["15"],
    files: [p3],
    commentsNumber: 87,
  },
  {
    postId: "ghfgdf",
    author: {
      authorId: "sds876ad",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 5 heures",
    body: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand
                vous vous sentez anxieux :
                <br />
                1. Inspirez pendant 4 secondes
                <br />
                2. Retenez votre souffle pendant 7 secondes
                <br />
                3. Expirez pendant 8 secondes
                <br />
                Répétez 4 fois. Cette technique peut vous aider à vous calmer
                rapidement.`,
    likes: [],
    supporters: ["15"],
    files: [p1, p2, p3],
    commentsNumber: 223,
  },
  {
    postId: "fdgdfg",
    author: {
      authorId: "sdsacvd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 2 heures",
    body: `Aujourd'hui marque une étape importante dans mon parcours 
                Après des mois de thérapie et le soutien de cette incroyable
                communauté, je me sens enfin mieux. N'oubliez pas,
                c'est normal de demander de l'aide.`,
    likes: ["15"],
    supporters: ["15"],
    files: [p3],
    commentsNumber: 87,
  },
  {
    postId: "ghfgdf",
    author: {
      authorId: "sdsapqd",
      authorName: "Astronaute Anonyme",
      avatar: "",
    },
    timestamp: "Il y a 5 heures",
    body: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand
                vous vous sentez anxieux :
                <br />
                1. Inspirez pendant 4 secondes
                <br />
                2. Retenez votre souffle pendant 7 secondes
                <br />
                3. Expirez pendant 8 secondes
                <br />
                Répétez 4 fois. Cette technique peut vous aider à vous calmer
                rapidement.`,
    likes: [],
    supporters: ["15"],
    files: [p1, p2, p3],
    commentsNumber: 223,
  },
];

export default function Feed() {
  const [posts, setPosts] = useState<PostPropsType[]>(data);
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const handleChangeTabs = (theme: string) => {
    if (activeTabs.includes(theme)) {
      setActiveTabs(activeTabs.filter((t) => t !== theme));
    } else {
      setActiveTabs([...activeTabs, theme]);
    }
  };

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
    <Layout>
      <div className="md:container md:mx-auto p-3">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            Fil d&apos;actualité
          </h1>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Anxiety", "Depression", "Self-Care", "Motivation"].map(
              (theme) => (
                <Button
                  key={theme}
                  variant={activeTabs.includes(theme) ? "secondary" : "default"}
                  onClick={() => handleChangeTabs(theme)}
                  className={`hover:bg-popover ${
                    activeTabs.includes(theme)
                      ? "text-muted-"
                      : "text-primary-foreground"
                  } shadow-md shadow-muted`}
                >
                  {theme}
                </Button>
              )
            )}
          </div>
        </div>
        <Separator className="mb-4" />

        <div className="space-y-6">
          {posts &&
            posts.length &&
            posts.map((item, index) => (
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

        {/* Quick Actions */}
        <div className="fixed bottom-4 right-4 flex gap-2">
          <Button className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90">
            <Star className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Layout>
  );
}
