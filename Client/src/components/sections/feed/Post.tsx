import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthProvider";
import { PostPropsType } from "@/utils/Type";
import { Heart, MessageCircle, Share2, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Post(props: {
  post: PostPropsType;
  onChangeLikes: (value: string[], postId: string) => void;
  onChangeSupporters: (value: string[], postId: string) => void;
}) {
  const { id } = useAuth();
  const userFallback = (username: string) => {
    const user = username.split(" ");

    return (
      user.length > 1
        ? user[0].split("")[0] + user[1].split("")[0]
        : user[0].split("")[0] + user[0].split("")[1]
    ).toUpperCase();
  };

  const handleLikeToggle = (post: PostPropsType) => {
    if (id) {
      const updatedLikes = post.likes.includes(id)
        ? post.likes.filter((likeId) => likeId !== id)
        : [...post.likes, id];

      props.onChangeLikes(updatedLikes, post.postId);
    }
  };

  const handleSupportToggle = (post: PostPropsType) => {
    if (id) {
      const updatedSupporters = post.supporters.includes(id)
        ? post.supporters.filter((supporterId) => supporterId !== id)
        : [...post.supporters, id];

      props.onChangeSupporters(updatedSupporters, post.postId);
    }
  };
  return (
    <Card className="bg-primary hover:scale-[1.01] transition-all shadow-sm shadow-secondary my-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link to={"/profilePublic/" + props.post.author.authorId}>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>
              {userFallback(props.post.author.authorName)}
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <Link to={"/profilePublic/" + props.post.author.authorId}>
            <div className="font-medium text-slate-200">
              {props.post.author.authorName}
            </div>
          </Link>
          <div className="text-sm text-slate-400">{props.post.timestamp}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`w-full gap-2 mb-5 grid grid-cols-${Math.round(
            Math.sqrt(props.post.files?.length || 0)
          )}`}
        >
          {props.post.files &&
            props.post.files.map((image, index) => (
              <Link
                to={"/individualPost/" + props.post.postId}
                key={image + index}
              >
                <div className="w-full">
                  <img
                    key={index}
                    src={image}
                    alt={"Avatar"}
                    className="object-cover overflow-hidden"
                  />
                </div>
              </Link>
            ))}
        </div>
        <Link to={"/individualPost/" + props.post.postId}>
          <p className="text-slate-200">{props.post.body} 💫</p>
        </Link>
      </CardContent>
      <CardFooter className="flex gap-4 border-t border-slate-700 py-3">
        <div className="flex items-center">
          <Heart
            onClick={() => handleLikeToggle(props.post)}
            className={`w-6 h-6 mr-2 cursor-pointer ${
              props.post.likes.includes(id!) ? "text-red-500" : ""
            }`}
          />
          <p>{props.post.likes.length} J'adore</p>
        </div>
        <Link to={"/individualPost/" + props.post.postId}>
          <Button variant="ghost" className="text-slate-200">
            <MessageCircle className="w-6 h-6 mr-2" />
            <span>{props.post.commentsNumber}</span>
          </Button>
        </Link>
        <div className="flex items-center">
          <Star
            onClick={() => handleSupportToggle(props.post)}
            className={`w-6 h-6 mr-2 cursor-pointer ${
              props.post.supporters.includes(id!) ? "text-red-900" : ""
            }`}
          />
          <p>{props.post.supporters.length} Soutenir</p>
        </div>
        <Button variant="ghost" className="text-slate-200 ml-auto">
          <Share2 className="w-6 h-6" />
        </Button>
      </CardFooter>
    </Card>
  );
}
