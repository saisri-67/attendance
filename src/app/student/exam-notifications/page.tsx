
import Link from 'next/link';
import { ArrowLeft, Bell, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const examSchedule = [
  { date: '2024-09-16', day: 'Monday', subject: 'Mathematics', time: '9:00 AM - 12:00 PM' },
  { date: '2024-09-18', day: 'Wednesday', subject: 'Science', time: '9:00 AM - 12:00 PM' },
  { date: '2024-09-20', day: 'Friday', subject: 'Social', time: '9:00 AM - 12:00 PM' },
  { date: '2024-09-23', day: 'Monday', subject: 'English', time: '9:00 AM - 12:00 PM' },
  { date: '2024-09-25', day: 'Wednesday', subject: 'Hindi', time: '9:00 AM - 12:00 PM' },
];

export default function ExamNotificationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Button asChild variant="ghost">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Exam Notifications</h1>
        <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
        </Button>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Final Term Exam Timetable
            </CardTitle>
            <CardDescription>
              The schedule for the upcoming final term examinations. Please prepare accordingly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Day</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {examSchedule.map(exam => (
                            <TableRow key={exam.subject}>
                                <TableCell className="font-medium">{exam.date}</TableCell>
                                <TableCell>{exam.day}</TableCell>
                                <TableCell>{exam.subject}</TableCell>
                                <TableCell className="text-right">{exam.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             <div className="mt-6 text-center text-muted-foreground text-sm">
                <p>Please arrive at the examination hall at least 15 minutes before the scheduled time.</p>
                <p>Good luck with your exams!</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
