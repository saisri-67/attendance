
"use client"

import Link from 'next/link';
import { ArrowLeft, BarChart, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import type { ChartConfig } from '@/components/ui/chart';
import { useState, useMemo } from 'react';
import type { DateRange } from 'react-day-picker';
import { addDays, format, eachDayOfInterval, isWithinInterval } from 'date-fns';

type AttendanceRecord = {
    classId: string;
    student: string;
    date: Date;
    status: 'present' | 'absent';
};

const studentNames = [
    'Aarav Sharma', 'Diya Patel', 'Rohan Gupta', 'Priya Singh', 'Kabir Mehra',
    'Anika Verma', 'Vivaan Joshi', 'Saanvi Reddy', 'Arjun Kumar', 'Myra Das',
    'Ishaan Choudhary', 'Zara Khan', 'Reyansh Agarwal', 'Ananya Mishra', 'Advik Iyer',
    'Aadhya Nair', 'Krish Menon', 'Kiara Bhat', 'Vihaan Shah', 'Ira Sharma'
];

// Generate more detailed mock data with daily records
const generateMockData = (): AttendanceRecord[] => {
    const data: AttendanceRecord[] = [];
    const classes = {
        'class-10b': studentNames,
        'class-9a': [...studentNames].reverse(), // Using a reversed list for some variety
    };
    const today = new Date();
    const dateRange = eachDayOfInterval({ start: addDays(today, -30), end: today });

    for (const [classId, students] of Object.entries(classes)) {
        for (const student of students) {
            for (const date of dateRange) {
                // Skip weekends
                if (date.getDay() === 0 || date.getDay() === 6) continue;
                
                // Make some students more frequently absent
                const absenceProbability = student.includes('Rohan') || student.includes('Myra') ? 0.25 : 0.1;
                const status = Math.random() > absenceProbability ? 'present' : 'absent';
                data.push({ classId, student, date, status });
            }
        }
    }
    return data;
};

const allRecords = generateMockData();

const chartConfig = {
  present: {
    label: 'Present',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function ReportsPage() {
    const [date, setDate] = useState<DateRange | undefined>({
        from: addDays(new Date(), -7),
        to: new Date(),
    });
    const [selectedClass, setSelectedClass] = useState('class-10b');

    const reportData = useMemo(() => {
        if (!date?.from || !date?.to) return [];

        const filteredRecords = allRecords.filter(record => {
            const isCorrectClass = record.classId === selectedClass;
            const isInDateRange = isWithinInterval(record.date, { start: date.from!, end: date.to! });
            return isCorrectClass && isInDateRange;
        });

        const studentReports: Record<string, { present: number; absent: number; total: number }> = {};
        
        filteredRecords.forEach(record => {
            if (!studentReports[record.student]) {
                studentReports[record.student] = { present: 0, absent: 0, total: 0 };
            }
            studentReports[record.student].total++;
            if (record.status === 'present') {
                studentReports[record.student].present++;
            } else {
                studentReports[record.student].absent++;
            }
        });

        return Object.entries(studentReports).map(([student, data]) => ({
            student,
            ...data
        }));
    }, [selectedClass, date]);

    const chartData = useMemo(() => reportData.map(item => ({
        name: item.student.split(' ')[0],
        present: item.total > 0 ? (item.present / item.total) * 100 : 0,
    })), [reportData]);
    
    const classNames: {[key: string]: string} = {
        'class-10b': 'Class 10-B',
        'class-9a': 'Class 9-A'
    };


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Button asChild variant="ghost">
          <Link href="/faculty/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Attendance Reports</h1>
        <div className="w-32"></div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                 <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-6 w-6" />
                      {classNames[selectedClass]} Report
                    </CardTitle>
                    <CardDescription>
                        Showing attendance from {date?.from ? format(date.from, "LLL dd, y") : ""} to {date?.to ? format(date.to, "LLL dd, y") : ""}
                    </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="class-10b">Class 10-B</SelectItem>
                            <SelectItem value="class-9a">Class 9-A</SelectItem>
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className="w-[240px] justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                            date.to ? (
                                <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                            ) : (
                            <span>Pick a date</span>
                            )}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
                <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
                {chartData.length > 0 ? (
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <RechartsBarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="name"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            />
                            <YAxis unit="%" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="present" fill="var(--color-present)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                ) : (
                     <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                        <p className="text-muted-foreground">No data available for the selected range.</p>
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Breakdown</h3>
                <div className="border rounded-md">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead className="text-center">Present Days</TableHead>
                        <TableHead className="text-center">Absent Days</TableHead>
                        <TableHead className="text-right">Attendance %</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {reportData.length > 0 ? reportData.map((row) => (
                        <TableRow key={row.student}>
                        <TableCell className="font-medium">{row.student}</TableCell>
                        <TableCell className="text-center">{row.present}</TableCell>
                        <TableCell className="text-center">{row.absent}</TableCell>
                        <TableCell className="text-right">{row.total > 0 ? ((row.present / row.total) * 100).toFixed(0) : 0}%</TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                No records to display.
                            </TableCell>
                        </TableRow>
                    )}
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
