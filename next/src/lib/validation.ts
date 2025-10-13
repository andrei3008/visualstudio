import { ValidationError } from './error-handler'

export interface CreateUserInput {
  name: string
  email: string
  role: 'client' | 'staff' | 'admin'
  phone?: string
  address?: string
  city?: string
  country?: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  role?: 'client' | 'staff' | 'admin'
  phone?: string
  address?: string
  city?: string
  country?: string
}

export interface CreateContactInput {
  name: string
  position?: string
  email?: string
  phone?: string
  isPrimary?: boolean
  notes?: string
}

export interface UpdateContactInput {
  name?: string
  position?: string
  email?: string
  phone?: string
  isPrimary?: boolean
  notes?: string
}

export function validateCreateUser(data: any): CreateUserInput {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request body')
  }

  const { name, email, role } = data

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters long', 'name')
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ValidationError('Invalid email address', 'email')
  }

  if (!role || !['client', 'staff', 'admin'].includes(role)) {
    throw new ValidationError('Role must be client, staff, or admin', 'role')
  }

  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    role,
    phone: data.phone?.trim() || undefined,
    address: data.address?.trim() || undefined,
    city: data.city?.trim() || undefined,
    country: data.country?.trim() || undefined
  }
}

export function validateUpdateUser(data: any): UpdateUserInput {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request body')
  }

  const result: UpdateUserInput = {}

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
      throw new ValidationError('Name must be at least 2 characters long', 'name')
    }
    result.name = data.name.trim()
  }

  if (data.email !== undefined) {
    if (typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('Invalid email address', 'email')
    }
    result.email = data.email.trim().toLowerCase()
  }

  if (data.role !== undefined) {
    if (!['client', 'staff', 'admin'].includes(data.role)) {
      throw new ValidationError('Role must be client, staff, or admin', 'role')
    }
    result.role = data.role
  }

  if (data.phone !== undefined) {
    result.phone = data.phone?.trim() || undefined
  }

  if (data.address !== undefined) {
    result.address = data.address?.trim() || undefined
  }

  if (data.city !== undefined) {
    result.city = data.city?.trim() || undefined
  }

  if (data.country !== undefined) {
    result.country = data.country?.trim() || undefined
  }

  if (Object.keys(result).length === 0) {
    throw new ValidationError('At least one field must be provided for update')
  }

  return result
}

export function validateCreateContact(data: any): CreateContactInput {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request body')
  }

  const { name } = data

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters long', 'name')
  }

  return {
    name: name.trim(),
    position: data.position?.trim() || undefined,
    email: data.email?.trim() || undefined,
    phone: data.phone?.trim() || undefined,
    isPrimary: Boolean(data.isPrimary),
    notes: data.notes?.trim() || undefined
  }
}

export function validateUpdateContact(data: any): UpdateContactInput {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid request body')
  }

  const result: UpdateContactInput = {}

  if (data.name !== undefined) {
    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
      throw new ValidationError('Name must be at least 2 characters long', 'name')
    }
    result.name = data.name.trim()
  }

  if (data.position !== undefined) {
    result.position = data.position?.trim() || undefined
  }

  if (data.email !== undefined) {
    if (data.email && typeof data.email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new ValidationError('Invalid email address', 'email')
    }
    result.email = data.email?.trim() || undefined
  }

  if (data.phone !== undefined) {
    result.phone = data.phone?.trim() || undefined
  }

  if (data.isPrimary !== undefined) {
    result.isPrimary = Boolean(data.isPrimary)
  }

  if (data.notes !== undefined) {
    result.notes = data.notes?.trim() || undefined
  }

  if (Object.keys(result).length === 0) {
    throw new ValidationError('At least one field must be provided for update')
  }

  return result
}