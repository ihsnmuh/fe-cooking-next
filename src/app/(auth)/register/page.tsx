"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: "This input not empty",
    })
    .min(5, {
      message: "min 5 character",
    }),
  email: z
    .string()
    .nonempty({
      message: "This input not empty",
    })
    .email({ message: "format must be email" }),
  username: z
    .string()
    .nonempty({
      message: "This input not empty",
    })
    .min(4, {
      message: "minimal 4 characters",
    }),
  password: z.string().nonempty({
    message: "This input not empty",
  }),
});

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-dvh">
        <Card className="w-[350px] p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Register</h1>
                <p className="text-balance text-muted-foreground mt-2">
                  Ayo gabung ke komunitas memasak!
                </p>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input placeholder="your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Register
              </Button>
              <div className="text-center text-sm">
                You have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
