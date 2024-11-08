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
    username: "Astronaute Anonyme",
    time: "Il y a 2 heures",
    description: `Aujourd'hui marque une étape importante dans mon parcours 
                Après des mois de thérapie et le soutien de cette incroyable
                communauté, je me sens enfin mieux. N'oubliez pas,
                c'est normal de demander de l'aide.`,
    like: 15,
    avatar: "",
    images: [p3, ""],
    comments: [
      { image: "", like: 1, text: "Nice" },
      { image: "", like: 1, text: "Good" },
      { image: "", like: 1, text: "Cool" },
      { image: "", like: 1, text: "Pretty" },
      { image: "", like: 1, text: "Fine" },
    ],
  },
  {
    username: "Mentor Positif",
    time: "Il y a 5 heures",
    description: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand
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
    like: 0,
    avatar: "",
    images: [p1, p2, p3],
    comments: [
      { image: "", like: 1, text: "OMG" },
      { image: "", like: 1, text: "LOL" },
      { image: "", like: 1, text: "OH NO" },
    ],
  },
];

export default function Feed() {
  const [activeTabs, setActiveTabs] = useState<string[]>([]);

  const handleChangeTabs = (theme: string) => {
    if (activeTabs.includes(theme)) {
      setActiveTabs(activeTabs.filter((t) => t !== theme));
    } else {
      setActiveTabs([...activeTabs, theme]);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-foreground">
            Fil d&apos;actualité
          </h1>
          <div className="flex gap-2">
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
        <Separator />

        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            className="h-24 text-xl bg-primary hover:bg-border hover:text-foreground text-slate-200 shadow-sm shadow-secondary"
            variant="secondary"
          >
            <img
              src="/placeholder.svg?height=40&width=40"
              alt=""
              className="w-10 h-10 mr-2"
            />
            Take Quiz
          </Button>
          <Button
            className="h-24 text-xl bg-primary hover:bg-border hover:text-foreground text-slate-200 shadow-sm shadow-secondary"
            variant="secondary"
          >
            <img
              src="/placeholder.svg?height=40&width=40"
              alt=""
              className="w-10 h-10 mr-2"
            />
            Create Post
          </Button>
        </div>
        <Separator className="mb-4" />

        <div className="space-y-4">
          {data &&
            data.length &&
            [1, 2, 3, 4, 5].map(() =>
              data.map((item) => (
                <Post
                  username={item.username}
                  time={item.time}
                  description={item.description}
                  like={item.like}
                  avatar={item.avatar}
                  images={item.images}
                  comments={item.comments}
                />
              ))
            )}
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
