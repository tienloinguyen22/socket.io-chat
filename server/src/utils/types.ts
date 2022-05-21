export type TimestampInMilliseconds = number;

export interface IsAuditable {
  createdBy?: string;
  createdAt?: TimestampInMilliseconds;
  updatedBy?: string;
  updatedAt?: TimestampInMilliseconds;
}