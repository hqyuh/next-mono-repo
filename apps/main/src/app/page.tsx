import HttpStatusCode from '@workspace/shared/enums/http-status-code.enum';
import { Button } from '@workspace/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@workspace/ui/components/ui/dropdown-menu';
import { ChevronDownIcon } from 'lucide-react';

import { ModeToggle } from '@/src/components/mode-toggle';

export default function Home() {
  return (
    <>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <ModeToggle />

        <h2 className='text-2xl font-bold'>Main</h2>
        <div>{HttpStatusCode.ACCEPTED}</div>
        <div>{process.env.NEXT_PUBLIC_APP_URL}</div>

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
