import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Exemple de messages pour la démonstration
const initialMessages = [
  {
    id: 1,
    sender: "AstronauteAmi",
    content: "Salut ! Comment ça va aujourd'hui ?",
    timestamp: "10:30",
  },
  {
    id: 2,
    sender: "VoyageurStellar",
    content: "Ça va bien, merci ! Un peu stressé pour la mission de demain.",
    timestamp: "10:32",
  },
  {
    id: 3,
    sender: "AstronauteAmi",
    content:
      "Ne t'inquiète pas, tu es bien préparé. Respire profondément et visualise le succès !",
    timestamp: "10:35",
  },
];

export default function LiveChat() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Moi",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold text-slate-200">
            Chat en Direct
          </CardTitle>
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Inviter un Ami
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === "Moi" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex ${
                    message.sender === "Moi" ? "flex-row-reverse" : "flex-row"
                  } items-start max-w-[70%]`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32`}
                      alt={message.sender}
                    />
                    <AvatarFallback>{message.sender[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 ${
                      message.sender === "Moi" ? "text-right" : "text-left"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      <Badge variant="outline" className="text-xs">
                        {message.sender}
                      </Badge>
                      <span className="text-xs text-slate-400 ml-2">
                        {message.timestamp}
                      </span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === "Moi"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-200"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Tapez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-slate-700 border-slate-600 text-slate-200"
            />
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
