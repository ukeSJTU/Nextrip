"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

/**
 * SearchBar component renders an input field and a search icon button.
 * When the button is clicked or Enter is pressed, it logs the search query
 * and displays a toast notification indicating that the search has been initiated.
 * Actual search logic is not implemented.
 *
 * @returns {JSX.Element} The rendered search bar component.
 */
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    toast.success(`Search initiated for: "${searchQuery}"`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="Search destinations..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="flex-1"
      />
      <Button
        type="button"
        size="icon"
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
}
