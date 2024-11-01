import { JustType } from "@/utils/Type";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export default function JustAlert(props: JustType) {
  const [resolvePromise, setResolvePromise] = useState<(() => void) | null>(
    null
  );

  useEffect(() => {
    if (props.isOpen) {
      new Promise<void>((resolve) => {
        setResolvePromise(() => resolve);
      });
    }
  }, [props.isOpen]);

  const handleClose = () => {
    if (resolvePromise) {
      resolvePromise();
    }
  };
  return (
    <AlertDialog open={props.isOpen} onOpenChange={props.onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
