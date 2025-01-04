"use client";

import { registerService } from "@/app/service/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect } from "react";

export default function Register() {
  const { toast } = useToast();
  const [state, formAction, isPending] = useActionState(registerService, null);

  useEffect(() => {
    if (state?.message) {
      toast({
        variant: state?.code === 200 ? "default" : "destructive",
        description: state?.message || "Error",
      });
    }
  }, [state, toast]);

  return (
    <>
      <div className="flex justify-center items-center min-h-dvh">
        <Card className="w-[350px] p-6">
          <form action={formAction} className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Register</h1>
              <p className="text-balance text-muted-foreground mt-2">
                Ayo gabung ke komunitas memasak!
              </p>
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Name</Label>
              <Input id="name" name="name" placeholder="your name" />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Email</Label>
              <Input id="email" name="email" placeholder="me@mail.com" />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="your username"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="your password"
                type="password"
              />
            </div>

            <Button className="w-full" type="submit" disabled={isPending}>
              { isPending && <Loader2 className="animate-spin" /> }
              Register
            </Button>
            <div className="text-center text-sm">
              You have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
