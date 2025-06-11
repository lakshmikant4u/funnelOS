declare module '../prisma/generated/postgres' {
  export class PrismaClient {
    $connect(): Promise<void>;
    $disconnect(): Promise<void>;
    [key: string]: any;
  }
}
