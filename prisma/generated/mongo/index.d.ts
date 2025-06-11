export interface PrismaClientOptions {
  datasources?: any;
}

export class PrismaClient {
  constructor(options?: PrismaClientOptions);
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  [key: string]: any;
}
