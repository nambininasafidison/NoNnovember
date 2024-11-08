import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatPropsType } from "@/utils/Type";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ArrowLeft, Paperclip, Send, Smile } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type MessageType = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMine: boolean;
  isSeen: boolean;
  isFile?: boolean;
  fileUrl?: string;
};

const initialMessages: MessageType[] = [
  {
    id: 1,
    sender: "Alice Astronaute",
    content: "Salut ! Comment ça va aujourd'hui ?",
    timestamp: "14:30",
    isMine: false,
    isSeen: false,
  },
  {
    id: 2,
    sender: "Moi",
    content: "Ça va bien, merci ! J'ai fait une séance de méditation ce matin.",
    timestamp: "14:32",
    isSeen: false,
    isMine: true,
  },
  {
    id: 3,
    sender: "Alice Astronaute",
    content: "C'est génial ! Ça t'a aidé à te sentir plus calme ?",
    timestamp: "14:35",
    isSeen: false,
    isMine: false,
  },
  {
    id: 4,
    sender: "Moi",
    content:
      "Oui, vraiment ! Je me sens plus serein pour affronter la journée.",
    timestamp: "14:37",
    isSeen: false,
    isMine: true,
  },
  {
    id: 5,
    sender: "Alice Astronaute",
    content:
      "Je suis contente pour toi ! N'hésite pas si tu as besoin de parler.",
    timestamp: "14:40",
    isSeen: false,
    isMine: false,
  },
];

export default function Chat(props: ChatPropsType) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      // lastMessageRef.current.scrollTop = lastMessageRef.current?.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: MessageType = {
        id: messages.length + 1,
        sender: "Moi",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
        isSeen: false,
      };
      setMessages([...messages, newMsg]);
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
        id: messages.length + 1,
        sender: "Moi",
        content: file.name,
        fileUrl: URL.createObjectURL(file),
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMine: true,
        isFile: true,
        isSeen: false,
      };
      setMessages([...messages, newFileMessage]);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 md:col-span-2">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <ArrowLeft
            onClick={props.onChangeOpen}
            className="w-10 h-10 cursor-pointer"
          />
          <Avatar>
            <AvatarImage
              src={props.selectedConversation.avatar}
              alt={props.selectedConversation.name}
            />
            <AvatarFallback>
              {props.selectedConversation.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-slate-200">
            {props.selectedConversation.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-400px)] mb-4 -mr-4 pr-4">
          {messages.map((message, index) => {
            message.isSeen = true;
            return (
              <>
                <p className="px-1">
                  {props.selectedConversation.isGroup &&
                    !message.isMine &&
                    message.sender}
                </p>
                <div
                  key={message.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                  className={`flex flex-col mb-4 ${
                    message.isMine ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isMine
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
                  <span
                    className={`text-xs opacity-70 mt-1 block px-1 ${
                      message.isMine && "text-end"
                    }`}
                  >
                    {message.timestamp}
                  </span>
                </div>
                {!message.isMine && message.isSeen}
              </>
            );
          })}
        </ScrollArea>
        <Separator className="my-4" />
        <form
          onSubmit={handleSendMessage}
          className="flex items-center space-x-2 relative"
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
      </CardContent>
    </Card>
  );
}
