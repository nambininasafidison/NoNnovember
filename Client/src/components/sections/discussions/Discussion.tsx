import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DiscussionPropsType } from "@/utils/Type";
import { Search } from "lucide-react";

const conversations = [
  {
    id: "1",
    name: "Alice Astronaute",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Comment s'est passée ta journée ?",
    timestamp: "14:30",
    unread: 2,
    isGroup: false,
  },
  {
    id: "2",
    name: "Bob Blackhole",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "J'ai trouvé un nouvel exercice de méditation !",
    timestamp: "Hier",
    unread: 0,
    isGroup: false,
  },
  {
    id: "3",
    name: "Charlie Cosmos",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "On se voit pour la séance de groupe demain ?",
    timestamp: "Lun",
    unread: 1,
    isGroup: false,
  },
  {
    id: "4",
    name: "Diana Dimension",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Merci pour ton soutien !",
    timestamp: "07/11",
    unread: 0,
    isGroup: false,
  },
  {
    id: "5",
    name: "Kiala Team",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Merci pour Votre soutien !",
    timestamp: "07/11",
    unread: 0,
    isGroup: true,
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
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                props.selectedConversation.id === conversation.id
                  ? "bg-slate-700"
                  : "hover:bg-slate-700"
              }`}
              onClick={() => {
                props.onChangeSelected(conversation);
                props.onChangeOpen(true);
              }}
            >
              <Avatar>
                <AvatarImage
                  src={conversation.avatar}
                  alt={conversation.name}
                />
                <AvatarFallback>{conversation.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-slate-200 truncate">
                    {conversation.name}
                  </p>
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {conversation.unread > 0 && (
                  <Badge variant="destructive" className="rounded-full">
                    {conversation.unread}
                  </Badge>
                )}
                <span className="text-xs text-slate-400">
                  {conversation.timestamp}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
