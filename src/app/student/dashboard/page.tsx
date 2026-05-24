
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarCheck, FileText, LogOut, CreditCard, Bell } from 'lucide-react';
import { SchoolLogo } from '@/components/school-logo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type User = {
    type: 'Student';
    username: string;
}

const studentNames: { [key: string]: string } = {
    'C01-S001': 'Aarav Sharma', 'C01-S002': 'Diya Patel', 'C01-S003': 'Rohan Gupta', 'C01-S004': 'Priya Singh',
    'C02-S001': 'Kabir Mehra', 'C02-S002': 'Anika Verma', 'C02-S003': 'Vivaan Joshi', 'C02-S004': 'Saanvi Reddy',
};


export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.type === 'Student') {
                setUser(parsedUser);
            } else {
                router.push('/login/student');
            }
        } catch (e) {
            localStorage.removeItem('user');
            router.push('/login/student');
        }
    } else {
        router.push('/login/student');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };
  
  const getStudentName = (studentId: string) => {
    return studentNames[studentId] || studentId;
  };

  if (!user) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <p>Loading...</p>
        </div>
      );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-2">
          <SchoolLogo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">Student Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm text-muted-foreground hidden sm:inline">{getStudentName(user.username)} ({user.username})</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be returned to the home page.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-6 w-6 text-primary" />
                <span>My Attendance</span>
              </CardTitle>
              <CardDescription>
                View your attendance record for all classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/student/attendance">View Attendance</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>My Report Card</span>
              </CardTitle>
              <CardDescription>
                Check your grades and academic performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button asChild className="w-full">
                <Link href="/student/report-card">View Report Card</Link>
              </Button>
            </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                <span>Fee Payments</span>
              </CardTitle>
              <CardDescription>
                View and pay your school fees online.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button asChild className="w-full">
                <Link href="/student/fee-payments">Pay Fees</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-6 w-6 text-primary" />
                <span>Exam Notifications</span>
              </CardTitle>
              <CardDescription>
                Get updates on upcoming exam schedules.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button asChild className="w-full">
                <Link href="/student/exam-notifications">View Notifications</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
