import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConversationType, DiscussionPropsType } from "@/utils/Type";
import { Search } from "lucide-react";

const conversations: ConversationType[] = [
  {
    conversation_id: "1",
    messages: [
      {
        sender_id: "1",
        content: "Comment s'est passée ta journée ?",
      },
    ],
    users: [
      {
        user_id: "1",
        name: "Alice Astronaute",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        user_id: "2",
        name: "Alice Astroe",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        user_id: "3",
        name: "GHe Astronaute",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        user_id: "4",
        name: "Alice Astronaute",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    conversation_id: "2",
    messages: [
      {
        sender_id: "2",
        content: "J'ai trouvé un nouvel exercice de méditation !",
      },
    ],
    users: [
      {
        user_id: "2",
        name: "Bob Blackhole",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    conversation_id: "3",
    messages: [
      {
        sender_id: "3",
        content: "On se voit pour la séance de groupe demain ?",
      },
    ],
    users: [
      {
        user_id: "3",
        name: "Charlie Cosmos",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    conversation_id: "4",
    messages: [
      {
        sender_id: "4",
        content: "Merci pour ton soutien !",
      },
    ],
    users: [
      {
        user_id: "4",
        name: "Diana Dimension",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
  {
    conversation_id: "5",
    messages: [
      {
        sender_id: "5",
        content: "Merci pour Votre soutien !",
      },
    ],
    users: [
      {
        user_id: "5",
        name: "Kiala Team",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ],
  },
];

export default function Discussion(props: DiscussionPropsType) {
  return (
    <Card className="md:col-span-1 md:border border-none md:bg-slate-700 bg-background md:ml-0 md:pt-5 -ml-6">
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Rechercher une conversation..."
            className="pl-10 bg-slate-700 border-slate-600 text-slate-200"
          />
        </div>
        <ScrollArea className="md:h-[calc(92vh-300px)] h-[calc(92vh-210px)] md:w-full w-[calc(100vw-20px)] px-1">
          {conversations.map((conversation) => {
            const avatar = (() => {
              const sender = conversation.users.find(
                (user) => conversation.messages[0].sender_id === user.user_id
              );
              return sender ? sender.avatar : "/default-avatar.svg";
            })();
            const name = (() => {
              const sender = conversation.users.find(
                (user) => conversation.messages[0].sender_id === user.user_id
              );
              return sender ? sender.name : "Anonyme";
            })();
            return (
              <div
                key={conversation.conversation_id}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                  props.selectedConversation.conversation_id ===
                  conversation.conversation_id
                    ? "bg-slate-700"
                    : "hover:bg-slate-700"
                }`}
                onClick={() => {
                  props.onChangeSelected(conversation);
                  props.onChangeOpen(true);
                }}
              >
                <Avatar>
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {name}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400 truncate">
                    {conversation.messages[0].content}
                  </p>
                </div>
                {/* <div className="flex items-center gap-2">
                {conversation.unread > 0 && (
                  <Badge variant="destructive" className="rounded-full">
                    {conversation.unread}
                  </Badge>
                )}
                <span className="text-xs text-slate-400">
                  {conversation.timestamp}
                </span>
              </div> */}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
