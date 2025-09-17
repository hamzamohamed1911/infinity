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
  success: false;
  status: number;
  message: string;
  data?: null;
  errors?: unknown;
  preRequisites?: { id: number; name: string; type: string }[];

};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
