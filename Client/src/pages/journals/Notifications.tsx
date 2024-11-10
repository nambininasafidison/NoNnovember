import Notice from "@/components/sections/notifications/Notice";
import { NoticePropsType } from "@/utils/Type";
import Layout from "../../layouts/Layout";

const data: NoticePropsType[] = [
  {
    timestamp: "Il y a 2 heures",
    content: `Aujourd'hui marque une étape importante dans mon parcours .`,
    senderName: "Mada Hamada",
    users: {
      avatar: "/images/user-avatar.png",
    },
  },
  {
    timestamp: "Il y a 5 heures",
    content: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand vous vous sentez anxieux.`,
    senderName: "Mada Alice",
    users: {
      avatar: "/images/user-avatar-2.png",
    },
  },
];

export default function Notifications() {
  return (
    <Layout>
      <div className="md:container md:mx-auto p-3">
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Notifications
        </h1>
        <div className="mt-3">
          {data &&
            data.length &&
            [1, 2, 3, 4, 5].map(() =>
              data.map((item) => (
                <Notice
                  timestamp={item.timestamp}
                  content={item.content}
                  senderName={item.senderName}
                  users={item.users}
                />
              ))
            )}
        </div>
      </div>
    </Layout>
  );
}
