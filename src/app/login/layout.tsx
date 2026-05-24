import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';
import { SchoolLogo } from '@/components/school-logo';

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
       <div className="absolute top-4 left-4">
        <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
            <SchoolLogo className="mb-4 h-14 w-14 text-primary" />
             <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
                The Public School
            </h1>
        </div>
        {children}
      </div>
    </main>
  );
}
