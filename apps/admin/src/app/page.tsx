import { ModeToggle } from '@/src/components/mode-toggle';
import { Button } from '@workspace/ui/components/ui/button';

export default function Home() {
  return (
    <>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <ModeToggle />

        <h2 className='text-2xl font-bold'>Admin</h2>
        <Button size={'sm'}>Click me</Button>
      </main>
    </>
  );
}
