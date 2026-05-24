
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, User } from "lucide-react";
import { useToast } from '@/hooks/use-toast';


type LoginFormProps = {
  userType: 'Faculty' | 'Student';
  usernameLabel: string;
  redirectPath?: string;
};

export function LoginForm({ userType, usernameLabel, redirectPath = "/" }: LoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Please enter both username and password.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // For demo, any username/password is accepted
      console.log(`Logging in ${userType} with username: ${username}`);
      localStorage.setItem('user', JSON.stringify({ type: userType, username }));
      router.push(redirectPath);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">{userType} Login</CardTitle>
          <CardDescription>
            Please enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{usernameLabel}</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input 
                id="username" 
                placeholder={`Enter your ${usernameLabel.toLowerCase()}`} 
                required 
                className="pl-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
