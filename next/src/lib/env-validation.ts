// Environment Variables Validation
const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'DATABASE_URL'
] as const

const optionalEnvVars = [
  'NODE_ENV',
  'NEXTAUTH_INTERNAL_SECRET'
] as const

type EnvVar = typeof requiredEnvVars[number] | typeof optionalEnvVars[number]

function validateEnvVar(name: EnvVar): string {
  const value = process.env[name]

  if (!value && requiredEnvVars.includes(name as any)) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value || ''
}

function validateUrl(name: EnvVar): string {
  const value = validateEnvVar(name)

  if (value && !isValidUrl(value)) {
    throw new Error(`Invalid URL format for ${name}: ${value}`)
  }

  return value
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Validate all required environment variables on startup
export function validateEnvironment() {
  const errors: string[] = []

  try {
    // Required variables
    requiredEnvVars.forEach(name => {
      try {
        validateEnvVar(name)
      } catch (error) {
        errors.push((error as Error).message)
      }
    })

    // URL validation for specific variables
    ;['NEXTAUTH_URL'].forEach(name => {
      try {
        validateUrl(name as EnvVar)
      } catch (error) {
        errors.push((error as Error).message)
      }
    })

    if (errors.length > 0) {
      throw new Error(`Environment validation failed:\n${errors.join('\n')}`)
    }

    console.log('✅ Environment variables validated successfully')

    return {
      NEXTAUTH_URL: validateUrl('NEXTAUTH_URL'),
      NEXTAUTH_SECRET: validateEnvVar('NEXTAUTH_SECRET'),
      DATABASE_URL: validateEnvVar('DATABASE_URL'),
      NODE_ENV: validateEnvVar('NODE_ENV') || 'development',
      NEXTAUTH_INTERNAL_SECRET: validateEnvVar('NEXTAUTH_INTERNAL_SECRET')
    }

  } catch (error) {
    console.error('❌ Environment validation failed:', error)
    throw error
  }
}

// Export validated environment variables
export const env = validateEnvironment()

// Runtime environment checks
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isTest = env.NODE_ENV === 'test'

// Database URL validation
export function isValidDatabaseUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ['postgresql:', 'postgres:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

// Validate database connection string format
if (!isValidDatabaseUrl(env.DATABASE_URL)) {
  throw new Error(`Invalid DATABASE_URL format. Expected PostgreSQL connection string.`)
}