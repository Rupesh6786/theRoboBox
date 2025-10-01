
"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Bot, Mail, Key, LogIn, UserPlus, Phone, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: any;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [authView, setAuthView] = useState<"login" | "register" | "forgot" | "phone">("login");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (authView === 'phone' && !window.recaptchaVerifier && recaptchaContainerRef.current) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerRef.current, {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  }, [authView, auth]);


  const handlePasswordAuth = async () => {
    setLoading(true);
    try {
      if (authView === "register") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        toast({
          title: "Registration Successful",
          description: "A verification email has been sent. Please check your inbox.",
        });
        setAuthView("login");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
           toast({
            title: "Email Not Verified",
            description: "Please verify your email before logging in.",
            variant: "destructive",
          });
          await getAuth(app).signOut();
          return;
        }
        toast({ title: "Login Successful" });
        router.push(userCredential.user.email === "admin@example.com" ? "/admin" : "/account");
      }
    } catch (error: any) {
      toast({
        title: authView === "register" ? "Registration Failed" : "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast({ title: "Google Sign-In Successful" });
      router.push(result.user.email === "admin@example.com" ? "/admin" : "/account");
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast({ title: "Please enter your email", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: "Password Reset Email Sent", description: "Check your inbox for instructions." });
      setAuthView("login");
    } catch (error: any) {
      toast({ title: "Password Reset Failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const verifier = window.recaptchaVerifier!;
      const confirmationResult = await signInWithPhoneNumber(auth, `+${phoneNumber}`, verifier);
      window.confirmationResult = confirmationResult;
      setOtpSent(true);
      toast({ title: "OTP Sent", description: "Please enter the OTP you received." });
    } catch (error: any)
    {
      toast({ title: "Failed to send OTP", description: error.message, variant: "destructive" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      toast({ title: "Phone Sign-In Successful" });
      router.push(result.user.email === "admin@example.com" ? "/account" : "/account");
    } catch (error: any) {
      toast({ title: "Invalid OTP", description: "Please check the code and try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const renderForm = () => {
    switch (authView) {
      case "register":
      case "login":
        return (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary rounded-full p-4 w-fit mb-4">
                <Bot className="w-10 h-10 text-primary-foreground" />
              </div>
              <CardTitle className="text-3xl font-bold font-headline">
                {authView === 'login' ? "Welcome Back" : "Create an Account"}
              </CardTitle>
              <CardDescription>
                {authView === 'login' ? "Access your RoboBox account." : "Join the robotics revolution."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email"><Mail className="inline-block mr-2" />Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} className="bg-secondary/30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password"><Key className="inline-block mr-2" />Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} className="bg-secondary/30" />
              </div>
              {authView === 'login' && (
                <div className="text-right">
                  <Button variant="link" size="sm" onClick={() => setAuthView('forgot')}>Forgot Password?</Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button onClick={handlePasswordAuth} className="w-full" disabled={loading} size="lg">
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {authView === 'login' ? <><LogIn className="mr-2" /> Sign In</> : <><UserPlus className="mr-2" /> Create Account</>}
              </Button>
              <div className="relative w-full flex items-center my-2">
                <Separator className="flex-grow" />
                <span className="mx-4 text-xs text-muted-foreground">OR</span>
                <Separator className="flex-grow" />
              </div>
               <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
                 <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-79.9 67.9C291.2 110.4 221.2 102.3 167 121c-52.2 18.1-84 69.4-76.8 122.9 8.5 60.5 59.9 104.9 121.2 102.3 54.4-2.3 93.3-33.5 105.8-64.4H248V261.8h232.2z"></path></svg>
                Sign in with Google
              </Button>
               <Button variant="outline" className="w-full" onClick={() => setAuthView('phone')} disabled={loading}>
                 <Phone className="mr-2" />
                Sign in with Phone
              </Button>
            </CardFooter>
          </>
        );
      case "forgot":
        return (
          <>
            <CardHeader className="text-center">
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>Enter your email to receive a password reset link.</CardDescription>
            </CardHeader>
            <CardContent>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button onClick={handlePasswordReset} disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <Button variant="link" onClick={() => setAuthView('login')}>Back to Login</Button>
            </CardFooter>
          </>
        );
       case "phone":
        return (
          <>
             <div ref={recaptchaContainerRef}></div>
            <CardHeader className="text-center">
              <CardTitle>Sign in with Phone</CardTitle>
              <CardDescription>{otpSent ? "Enter the OTP sent to your phone." : "Enter your phone number to receive an OTP."}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!otpSent ? (
                <div className="space-y-2">
                  <Label htmlFor="phone"><Phone className="inline-block mr-2" />Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="1234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={loading} />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp"><MessageSquare className="inline-block mr-2" />OTP</Label>
                  <Input id="otp" type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} disabled={loading} />
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
               {!otpSent ? (
                <Button onClick={handleSendOtp} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send OTP"}
                </Button>
              ) : (
                <Button onClick={handleVerifyOtp} disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Verify OTP"}
                </Button>
              )}
              <Button variant="link" onClick={() => setAuthView('login')}>Back to Login</Button>
            </CardFooter>
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 overflow-hidden">
      <Card className="w-full max-w-md shadow-2xl relative">
        <div className="absolute -top-16 -left-16 w-32 h-32 text-primary/10 -z-10">
          <Bot className="w-full h-full animate-pulse" />
        </div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 text-primary/10 -z-10">
          <Bot className="w-full h-full animate-bounce" />
        </div>
        
        {renderForm()}
        
        { (authView === 'login' || authView === 'register') && (
            <CardFooter>
                <p className="text-sm text-muted-foreground mx-auto">
                    {authView === 'login' ? "Don't have an account?" : "Already have an account?"}
                    <Button
                    variant="link"
                    className="pl-2"
                    onClick={() => setAuthView(authView === 'login' ? 'register' : 'login')}
                    >
                    {authView === 'login' ? "Register" : "Login"}
                    </Button>
                </p>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
