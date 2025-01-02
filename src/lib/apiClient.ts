import { cookies } from "next/headers";

interface Response<T> {
  message: string;
  error: string;
  data: T | null;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async getHeaders() {
    const storeCookies = await cookies();
    const token = storeCookies.get("cooking-token")?.value;

    return {
      Autorization: `Bearer ${token}`,
    };
  }

  async get<T>(path: string): Promise<Response<T>> {
    const result = {
      data: null,
      message: "",
      error: "",
    };

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: await this.getHeaders(),
      });
      const data = await response.json();
      result.data = data;
      result.message = data.message;
    } catch (error) {
      if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Unknown error";
      }
    }

    return result;
  }

  async post<T>(
    path: string,
    data: Record<string, unknown>,
    isFormData: boolean = false
  ): Promise<Response<T>> {
    const result = {
      data: null,
      message: "",
      error: "",
    };

    // bodypayload can be JSON or FormData
    let bodyPayload = null;

    if (isFormData && data) {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key] as string);
      }

      bodyPayload = formData;
    }

    if (!isFormData) bodyPayload = JSON.stringify(data);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await this.getHeaders()),
        },
        body: bodyPayload,
      });
      const data = await response.json();
      result.data = data;
      result.message = data.message;
    } catch (error) {
      if (error instanceof Error) {
        result.error = error.message;
      } else {
        result.error = "Unknown error";
      }
    }

    return result;
  }
}
