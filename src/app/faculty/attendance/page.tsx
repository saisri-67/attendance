
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, CameraOff, CheckCircle, XCircle, Users, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


type Student = {
  id: string;
  name: string;
  status: 'present' | 'absent' | 'pending';
};

const initialStudents: Student[] = [
    { id: 'S001', name: 'Aarav Sharma', status: 'pending' },
    { id: 'S002', name: 'Diya Patel', status: 'pending' },
    { id: 'S003', name: 'Rohan Gupta', status: 'pending' },
    { id: 'S004', name: 'Priya Singh', status: 'pending' },
];


export default function AttendancePage() {
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isScanning, setIsScanning] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        console.error('Camera API not supported in this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Unsupported Browser',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning
    setTimeout(() => {
        const pendingStudents = students.filter(s => s.status === 'pending');
        if (pendingStudents.length > 0) {
            const randomIndex = Math.floor(Math.random() * pendingStudents.length);
            const randomStudent = pendingStudents[randomIndex];
            setStudents(prev => 
                prev.map(s => s.id === randomStudent.id ? {...s, status: 'present'} : s)
            );
            toast({
                title: 'Attendance Marked',
                description: `${randomStudent.name} has been marked present.`,
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'No Pending Students',
                description: `All students have been marked.`,
            });
        }
        setIsScanning(false);
    }, 1500);
  }

  const handleAddStudent = () => {
    if (newStudentName.trim() === "") {
        toast({
            variant: "destructive",
            title: "Invalid Name",
            description: "Student name cannot be empty.",
        });
        return;
    }
    const newStudentId = `S${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
        id: newStudentId,
        name: newStudentName.trim(),
        status: 'pending'
    };
    setStudents(prev => [...prev, newStudent]);
    setNewStudentName("");
    toast({
        title: "Student Added",
        description: `${newStudent.name} has been added to the roster.`,
    });
  };

  const handleSubmitAttendance = () => {
    toast({
        title: 'Attendance Submitted',
        description: 'The attendance records for this session have been successfully saved.',
    });
    // Here you would typically send the data to a server
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
        <h1 className="text-xl font-bold font-headline">Take Attendance</h1>
        <div className="w-32"></div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Camera View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted flex items-center justify-center">
                 <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              </div>
               {hasCameraPermission === false && (
                <Alert variant="destructive" className="mt-4">
                  <CameraOff className="h-4 w-4" />
                  <AlertTitle>Camera Access Required</AlertTitle>
                  <AlertDescription>
                    Please allow camera access in your browser to use this feature.
                  </AlertDescription>
                </Alert>
              )}
              <Button onClick={handleScan} disabled={!hasCameraPermission || isScanning} className="w-full mt-4">
                {isScanning ? 'Scanning...' : 'Scan Student ID'}
              </Button>
            </CardContent>
          </Card>
          <Card>
             <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Users className="h-6 w-6" />
                    <span>Class Roster (Class 10-B)</span>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Add Student
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Add New Student</DialogTitle>
                        <DialogDescription>
                            Enter the student's name to add them to the roster.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input 
                                id="name" 
                                value={newStudentName}
                                onChange={(e) => setNewStudentName(e.target.value)}
                                placeholder="e.g. Kabir Mehra" 
                                className="col-span-3" 
                            />
                        </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" onClick={handleAddStudent}>Add Student</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                    {students.length > 0 ? students.map(student => (
                        <div key={student.id} className="flex items-center justify-between">
                            <span className="font-medium">{student.name}</span>
                             {student.status === 'present' && <CheckCircle className="h-5 w-5 text-green-500" />}
                             {student.status === 'absent' && <XCircle className="h-5 w-5 text-red-500" />}
                             {student.status === 'pending' && <div className="h-5 w-5 rounded-full bg-gray-300 animate-pulse" />}
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center py-4">No students in the roster.</p>
                    )}
                </div>
                <Separator className="my-6" />
                <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Present:</span>
                    <span>{students.filter(s => s.status === 'present').length} / {students.length}</span>
                </div>
                 <Button className="w-full mt-6" onClick={handleSubmitAttendance}>End Session & Submit</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
