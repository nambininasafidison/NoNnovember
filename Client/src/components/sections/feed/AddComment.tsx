import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthProvider";
import { CommentType } from "@/utils/Type";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Heart, Paperclip, Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AddComment(props: {
  comments: CommentType[];
  onChangeLikes: (value: string[], commentId: string) => void;
  onAddComment: (newCmt: CommentType) => void;
}) {
  const [newComment, setNewComment] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const lastCommentRef = useRef<HTMLDivElement>(null);
  const { id } = useAuth();

  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.comments]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newMsg: CommentType = {
        commentId: "comment" + props.comments.length,
        commentator: { username: "Moi", avatar: "" },
        body: newComment,
        likes: [],
      };
      props.onAddComment(newMsg);
      setNewComment("");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewComment((prev) => prev + emojiData.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFileComment: CommentType = {
        commentId: "comment" + props.comments.length,
        commentator: { username: "Moi", avatar: "" },
        body: file.name,
        likes: [],
        isFile: true,
        files: [URL.createObjectURL(file)],
      };
      props.onAddComment(newFileComment);
    }
  };

  const handleLikeToggle = (comment: CommentType) => {
    if (id) {
      const updatedLikes = comment.likes.includes(id)
        ? comment.likes.filter((likeId) => likeId !== id)
        : [...comment.likes, id];

      props.onChangeLikes(updatedLikes, comment.commentId);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <CardTitle className="text-slate-200">Commentaires</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {props.comments.map((comment, index) => (
            <div
              key={comment.commentator.avatar + index}
              className="flex space-x-4 mb-4"
              ref={index === props.comments.length - 1 ? lastCommentRef : null}
            >
              <Avatar>
                <AvatarImage
                  src={comment.commentator.avatar}
                  alt={comment.commentator.username}
                />
                <AvatarFallback>
                  {comment.commentator.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold text-slate-200">
                  {comment.commentator.username}
                </p>
                <p className="text-slate-300">{comment.body}</p>
                <div className="flex items-center">
                  <Heart
                    onClick={() => handleLikeToggle(comment)}
                    className={`w-4 h-4 mr-2 cursor-pointer ${
                      comment.likes.includes(id!) ? "text-red-500" : ""
                    }`}
                  />
                  <p>{comment.likes.length} J'adore</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSendComment}
          className="flex items-start space-x-2 relative"
        >
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <Smile className="h-4 w-4" />
            <span className="sr-only">Ajouter un emoji</span>
          </Button>
          <Label
            htmlFor="file"
            className="bg-background border border-accent cursor-pointer p-2.5 rounded-md"
          >
            <Paperclip className="h-4 w-4" />
          </Label>
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Textarea
            placeholder="Tapez votre message..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 bg-slate-700 border-slate-600 text-slate-200"
          />
          <Button variant={"outline"} type="submit" size="icon">
            <Send className="h-4 w-4" />
            <span className="sr-only">Envoyer</span>
          </Button>
          {isEmojiPickerOpen && (
            <div className="absolute bottom-14 right-2">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </form>
      </CardFooter>
    </Card>
  );
}
