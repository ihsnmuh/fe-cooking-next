"use server";

import { api } from "@/utils/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ILoginService {
    sessionId: string;
}

export async function loginService(_: unknown, payload: FormData) {

    const emailOrUsername = payload.get("emailOrUsername") as string;
    const password = payload.get("password") as string;

    if (!emailOrUsername || !password) {
        return {
            error: "Invalid input",
            message: "Email or password is required",
            status: 400,
        }
    }

    const cookiesStore = await cookies();

    const { data, error, message, status } = await api.post<ILoginService>("/login", {
        emailOrUsername: emailOrUsername,
        password: password,
    });

    if (error || !data || status !== 200) {

        return {
            error,
            message,
            status,
        }
    }

    if (data?.sessionId) {
        
        cookiesStore.set("cooking-token", data.sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
    
        redirect("/");
    }

    return {data, status, message};


}