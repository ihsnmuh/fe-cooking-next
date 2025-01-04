"use server";

import { api } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ILoginService {
  sessionId: string;
}

interface IRegisterService {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export async function loginService(_: unknown, payload: FormData) {
  const emailOrUsername = payload.get("emailOrUsername") as string;
  const password = payload.get("password") as string;

  if (!emailOrUsername || !password) {
    return {
      error: "Invalid input",
      message: "Email or password is required",
      status: 400,
    };
  }

  const cookiesStore = await cookies();

  const { data, error, message, code, status } = await api.post<ILoginService>(
    "/login",
    {
      emailOrUsername: emailOrUsername,
      password: password,
    },
    false
  );

  if (error || !data || code !== 200) {
    return {
      error,
      message,
      code,
      status,
    };
  }

  if (data?.sessionId) {
    cookiesStore.set("cooking-token", data.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    redirect("/");
  }

  return { data, code, message };
}

export async function registerService(_: unknown, payload: FormData) {
  const name = payload.get("name") as string;
  const email = payload.get("email") as string;
  const username = payload.get("username") as string;
  const password = payload.get("password") as string;

  if (!name || !password || !email || !username) {
    return {
      error: "Invalid input",
      message: "All fields are required",
      status: 400,
    };
  }

  const { data, error, message, code, status } =
    await api.post<IRegisterService>(
      "/register",
      {
        name: name,
        email: email,
        username: username,
        password: password,
        role: "USER",
      },
      false
    );

  if (!data || code !== 201) {
    return {
      error,
      message,
      status,
      code,
    };
  }

  if (data.id) {
    redirect("/login");
  }

  return { data, code, message, status };
}
