import { z } from "zod";
export declare const TestApiResponseSchema: z.ZodObject<{
    Hello: z.ZodString;
}, "strip", z.ZodTypeAny, {
    Hello: string;
}, {
    Hello: string;
}>;
export declare const TestApiQuerySchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type TestApiResponse = z.infer<typeof TestApiResponseSchema>;
export type TestApiQuery = z.infer<typeof TestApiQuerySchema>;
