import Chat from "@/components/sections/discussions/Chat";
import Discussion from "@/components/sections/discussions/Discussion";
import Layout from "@/layouts/Layout";
import { ConversationType } from "@/utils/Type";
import { useState } from "react";

export default function Discussions() {
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType>({
      id: "",
      name: "",
      avatar: "",
      isGroup: false,
    });
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Layout>
      <div className="md:container md:mx-auto md:px-4 md:py-8 p-2">
        <h1 className="text-3xl font-bold md:mb-8 text-foreground">
          Discussions
        </h1>

        <div className="grid grid-cols-1 md:gap-6 w-full">
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
