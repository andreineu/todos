import { Inter } from 'next/font/google';

import { Todos } from '@/components/todos';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Todos />
    </main>
  );
}
