import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PostPropsType } from "@/utils/Type";
import { Heart, MessageCircle, Share2, Star } from "lucide-react";

export default function Post(props: PostPropsType) {
  const userFallback = (username: string) => {
    const user = username.split(" ");

    return (
      user.length > 1
        ? user[0].split("")[0] + user[1].split("")[0]
        : user[0].split("")[0] + user[0].split("")[1]
    ).toUpperCase();
  };
  return (
    <Card className="bg-primary hover:scale-[1.01] transition-all shadow-sm shadow-secondary">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder.svg?height=40&width=40" />
          <AvatarFallback>{userFallback(props.username)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-slate-200">{props.username}</div>
          <div className="text-sm text-slate-400">{props.time}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`w-full gap-2 mb-5 grid grid-cols-${Math.round(
            Math.sqrt(props.images?.length || 0)
          )}`}
        >
          {props.images &&
            props.images.map((image) => (
              <div className="w-full">
                <img
                  src={image}
                  alt={"Avatar"}
                  className="object-cover overflow-hidden"
                />
              </div>
            ))}
        </div>
        <p className="text-slate-200">{props.description} 💫</p>
      </CardContent>
      <CardFooter className="flex gap-4 border-t border-slate-700">
        <Button variant="ghost" className="text-slate-200">
          <Heart className="w-4 h-4 mr-2" />
          <span>{props.like}</span>
        </Button>
        <Button variant="ghost" className="text-slate-200">
          <MessageCircle className="w-4 h-4 mr-2" />
          <span>{props.comments?.length}</span>
        </Button>
        <Button variant="ghost" className="text-slate-200">
          <Star className="w-4 h-4 mr-2" />
          <span>Soutenir</span>
        </Button>
        <Button variant="ghost" className="text-slate-200 ml-auto">
          <Share2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
