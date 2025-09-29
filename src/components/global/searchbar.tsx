"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SearchBar() {
  // A input field + an search icon button, when clicked, console.log what is being searched and use toast to show that search has been initiated, we don't implement actual search logic for now.
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
        onKeyPress={handleKeyPress}
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
