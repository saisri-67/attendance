
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, PlusCircle, Trash2, UserPlus, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

type Student = {
  id: string;
  name: string;
};

type SchoolClass = {
  id: string;
  name: string;
  subjects: string[];
  students: Student[];
};

const defaultSubjects = ['Mathematics', 'Science', 'Social'];
const defaultStudentNames = [
    'Aarav Sharma', 'Diya Patel', 'Rohan Gupta', 'Priya Singh', 'Kabir Mehra',
    'Anika Verma', 'Vivaan Joshi', 'Saanvi Reddy', 'Arjun Kumar', 'Myra Das',
    'Ishaan Choudhary', 'Zara Khan', 'Reyansh Agarwal', 'Ananya Mishra', 'Advik Iyer',
    'Aadhya Nair', 'Krish Menon', 'Kiara Bhat', 'Vihaan Shah', 'Ira Sharma'
];

const generateDefaultStudents = (classId: string): Student[] => {
    return defaultStudentNames.map((name, i) => ({
        id: `${classId}-S${String(i + 1).padStart(3, '0')}`,
        name: name,
    }));
};

const initialClasses: SchoolClass[] = [
  {
    id: 'C01',
    name: 'Class 10-B',
    subjects: [...defaultSubjects],
    students: generateDefaultStudents('C01'),
  },
  {
    id: 'C02',
    name: 'Class 9-A',
    subjects: [...defaultSubjects],
    students: generateDefaultStudents('C02'),
  },
];


export default function ClassesPage() {
    const { toast } = useToast();
    const [classes, setClasses] = useState<SchoolClass[]>(initialClasses);
    const [isLoaded, setIsLoaded] = useState(false);
    const [newClassName, setNewClassName] = useState('');
    const [newSubjectName, setNewSubjectName] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

     useEffect(() => {
        try {
            const item = window.localStorage.getItem('facultyClasses');
            if (item) {
                setClasses(JSON.parse(item));
            }
        } catch (error) {
            console.error('Failed to load classes from local storage:', error);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                window.localStorage.setItem('facultyClasses', JSON.stringify(classes));
            } catch (error) {
                console.error('Failed to save classes to local storage:', error);
            }
        }
    }, [classes, isLoaded]);

    const handleAddClass = () => {
        if (!newClassName.trim()) {
            toast({ variant: "destructive", title: "Class name cannot be empty." });
            return;
        }
        const newClassId = `C${String(classes.length + 1).padStart(2, '0')}`;
        const newClass: SchoolClass = {
            id: newClassId,
            name: newClassName.trim(),
            subjects: [...defaultSubjects],
            students: generateDefaultStudents(newClassId),
        };
        setClasses(prev => [...prev, newClass]);
        setNewClassName('');
        toast({ title: "Class Added", description: `${newClass.name} has been created with default subjects and students.` });
    };
    
    const handleAddStudent = () => {
        if (!newStudentName.trim() || !selectedClassId) {
             toast({ variant: "destructive", title: "Student name cannot be empty." });
            return;
        }
        setClasses(prev => prev.map(c => {
            if (c.id === selectedClassId) {
                const newStudent: Student = {
                    id: `S${String(Math.floor(Math.random() * 900) + 100)}`, // temp random ID
                    name: newStudentName.trim(),
                };
                return { ...c, students: [...c.students, newStudent] };
            }
            return c;
        }));
        setNewStudentName('');
        setSelectedClassId(null);
        toast({ title: "Student Added", description: `${newStudentName.trim()} has been added.` });
    };

    const handleRemoveStudent = (classId: string, studentId: string) => {
        setClasses(prev => prev.map(c => {
            if (c.id === classId) {
                return { ...c, students: c.students.filter(s => s.id !== studentId) };
            }
            return c;
        }));
        toast({ title: "Student Removed" });
    };

    const handleAddSubject = () => {
        if (!newSubjectName.trim() || !selectedClassId) {
            toast({ variant: "destructive", title: "Subject name cannot be empty." });
            return;
        }
        setClasses(prev => prev.map(c => {
            if (c.id === selectedClassId && !c.subjects.includes(newSubjectName.trim())) {
                return { ...c, subjects: [...c.subjects, newSubjectName.trim()] };
            }
            return c;
        }));
        setNewSubjectName('');
        setSelectedClassId(null);
        toast({ title: "Subject Added", description: `${newSubjectName.trim()} has been added.` });
    };

    const handleRemoveSubject = (classId: string, subjectToRemove: string) => {
        setClasses(prev => prev.map(c => {
            if (c.id === classId) {
                return { ...c, subjects: c.subjects.filter(s => s !== subjectToRemove) };
            }
            return c;
        }));
        toast({ title: "Subject Removed" });
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
        <h1 className="text-xl font-bold font-headline">Manage Classes</h1>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Class
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>Enter a name for the new class. Default subjects and students will be added.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="className" className="text-right">Class Name</Label>
                        <Input id="className" value={newClassName} onChange={(e) => setNewClassName(e.target.value)} placeholder="e.g. Class 8-C" className="col-span-3"/>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleAddClass}>Create Class</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              My Classes
            </CardTitle>
            <CardDescription>View and manage your classes, subjects, and student rosters.</CardDescription>
          </CardHeader>
          <CardContent>
            {classes.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                {classes.map(c => (
                    <AccordionItem value={c.id} key={c.id}>
                        <AccordionTrigger className="text-lg font-medium">
                            <div>
                                <span>{c.name}</span>
                                <span className="text-sm font-normal text-muted-foreground ml-2">({c.students.length} students)</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">Subjects</h4>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="outline" onClick={() => setSelectedClassId(c.id)}>
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Add Subject
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Subject to {c.name}</DialogTitle>
                                                <DialogDescription>Enter the new subject name.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Label htmlFor="subjectName">Subject Name</Label>
                                                <Input id="subjectName" value={newSubjectName} onChange={(e) => setNewSubjectName(e.target.value)} placeholder="e.g. Biology" />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={handleAddSubject}>Add Subject</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {c.subjects.length > 0 ? c.subjects.map(subject => (
                                        <Badge key={subject} variant="secondary" className="text-base">
                                            {subject}
                                            <button onClick={() => handleRemoveSubject(c.id, subject)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    )) : <p className="text-sm text-muted-foreground">No subjects added yet.</p>}
                                </div>
                            </div>

                           <div>
                            <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold">Student Roster</h4>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" onClick={() => setSelectedClassId(c.id)}>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Add Student
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Add Student to {c.name}</DialogTitle>
                                                <DialogDescription>Enter the new student's name.</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <Label htmlFor="studentName">Student Name</Label>
                                                <Input id="studentName" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="e.g. Anika Verma" />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button onClick={handleAddStudent}>Add to Class</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="border rounded-md">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Student ID</TableHead>
                                                <TableHead>Student Name</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {c.students.length > 0 ? c.students.map(student => (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-mono">{student.id}</TableCell>
                                                    <TableCell>{student.name}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveStudent(c.id, student.id)}>
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} className="text-center text-muted-foreground">No students in this class yet.</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            ) : (
                 <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">You haven't added any classes yet.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
