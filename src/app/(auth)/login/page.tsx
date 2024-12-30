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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  usernameOrEmal: z.string().nonempty({
    message: "This input not empty",
  }),
  password: z.string().nonempty({
    message: "This input not empty",
  }),
});

export default function Login() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usernameOrEmal: "",
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
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Masak sangat menyenangkan!
                </p>
              </div>

              <FormField
                control={form.control}
                name="usernameOrEmal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Username Or Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@mail.com or username" {...field} />
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
                      <Input placeholder="" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">Login</Button>
            </form>
          </Form>
          <Button variant='secondary' className="w-full mt-4" >Register</Button>
        </Card>
      </div>
    </>
  );
}
