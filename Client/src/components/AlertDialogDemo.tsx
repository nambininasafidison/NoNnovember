import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertType } from "@/utils/Type";
import { Send } from "lucide-react";

export function AlertDialogDemo(props: AlertType) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className={cn("w-fit", props.className)}>
          {props.label === "Publier" && <Send className="w-4 h-4 mr-2" />}
          {props.label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => props.alertStatus()}
            className="bg-foreground text-background hover:bg-secondary-foreground hover:text-secondary"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
