export interface ErrorResponse {
  status: number;
  message: string;
  stack?: string;
}

export interface SuccessResponse<T> {
  status: number;
  data: T;
  message?: string;
}