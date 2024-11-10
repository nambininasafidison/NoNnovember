import { Separator } from "@/components/ui/separator";
import { NoticePropsType } from "@/utils/Type";

export default function Notice(props: NoticePropsType) {
  return (
    <>
      <div className="bg-background flex items-center w-full justify-between py-3">
        <div className="min-w-20 max-w-20 rounded-full">
          <img
            src={props.users.avatar}
            alt={props.senderName.slice(0, 2).toUpperCase()}
            className="object-cover overflow-hidden"
          />
        </div>
        <div className="flex justify-between items-center w-full">
          <div>
            <p className="text-foreground">{props.content} 💫</p>
            <div className="text-sm text-slate-400 text-end">
              {props.timestamp}
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
