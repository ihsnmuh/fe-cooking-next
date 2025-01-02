import { ApiClient } from "../lib/apiClient";

export const api = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);