import Chat from "@/components/sections/discussions/Chat";
import Discussion from "@/components/sections/discussions/Discussion";
import Layout from "@/layouts/Layout";
import { ConversationType } from "@/utils/Type";
import { useState } from "react";

export default function Discussions() {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType>({ id: 0, name: "", avatar: "", isGroup: false });
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Discussions</h1>

        <div className="grid grid-cols-1 gap-6 w-full">
          {isChatOpen ? (
            <Chat
              selectedConversation={selectedConversation}
              onChangeOpen={() => setIsChatOpen(!isChatOpen)}
            />
          ) : (
            <Discussion
              selectedConversation={selectedConversation}
              onChangeOpen={(status) => setIsChatOpen(status)}
              onChangeSelected={(value) => setSelectedConversation(value)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
