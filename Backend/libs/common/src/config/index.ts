import type { config as base } from './default'

type TDefaultConfig = typeof base
export type TConfig = TDefaultConfig

export const configuration = async (): Promise<TConfig> => {
  const { config: baseConfig }: { config: TDefaultConfig } = await import(`${__dirname}/default`)

  return baseConfig
}
