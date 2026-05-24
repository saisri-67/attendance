
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings, User, KeyRound, Bell, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  
  // Mock data - in a real app, this would come from an API
  const [name, setName] = useState('Dr. Anjali Sharma');
  const [email, setEmail] = useState('anjali.sharma@publicschool.edu');
  const [phone, setPhone] = useState('+91 98765 43210');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveChanges = () => {
    // Add validation logic here
    if (newPassword && newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'New passwords do not match.',
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: 'Settings Saved',
      description: 'Your account settings have been successfully updated.',
    });

    // Clear password fields after submission
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
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
        <h1 className="text-xl font-bold font-headline">Account Settings</h1>
        <div className="w-32"></div>
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Manage Your Account
            </CardTitle>
            <CardDescription>Update your profile, password, and notification preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><User className="h-5 w-5"/> Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="facultyId">Faculty ID</Label>
                  <Input id="facultyId" value="FAC-001" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                   <div className="relative">
                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" />
                   </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                   <div className="relative">
                     <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                     <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
                   </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Change Password */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2"><KeyRound className="h-5 w-5"/> Change Password</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Notification Settings */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2"><Bell className="h-5 w-5"/> Notification Settings</h3>
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive important notifications and alerts via email.</p>
                    </div>
                    <Switch 
                        id="email-notifications" 
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
