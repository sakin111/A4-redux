import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Link } from "react-router";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background shadow-sm py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Library</h1>

        {/* Desktop Menu */}
        <NavigationMenu>
          <NavigationMenuList className="gap-6 hidden md:flex">
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

        {/* Hamburger Button - visible only on small screens */}
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" /> // X icon to close
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" /> // Hamburger icon
            )}
          </svg>
        </button>

        <ModeToggle />
      </div>

     
      {mobileMenuOpen && (
        <nav className="md:hidden bg-background shadow-inner px-6 py-4">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                className="block text-primary text-base font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/allBooks"
                className="block text-primary text-base font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Books
              </Link>
            </li>
            <li>
              <Link
                to="/addBooks"
                className="block text-primary text-base font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Add Books
              </Link>
            </li>
            <li>
              <Link
                to="/borrowSummary"
                className="block text-primary text-base font-medium hover:underline"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Summary
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
