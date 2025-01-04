export interface IResponseAPI<T> {
	message: string;
	error: string;
	data: T | null;
	status: string;
	code: number;
}
