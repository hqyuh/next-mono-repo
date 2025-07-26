import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ModeToggle />

        <Button size={"sm"}>Click me</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"}>
              Dropdown <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuItem>Item 2</DropdownMenuItem>
            <DropdownMenuCheckboxItem checked>Item 3</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Item 3</DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Item 3</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Item 3.1</DropdownMenuItem>
                <DropdownMenuItem>Item 3.2</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </main>
    </div>
  );
}
