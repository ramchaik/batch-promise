export type AllSettledResp = {
  status: 'fulfilled' | 'rejected';
  value?: Record<string, any>;
  reason?: string;
};
export type Promisable<T> = T | Promise<T>;
export type success = [];
export type error = [];
