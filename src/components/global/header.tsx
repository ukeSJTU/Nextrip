"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Moon, Sun, Globe, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import SearchBar from "./searchbar";

// From left to right, the header should contain: Favicon and text "Nextrip", then the searchbar, then two buttons (one is SignIn, one is SignUp), next is My Orders, then Contact. Last are two icon buttons: one is a light/dark mode switch, the other is a language (English vs Chinese) switcher. Default to English; when clicked, switch to the other language.

export default function Header() {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState("English");

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignIn = () => {
    console.log("Sign In clicked");
  };

  const handleSignUp = () => {
    console.log("Sign Up clicked");
  };

  const handleOrders = () => {
    console.log("My Orders clicked");
  };

  const handleContact = () => {
    console.log("Contact clicked");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLanguage = language === "English" ? "中文" : "English";
    setLanguage(newLanguage);
    console.log("Language switched to:", newLanguage);
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-xl font-bold p-2 h-auto"
            >
              <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground">
                N
              </div>
              <span>Nextrip</span>
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <Button onClick={handleSignUp}>Sign Up</Button>
            </div>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" onClick={handleOrders}>
                My Orders
              </Button>
              <Button variant="ghost" onClick={handleContact}>
                Contact
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={toggleLanguage}>
                  {language === "English" ? "中文" : "English"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleSignIn}>
                    Sign In
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignUp}>
                    Sign Up
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOrders}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleContact}>
                    Contact
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
