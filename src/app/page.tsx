import Link from 'next/link';
import { Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SchoolLogo } from '@/components/school-logo';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="mb-8">
          <SchoolLogo className="mx-auto h-20 w-20 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-headline">
            The Public School
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Automated Attendance System
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <Button asChild size="lg" className="w-full text-lg py-8 shadow-md">
            <Link href="/login/faculty">
              <Briefcase className="mr-3 h-7 w-7" />
              Faculty Login
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-full text-lg py-8 shadow-sm">
            <Link href="/login/student">
              <User className="mr-3 h-7 w-7" />
              Student Login
            </Link>
          </Button>
        </div>
      </main>
      <footer className="py-4 px-6 text-center text-sm text-muted-foreground">
        <p>Powered by CODENOVA</p>
        <p>v1.0 – Offline Supported</p>
      </footer>
    </div>
  );
}
