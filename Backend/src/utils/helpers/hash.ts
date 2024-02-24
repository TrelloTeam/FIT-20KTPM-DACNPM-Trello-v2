import { genSalt, hash } from 'bcryptjs'

interface IBcryptParams {
  salt?: string | number
  source: string
}

function generateSalt(characterNumber = 10): Promise<string> {
  return genSalt(characterNumber)
}

async function generateWithBcrypt({
  salt,
  source
}: IBcryptParams): Promise<string> {
  salt = salt || (await generateSalt())

  return hash(source, salt)
}

export default { generateWithBcrypt }
