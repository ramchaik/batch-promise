export type AllSettledResp<T> = {
  status: 'fulfilled' | 'rejected';
  value?: T;
  reason?: string;
};
export type Promisable<T> = T | Promise<T>;
export type Success = unknown[];
export type Error = unknown[];