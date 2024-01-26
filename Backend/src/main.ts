import { initApplication } from '@/app'

async function bootstrap() {
  const app = await initApplication()

  const PORT = process.env.PORT || 3000
  return app.listen(PORT, () =>
    console.log(`Server are running on http://localhost:${PORT}`),
  )
}
bootstrap()
