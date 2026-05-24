
"use client";

import Link from 'next/link';
import { ArrowLeft, CreditCard, ReceiptText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

type FeeRecord = {
  invoiceId: string;
  month: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Due' | 'Overdue';
};

const feeHistory: FeeRecord[] = [
  { invoiceId: 'INV-001', month: 'June 2024', amount: 5000, dueDate: '2024-06-10', status: 'Paid' },
  { invoiceId: 'INV-002', month: 'July 2024', amount: 5000, dueDate: '2024-07-10', status: 'Paid' },
  { invoiceId: 'INV-003', month: 'August 2024', amount: 5000, dueDate: '2024-08-10', status: 'Overdue' },
  { invoiceId: 'INV-004', month: 'September 2024', amount: 5000, dueDate: '2024-09-10', status: 'Due' },
];

const getStatusVariant = (status: FeeRecord['status']) => {
  switch (status) {
    case 'Paid':
      return 'default';
    case 'Due':
      return 'secondary';
    case 'Overdue':
      return 'destructive';
  }
};

const getOutstandingAmount = () => {
    return feeHistory.filter(f => f.status === 'Due' || f.status === 'Overdue').reduce((acc, f) => acc + f.amount, 0);
}


export default function StudentFeePaymentsPage() {
    const outstandingAmount = getOutstandingAmount();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
        <Button asChild variant="ghost">
          <Link href="/student/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-xl font-bold font-headline">Fee Payments</h1>
        <div className="w-32"></div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Outstanding Balance</CardTitle>
                        <CardDescription>Total amount due for payment.</CardDescription>
                    </div>
                     <Button disabled={outstandingAmount === 0}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Pay Total Due
                    </Button>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">₹{outstandingAmount.toLocaleString('en-IN')}</p>
                    {outstandingAmount > 0 ? (
                        <p className="text-sm text-destructive mt-1">You have pending payments.</p>
                    ) : (
                        <p className="text-sm text-green-600 mt-1">All dues cleared. Thank you!</p>
                    )}
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ReceiptText className="h-6 w-6" />
                  Payment History
                </CardTitle>
                 <CardDescription>
                    Your fee payment records for the current academic year.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Month</TableHead>
                                <TableHead className="text-center">Amount</TableHead>
                                <TableHead className="text-center">Due Date</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feeHistory.map(record => (
                                <TableRow key={record.invoiceId}>
                                    <TableCell className="font-mono">{record.invoiceId}</TableCell>
                                    <TableCell>{record.month}</TableCell>
                                    <TableCell className="text-center">₹{record.amount.toLocaleString('en-IN')}</TableCell>
                                    <TableCell className="text-center">{record.dueDate}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={getStatusVariant(record.status)}>{record.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline" disabled={record.status === 'Paid'}>
                                            Pay Now
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
