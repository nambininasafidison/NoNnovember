import p1 from "@/assets/16218.jpg";
import p2 from "@/assets/16494.jpg";
import p3 from "@/assets/72177.jpg";
import AsHeader from "@/components/AsHeader";
import AddComment from "@/components/sections/feed/AddComment";
import Post from "@/components/sections/feed/Post";
import { CommentType, PostPropsType } from "@/utils/Type";
import { useState } from "react";

// Exemple de données pour un post
const initialPost: PostPropsType = {
  postId: "ghfgdf",
  author: {
    authorId: "sdsaokyd",
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
};

// Exemple de commentaires
const initialComments: CommentType[] = [
  {
    commentId: "iodss",
    commentator: {
      username: "AstronauteCool",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    body: "Super ! La méditation m'aide beaucoup aussi. Quelle technique as-tu essayée ?",
    files: [""],
    likes: [""],
  },
  {
    commentId: "iodsdsfdfss",
    commentator: {
      username: "AstrobiologisteExpert",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    body: "C'est une bonne idée! J'ai aussi essayé de faire du yoga. Est-ce que ça peut vous aider?",
    files: [""],
    likes: ["87"],
  },
  {
    commentId: "iodslkjhkjhhkjs",
    commentator: {
      username: "ProfesseurPhilosophe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    body: "Merci pour cette remarque! J'ai essayé de faire du yoga aussi. Est-ce que ça peut vous aider?",
    files: [""],
    likes: ["2"],
  },
];

export default function IndividualPost() {
  const [post, setPost] = useState<PostPropsType>(initialPost);
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const handleChangeLikes = (value: string[], commentId: string) => {
    const updatedComments = comments.map((comment) =>
      comment.commentId === commentId ? { ...comment, likes: value } : comment
    );
    setComments([...updatedComments]);
  };

  const handleAddComment = (newCmt: CommentType) => {
    setComments([...comments, newCmt]);
  };

  return (
    <div className="container mx-auto px-4 md:py-24 pt-12 pb-4 space-y-5">
      <AsHeader />
      <Post
        post={post}
        onChangeLikes={(value) => setPost({ ...post, likes: value })}
        onChangeSupporters={(value) => setPost({ ...post, supporters: value })}
      />
      <AddComment
        comments={comments}
        onChangeLikes={(value, commentId) =>
          handleChangeLikes(value, commentId)
        }
        onAddComment={handleAddComment}
      />
    </div>
  );
}
