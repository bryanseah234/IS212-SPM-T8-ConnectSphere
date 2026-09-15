export type VercelRequest = {
  url?: string;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type JsonResponder = {
  json(body: unknown): void;
};

export type VercelResponse = {
  setHeader(name: string, value: string): void;
  status(statusCode: number): JsonResponder;
  json(body: unknown): void;
};
