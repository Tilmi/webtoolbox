import { Search } from "lucide-react";

import { SidebarInput } from "@/components/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <div className="relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <SidebarInput
          id="search"
          placeholder="Type to search..."
          className="h-8 pl-7"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}

export default SearchForm;
