import { LoginForm } from '@/components/login-form';

export default function StudentLoginPage() {
  return (
    <LoginForm 
      userType="Student"
      usernameLabel="Student ID"
      redirectPath="/student/dashboard"
    />
  );
}
