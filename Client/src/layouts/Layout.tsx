import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";
import {
  Bell,
  ClipboardList,
  HelpingHand,
  Home,
  Menu,
  MessageCircle,
  Moon,
  Search,
  Settings,
  Star,
  Sun,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { id } = useAuth();

  return (
    <div className={`min-h-screen bg-background`}>
      {/* Left Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-16 bg-card border-r z-50`}>
        <div className="flex flex-col items-center gap-4 p-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Home className="h-6 w-6" />
            </Button>
          </Link>
          <Link to="/notification">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Bell className="h-6 w-6" />
            </Button>
          </Link>
          <Link to="/discussions">
            <Button variant="ghost" size="icon" className="text-foreground">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </Link>
          <Link to="/quiz">
            <Button variant="ghost" size="icon" className="text-foreground">
              <ClipboardList className="h-6 w-6" />
            </Button>
          </Link>
          <Link to="/supportGroups">
            <Button variant="ghost" size="icon" className="text-foreground">
              <HelpingHand className="h-6 w-6" />
            </Button>
          </Link>
          <Link to={"/profilePublic/" + id}>
            <Button variant="ghost" size="icon" className="text-foreground">
              <User className="h-6 w-6" />
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-foreground">
              <Settings className="h-6 w-6" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Top Navigation */}
      <div
        className={`fixed top-0 left-16 right-0 bg-popover border-border backdrop-blur-lg border-b z-40`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search
                className={`absolute left-2 top-2.5 h-4 w-4 text-secondary`}
              />
              <Link to="/search">
                <Input
                  placeholder="Rechercher..."
                  className={`pl-8 bg-muted border-border`}
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Link
                to="/menu"
                className="relative rounded-full border-2 border-primary"
              >
                <Avatar className="h-12 w-12 text-foreground">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="@astronaut"
                  />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <Menu className="absolute rounded-full bg-muted border border-primary w-5 h-5 p-0.5  text-foreground bottom-0 right-0" />
              </Link>
              <div>
                <div className={`font-medium gap-3 text-foreground mb-1`}>
                  Astronaute
                  <Badge
                    variant="secondary"
                    className="ml-2 hover:bg-background hover:text-foreground"
                  >
                    <Star className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Badge
                    variant="secondary"
                    className="text-xs hover:bg-background hover:text-foreground"
                  >
                    Niveau 11
                  </Badge>
                  <Progress value={45} className="w-20 h-2 bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pl-16">
        <div className="container mx-auto p-4">{children}</div>
      </div>

      {/* Notification Toast */}
      <div
        className={`fixed bottom-4 right-4 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        } p-4 rounded-lg shadow-lg border max-w-sm transition-transform transform translate-y-0 animate-in fade-in duration-200 hidden`}
      >
        <div className="flex items-start gap-4">
          <div
            className={theme === "dark" ? "text-slate-200" : "text-slate-800"}
          >
            <h4 className="font-medium">Rappel bien-être</h4>
            <p className="text-sm text-slate-500">
              N&apos;oublie pas de prendre une pause de 5 minutes
              aujourd&apos;hui ! 🌟
            </p>
          </div>
          <Button variant="ghost" size="sm">
            ✕
          </Button>
        </div>
      </div>
    </div>
  );
}
