import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthProvider";
import { ChatPropsType } from "@/utils/Type";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  ArrowLeft,
  Check,
  CheckCheck,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MessageType = {
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isSeen: boolean;
  isFile?: boolean;
  fileUrl?: string;
};

const initialMessages: MessageType[] = [
  {
    sender: {
      name: "Alice Astronaute",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Salut ! Comment ça va aujourd'hui ?",
    timestamp: "14:30",
    isSeen: false,
  },
  {
    sender: {
      name: "Moi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Ça va bien, merci ! J'ai fait une séance de méditation ce matin.",
    timestamp: "14:32",
    isSeen: false,
  },
  {
    sender: {
      name: "Alice Astronaute",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "C'est génial ! Ça t'a aidé à te sentir plus calme ?",
    timestamp: "14:35",
    isSeen: false,
  },
  {
    sender: {
      name: "Moi",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Oui, vraiment ! Je me sens plus serein pour affronter la journée.",
    timestamp: "14:37",
    isSeen: false,
  },
  {
    sender: {
      name: "Alice Astronaute",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content:
      "Je suis contente pour toi ! N'hésite pas si tu as besoin de parler.",
    timestamp: "14:40",
    isSeen: false,
  },
];

export default function Chat(props: ChatPropsType) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { id, name } = useAuth();

  const avatar = (() => {
    const sender = props.selectedConversation.users.find(
      (user) => id === user.user_id
    );
    return sender ? sender.avatar : "/default";
  })();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: MessageType = {
        sender: {
          name: name!,
          avatar,
        },
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSeen: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage("");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newFileMessage: MessageType = {
        sender: {
          name: name!,
          avatar,
        },
        content: file.name,
        fileUrl: URL.createObjectURL(file),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isFile: true,
        isSeen: false,
      };
      setMessages((prevMessages) => [...prevMessages, newFileMessage]);
    }
  };

  return (
    <Card className="md:bg-slate-800 border-slate-700 md:col-span-2 md:border border-none bg-background md:ml-0 -ml-6 md:mb-0 -mb6">
      <CardHeader className="py-2">
        <div className="flex items-center space-x-4">
          <ArrowLeft
            onClick={props.onChangeOpen}
            className="w-10 h-10 cursor-pointer"
          />
          {props.selectedConversation.users &&
            props.selectedConversation.users.map((user, index) =>
              user.user_id !== id && index < 6 ? (
                <Avatar
                  key={user.user_id}
                  className={`-ml-${index * 10} z-[${index * 10}] `}
                >
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ) : null
            )}
          {props.selectedConversation.users &&
            props.selectedConversation.users.map((user, index) =>
              user.user_id !== id && index < 6 ? (
                <CardTitle key={user.user_id} className="text-slate-200">
                  {user.name} ,
                </CardTitle>
              ) : null
            )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="md:h-[calc(100vh-400px)] h-[calc(92vh-260px)] md:mb-4 md:pr-4 md:w-full w-[calc(100vw-15px)]">
          {messages.map((message, index) => {
            message.isSeen = message.sender.name !== name! ? false : true;
            return (
              <div
                key={message.timestamp}
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {props.selectedConversation.users.length > 2 &&
                  message.sender.name !== name! && (
                    <p className="px-1">{message.sender.name}</p>
                  )}
                <div
                  className={`flex flex-col mb-4 ${
                    message.sender.name === name! ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender.name === name!
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-slate-200"
                    }`}
                  >
                    {message.isFile ? (
                      <a
                        href={message.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-sm"
                      >
                        {message.content}
                      </a>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  <div className="flex">
                    {message.sender.name === name! && message.isSeen ? (
                      <CheckCheck className="w-5 h-5" />
                    ) : message.sender.name === name! && !message.isSeen ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      ""
                    )}
                    <span
                      className={`text-xs opacity-70 mt-1 block px-1 ${
                        message.sender.name === name! && "text-end"
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollArea>
        <Separator className="md:my-4 my-1 md:w-full w-[calc(100vw-15px)]" />
        <form
          onSubmit={handleSendMessage}
          className="flex items-end space-x-2 relative md:w-full w-[calc(100vw-15px)]"
        >
          <Input
            type="text"
            placeholder="Tapez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-slate-700 border-slate-600 text-slate-200"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
          >
            <Smile className="h-4 w-4" />
          </Button>
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="w-5 h-5" />
          </Button>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*, .pdf, .txt, .docx"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </form>
        {isEmojiPickerOpen && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      </CardContent>
    </Card>
  );
}
