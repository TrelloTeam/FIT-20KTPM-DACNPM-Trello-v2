import { z } from "zod";

export const TestApiResponseSchema = z.object({
  Hello: z.string(),
});

export const TestApiQuerySchema = z.object({
  name: z.string({ required_error: "Need name please" }),
});

export type TestApiResponse = z.infer<typeof TestApiResponseSchema>;
export type TestApiQuery = z.infer<typeof TestApiQuerySchema>;
