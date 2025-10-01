
"use client";

import { useState } from "react";
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
} from "firebase/auth";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Bot } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const router = useRouter();
  const { toast } = useToast();

  const handleAuthAction = async () => {
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Registration Successful",
          description: "You can now log in.",
        });
        setIsRegistering(false); // Switch to login view after successful registration
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        toast({ title: "Login Successful" });

        // Placeholder for admin check
        if (user.email === "admin@example.com") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (error: any) {
      toast({
        title: isRegistering ? "Registration Failed" : "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background overflow-hidden">
      <Card className="w-[450px] shadow-2xl relative">
        <div className="absolute -top-16 -left-16 w-32 h-32 text-primary/10 -z-10">
          <Bot className="w-full h-full animate-pulse" />
        </div>
        <div className="absolute -bottom-12 -right-12 w-24 h-24 text-primary/10 -z-10">
          <Bot className="w-full h-full animate-bounce" />
        </div>

        <CardHeader className="text-center">
          <div className="mx-auto bg-primary rounded-full p-4 w-fit mb-4">
            <Bot className="w-10 h-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">
            {isRegistering ? "Create an Account" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isRegistering
              ? "Join the robotics revolution."
              : "Access your RoboBox account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="bg-secondary/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="bg-secondary/30"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleAuthAction}
            className="w-full"
            disabled={loading}
            size="lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isRegistering ? "Create Account" : "Sign In"}
          </Button>
          <p className="text-sm text-muted-foreground">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}
            <Button
              variant="link"
              className="pl-2"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering ? "Login" : "Register"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
