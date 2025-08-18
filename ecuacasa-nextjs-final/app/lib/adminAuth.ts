import { User } from '@clerk/nextjs/server'

// List of admin emails  
const ADMIN_EMAILS = [
  'admin@ecuacasa.com',
  'carlosmaldonado@ecuacasa.com',
  'ecuacasa.app@gmail.com',  // Your admin email configured in Clerk
  // Add more admin emails as needed
]

export function isUserAdmin(user: User | null): boolean {
  if (!user) return false
  
  const userEmail = user.emailAddresses?.[0]?.emailAddress
  
  // Check if email is in admin list or has admin role in metadata
  return ADMIN_EMAILS.includes(userEmail) || user.publicMetadata?.role === 'admin'
}

export function getAdminEmails(): string[] {
  return [...ADMIN_EMAILS]
}