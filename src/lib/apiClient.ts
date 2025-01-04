import { IResponseAPI } from "@/types/interfaces/responseAPI";
import { cookies } from "next/headers";

export class ApiClient {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async getHeaders() {
		const storeCookies = await cookies();
		const token = storeCookies.get("cooking-token")?.value;

		if (!token) {
			return null;
		}

		return {
			Authorization: `Bearer ${token}`,
		};
	}

	async get<T>(path: string): Promise<IResponseAPI<T>> {
		const result = {
			data: null,
			message: "",
			error: "",
			status: "",
			code: 200,
		};

		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				headers: { ...(await this.getHeaders()) },
			});
			const data = await response.json();

			result.data = data.data;
			result.code = data.code;
			result.status = data.status;
			result.message = data.message;
		} catch (error) {
			if (error instanceof Error) {
				result.code = 500;
				result.status = "error";
				result.error = error.message;
			} else {
				result.code = 500;
				result.status = "error";
				result.error = "Unknown error";
			}
		}

		return result;
	}

	async post<T>(
		path: string,
		data: Record<string, unknown>,
		isFormData: boolean,
	): Promise<IResponseAPI<T>> {
		const result = {
			data: null,
			message: "",
			error: "",
			status: "",
			code: 200,
		};

		// bodypayload can be JSON or FormData
		let bodyPayload = null;

		if (isFormData && data) {
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key] as string);
			}

			bodyPayload = formData;
		} else {
			bodyPayload = JSON.stringify(data);
		}

		try {
			const response = await fetch(`${this.baseUrl}${path}`, {
				method: "POST",
				headers: {
					...(isFormData ? {} : { "Content-Type": "application/json" }),
					...(await this.getHeaders()),
				},
				body: bodyPayload,
			});
			
			console.log("🚀 ~ ApiClient ~ response:", response)
			const data = await response.json();
			console.log("🚀 ~ ApiClient ~ data:", data)

			result.data = data.data;
			result.code = data.code;
			result.status = data.status;
			result.message = data.message;
		} catch (error) {
			if (error instanceof Error) {
				result.code = 500;
				result.status = "error";
				result.error = error.message;
			} else {
				result.code = 500;
				result.status = "error";
				result.error = "Unknown error";
			}
		}

		return result;
	}
}
