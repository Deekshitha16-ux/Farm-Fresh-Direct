
'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email is required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);

    try {
        await sendPasswordResetEmail(auth, email);
        toast({
            title: "Password Reset Link Sent",
            description: `If an account with ${email} exists, a password reset link has been sent.`,
        });
        router.push('/login');
    } catch (error: any) {
        console.error("Password Reset Error: ", error);
        toast({
            title: "Error Sending Reset Link",
            description: error.message || "An unknown error occurred. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mb-4 justify-center" />
          <CardTitle className="font-headline text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email to receive a reset link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Remembered your password?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
