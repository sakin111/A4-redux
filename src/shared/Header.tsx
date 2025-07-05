// components/Header.tsx

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";

export function Header() {




  return (
    <header className="bg-background shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Library</h1>

        <NavigationMenu>
          <NavigationMenuList className="gap-6">

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="text-sm font-medium hover:underline">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/allBooks" className="text-sm font-medium hover:underline">
                  All Books
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/addBooks" className="text-sm font-medium hover:underline">
                  Add Books
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/borrowSummary" className="text-sm font-medium hover:underline">
                  Book Summary
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ModeToggle></ModeToggle>
      </div>
    </header>
  );
}

export default Header;
