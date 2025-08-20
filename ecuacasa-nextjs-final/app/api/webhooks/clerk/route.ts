import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_SERVICE_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Error occured -- no svix headers' }, { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || 'whsec_test'
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return NextResponse.json({ error: 'Error occured' }, { status: 400 })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, phone_numbers, unsafe_metadata } = evt.data

    const email = email_addresses[0]?.email_address
    const phone = phone_numbers?.[0]?.phone_number
    const role = (unsafe_metadata?.role as string) || 'customer' // Default to customer

    try {
      // Upsert user profile in Supabase
      const { error } = await supabaseAdmin
        .from('user_profiles')
        .upsert({
          clerk_id: id,
          email: email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          role: role,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'clerk_id'
        })

      if (error) {
        console.error('Error upserting user:', error)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      console.log('User synced to Supabase:', id)
    } catch (error) {
      console.error('Error:', error)
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data

    try {
      // Delete user profile from Supabase
      const { error } = await supabaseAdmin
        .from('user_profiles')
        .delete()
        .eq('clerk_id', id)

      if (error) {
        console.error('Error deleting user:', error)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return NextResponse.json({ message: 'Webhook received' }, { status: 200 })
}

export async function GET() {
  return NextResponse.json({ message: 'Clerk webhook endpoint' })
}