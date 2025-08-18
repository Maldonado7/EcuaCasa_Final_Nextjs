import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import AdminDashboard from '../components/AdminDashboard'
import { isUserAdmin } from '../lib/adminAuth'

export default async function AdminPage() {
  const user = await currentUser()
  
  // Check if user is authenticated
  if (!user) {
    redirect('/sign-in')
  }
  
  // Check if user has admin role
  if (!isUserAdmin(user)) {
    redirect('/')
  }

  return <AdminDashboard />
}