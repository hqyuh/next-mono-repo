import { ModeToggle } from '@/src/components/mode-toggle';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@workspace/ui/components/dropdown-menu';
import { Button } from '@workspace/ui/components/ui/button';
import { ChevronDownIcon } from 'lucide-react';

export default function Home() {
  return (
    <>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ModeToggle />

        <Button size={'sm'}>Click me</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={'sm'}>
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
    </>
  );
}
