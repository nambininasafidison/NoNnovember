import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";
import { cn } from "@/utils/cn";

export function ToggleTheme(props: { className?: string }) {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn(props.className, "relative items-center justify-center")}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Moon
        className={`transition duration-500 ${
          theme === "light" ? "scale-0" : "scale-100"
        }`}
      />
      <Sun
        className={`transition duration-500 absolute ${
          theme === "light" ? "scale-100" : "scale-0"
        }`}
      />
    </Button>
  );
}
