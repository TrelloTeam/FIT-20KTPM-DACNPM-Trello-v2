import z from 'zod'

export const EchoRequestSchema = z.object({
  name: z.string(),
})
export type EchoRequest = z.infer<typeof EchoRequestSchema>
