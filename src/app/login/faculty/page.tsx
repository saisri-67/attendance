import { LoginForm } from '@/components/login-form';

export default function FacultyLoginPage() {
  return (
    <LoginForm 
      userType="Faculty"
      usernameLabel="Faculty ID / Email"
      redirectPath="/faculty/dashboard" 
    />
  );
}
