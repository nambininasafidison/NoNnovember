import { NoticePropsType } from "@/utils/Type";

export default function Notice(props: NoticePropsType) {
  return (
    <div className="bg-background flex items-center w-full justify-between py-3">
      <div className="min-w-20 max-w-20 rounded-full">
        <img
          src={props.avatar}
          alt={"Avatar"}
          className="object-cover overflow-hidden"
        />
      </div>
      <div className="flex justify-between items-center w-full">
        <div>
          <p className="text-foreground">{props.description} 💫</p>
          <div className="text-sm text-slate-400">{props.time}</div>
        </div>
        <div className="min-w-20 max-w-20">
          <img
            src={props.images && props.images[0]}
            alt="Images"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
