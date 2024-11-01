import gem from "@/assets/gem.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type PopoverActivityType = {
  owner: string;
  title: string;
  type: string;
  description: string;
  date: string;
};

export function PopoverDemo(props: PopoverActivityType) {
  const owner = props.owner.split(" ");
  const ownerFallback = (
    owner.length > 1
      ? owner[0].split("")[0] + owner[1].split("")[0]
      : owner[0].split("")[0] + owner[0].split("")[1]
  ).toUpperCase();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Voir plus</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={gem} alt="Avatar" />
                <AvatarFallback>{ownerFallback}</AvatarFallback>
              </Avatar>
              <h4 className="font-medium leading-none">{props.owner}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{`${props.title} ${props.date}`}</p>
            <p>{props.description}</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
