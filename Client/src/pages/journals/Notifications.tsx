import avatar from "@/assets/gem.png";
import image from "@/assets/mada.h.png";
import Notice from "@/components/sections/notifications/Notice";
import { NoticePropsType } from "@/utils/Type";
import Layout from "../../layouts/Layout";

const data: NoticePropsType[] = [
  {
    time: "Il y a 2 heures",
    description: `Aujourd'hui marque une étape importante dans mon parcours .`,

    avatar: avatar,
    images: [image, ""],
  },
  {
    time: "Il y a 5 heures",
    description: `Astuce du jour : Essayez la technique de respiration 4-7-8 quand vous vous sentez anxieux.`,

    avatar: avatar,
    images: [image, ""],
  },
];

export default function Notifications() {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-foreground">
          Notifications
        </h1>
        <div className="mt-3">
          {data &&
            data.length &&
            [1, 2, 3, 4, 5].map(() =>
              data.map((item) => (
                <Notice
                  time={item.time}
                  avatar={item.avatar}
                  description={item.description}
                  images={item.images}
                />
              ))
            )}
        </div>
      </div>
    </Layout>
  );
}
