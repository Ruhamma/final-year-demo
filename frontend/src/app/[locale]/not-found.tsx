'use client';
import { Button,Text } from '@mantine/core';
import Link from 'next/link';

export default function NotFoundLayout() {
  return (
    <div className="max-w-screen-xl mx-auto px-5">
      <div className="min-h-[calc(100vh-20rem)] flex items-center justify-center">
        <div className="mt-16 text-center">
          <h1 className="text-6xl lg:text-9xl font-bold lg:tracking-tight bg-gradient-to-b from-[var(--mantine-color-primary-7)] to-[var(--mantine-color-primary-2)] bg-clip-text text-transparent">
            404
          </h1>
          <Text className="text-lg lg:text-2xl font-medium mt-4 " color='dimmed'>
            The page you are looking for doesn’t exist.
          </Text>
          <div className="mt-10">
                 <Button component={Link}  href="/" radius='lg' size="md" variant='outline'>
         Back To Home
       </Button>
        </div>
      </div>
    </div>
    </div>
  );
}
