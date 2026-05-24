
"use client";

import Link from 'next/link';
import { ArrowLeft, FileText, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type GradeRecord = {
  subject: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  remarks: string;
};

const reportCardData: GradeRecord[] = [
  { subject: 'Mathematics', score: 95, grade: 'A+', remarks: 'Excellent understanding of complex problems.' },
  { subject: 'Science', score: 88, grade: 'A', remarks: 'Great practical and theoretical knowledge.' },
  { subject: 'Social', score: 82, grade: 'B', remarks: 'Good effort, can improve map work.' },
  { subject: 'English', score: 92, grade: 'A+', remarks: 'Outstanding command of language and literature.' },
  { subject: 'Hindi', score: 78, grade: 'B', remarks: 'Consistent performance.' },
];

const getGradeBadgeVariant = (grade: string) => {
    switch (grade) {
        case 'A+':
        case 'A':
            return 'default';
        case 'B':
        case 'C':
            return 'secondary';
        default:
            return 'destructive';
    }
}

const getOverallStats = () => {
    const totalScore = reportCardData.reduce((acc, record) => acc + record.score, 0);
    const totalSubjects = reportCardData.length;
    const overallPercentage = totalSubjects > 0 ? (totalScore / (totalSubjects * 100)) * 100 : 0;
    
    let overallGrade = 'F';
    if (overallPercentage >= 90) overallGrade = 'A+';
    else if (overallPercentage >= 80) overallGrade = 'A';
    else if (overallPercentage >= 70) overallGrade = 'B';
    else if (overallPercentage >= 60) overallGrade = 'C';
    else if (overallPercentage >= 50) overallGrade = 'D';

    return {
        percentage: overallPercentage.toFixed(2),
        grade: overallGrade,
    }
}

export default function StudentReportCardPage() {
    const overall = getOverallStats();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Button asChild variant="ghost">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">My Report Card</h1>
        <Button variant="outline">Download PDF</Button>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Final Term Report Card
            </CardTitle>
             <CardDescription>
                Academic Year: 2023-2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 mb-6">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Percentage</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overall.percentage}%</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overall.grade}</div>
                    </CardContent>
                </Card>
            </div>

            <Separator className="my-6" />
            
            <h3 className="text-lg font-semibold mb-4">Subject-wise Performance</h3>
             <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-center">Score (out of 100)</TableHead>
                            <TableHead className="text-center">Grade</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reportCardData.map(record => (
                            <TableRow key={record.subject}>
                                <TableCell className="font-medium">{record.subject}</TableCell>
                                <TableCell className="text-center font-mono">{record.score}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={getGradeBadgeVariant(record.grade)}>{record.grade}</Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{record.remarks}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-8 text-center text-muted-foreground text-sm">
                <p>This is a system-generated report card. For any queries, please contact the school administration.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
