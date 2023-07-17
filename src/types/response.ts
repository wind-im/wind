export interface ResponseType {
    code: number;
    message?: string;
    data?: any;
}

export const respCode = {
  successCode: 0,
  sysError: 1
}
