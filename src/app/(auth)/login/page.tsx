"use client";

import { loginService } from "@/app/service/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useEffect } from "react";

export default function Login() {
  const { toast } = useToast()
  const [state, formAction, isPending] = useActionState(loginService, null);

  useEffect(() => {
    
    toast({
          variant: state?.status === 200 ? "default" : "destructive",
          description: state?.message || "Error",
        })
  }, [state])
  
  
  return (
    <>
      <div className="flex justify-center items-center min-h-dvh">
        <Card className="w-[350px] p-6">
            <form
              action={formAction}
              className="space-y-6"
            >
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground mt-2">
                  Masak sangat menyenangkan!
                </p>
              </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">
                      Username Or Email
                    </Label>
                      <Input
                        className="mt-2"
                        name="emailOrUsername"
                        id="emailOrUsername"
                        placeholder="me@mail.com or username"/>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-semibold">Password</Label>
                      <Input
                        className="mt-2"
                        name="password"
                        id="password"
                        placeholder="your password"
                        type="password"
                      />
                  </div>

              <Button className="w-full" type="submit" disabled={isPending}>
                { isPending && <Loader2 className="animate-spin" /> }
                Login
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </form>
        </Card>
      </div>
    </>
  );
}
