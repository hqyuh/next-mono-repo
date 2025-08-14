import { Button } from '@workspace/ui/components/ui/button';

import { ModeToggle } from '@/src/components/mode-toggle';

export default function Home() {
  return (
    <>
      <main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
        <ModeToggle />

        <h2 className='text-2xl font-bold'>Admin</h2>
        <Button size={'sm'}>Click me</Button>
      </main>
    </>
  );
}
