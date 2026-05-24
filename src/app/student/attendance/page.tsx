
"use client";

import Link from 'next/link';
import { ArrowLeft, CalendarCheck, CheckCircle, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

type AttendanceRecord = {
  subject: string;
  attended: number;
  total: number;
};

const attendanceData: AttendanceRecord[] = [
  { subject: 'Mathematics', attended: 45, total: 50 },
  { subject: 'Science', attended: 48, total: 52 },
  { subject: 'Social', attended: 40, total: 45 },
  { subject: 'English', attended: 55, total: 55 },
  { subject: 'Hindi', attended: 38, total: 40 },
];

const getAttendancePercentage = (attended: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((attended / total) * 100);
}

const getOverallAttendance = () => {
    const totalAttended = attendanceData.reduce((acc, record) => acc + record.attended, 0);
    const totalClasses = attendanceData.reduce((acc, record) => acc + record.total, 0);
    const percentage = getAttendancePercentage(totalAttended, totalClasses);
    return { totalAttended, totalClasses, percentage };
}

export default function StudentAttendancePage() {
  const overall = getOverallAttendance();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Button asChild variant="ghost">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">My Attendance</h1>
        <div className="w-32"></div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-6 w-6" />
              Attendance Record
            </CardTitle>
            <CardDescription>
                Your attendance record for the current semester.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Overall Attendance</CardDescription>
                        <CardTitle className="text-4xl">{overall.percentage}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">
                            Attended {overall.totalAttended} out of {overall.totalClasses} classes.
                        </div>
                    </CardContent>
                </Card>
                 <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-center">Record</TableHead>
                            <TableHead className="w-[150px] md:w-[250px]">Progress</TableHead>
                            <TableHead className="text-right">Percentage</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {attendanceData.map((record) => {
                            const percentage = getAttendancePercentage(record.attended, record.total);
                            return (
                            <TableRow key={record.subject}>
                                <TableCell className="font-medium">{record.subject}</TableCell>
                                <TableCell className="text-center">{record.attended} / {record.total}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                         <Progress value={percentage} aria-label={`${percentage}% attendance`} />
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge variant={percentage >= 75 ? "default" : "destructive"} className="bg-green-500 hover:bg-green-600">
                                        {percentage}%
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        )})}
                        </TableBody>
                    </Table>
                </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
