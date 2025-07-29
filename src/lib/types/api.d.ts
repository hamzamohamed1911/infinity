// api.d.ts

declare type SuccessfulResponse<T> = {
  version?: number;
  success: true;
  status: number;
  data: T;
  message: string | null;
  errors: undefined;
};
declare type ErrorResponse = {
  message: string;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
