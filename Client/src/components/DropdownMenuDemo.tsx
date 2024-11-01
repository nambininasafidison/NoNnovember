import {
  Bell,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Moon,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthProvider";
import { Link } from "react-router-dom";
import { AlertDialogDemo } from "./AlertDialogDemo";
import { ToggleTheme } from "./ToggleTheme";

export function DropdownMenuDemo(props: { className?: string }) {
  const { clearTokens } = useAuth();

  return (
    <div className={props.className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Home className="mr-2 h-4 w-4" />
              <Link to={"/"}>Accueil</Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <Link to={import.meta.env.VITE_MODULES_ROUTE}>Modules</Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ShoppingBag className="mr-2 h-4 w-4" />
              <Link to={import.meta.env.VITE_STORES_ROUTE}>Magasin</Link>{" "}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <Link to={import.meta.env.VITE_SUBSCRIBE_ROUTE}>
                Abonnement
              </Link>{" "}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Moon className="mr-2 h-4 w-4" />
              <Link to={"/"}>Thème</Link>{" "}
              <DropdownMenuShortcut>
                <ToggleTheme />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <DropdownMenuShortcut>
                <AlertDialogDemo
                  label="Déconnexion"
                  title="Êtes-vous sûr de vouloir vous déconnecter ?"
                  className="text-md border-none"
                  alertStatus={() => {
                    clearTokens();
                  }}
                />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
