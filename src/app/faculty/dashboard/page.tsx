
"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, BarChart, BookOpen, Settings, LogOut } from 'lucide-react';
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
} from "@/components/ui/alert-dialog"

export default function FacultyDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <div className="flex items-center gap-2">
          <SchoolLogo className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold font-headline">Faculty Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm text-muted-foreground hidden sm:inline">Dr. Anjali Sharma</span>
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
                <Camera className="h-6 w-6 text-primary" />
                <span>Attendance</span>
              </CardTitle>
              <CardDescription>
                Start a new session to mark student attendance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/faculty/attendance">Take Attendance</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-6 w-6 text-primary" />
                <span>View Reports</span>
              </CardTitle>
              <CardDescription>
                Analyze attendance records for your classes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/faculty/reports">View Reports</Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <span>My Classes</span>
              </CardTitle>
              <CardDescription>
                Manage your assigned classes and student lists.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/faculty/classes">Manage Classes</Link>
              </Button>
            </CardContent>
          </Card>
           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                <span>Account Settings</span>
              </CardTitle>
              <CardDescription>
                Update your profile and password.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Button asChild className="w-full">
                <Link href="/faculty/settings">Go to Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
