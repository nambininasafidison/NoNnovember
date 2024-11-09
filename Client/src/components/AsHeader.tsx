import { ArrowLeft } from "lucide-react";

export default function AsHeader() {
  return (
    <div
      className={`fixed top-0 right-0 bg-popover border-border backdrop-blur-lg border-b z-40 w-full`}
    >
      <ArrowLeft
        onClick={() => window.history.back()}
        className="h-10 w-10 mx-4 my-2"
      />
    </div>
  );
}
