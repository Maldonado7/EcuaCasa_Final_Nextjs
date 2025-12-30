import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: providerId } = await params
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const isAdmin = user?.emailAddresses?.[0]?.emailAddress === 'admin@ecuacasa.com' ||
                    user?.publicMetadata?.role === 'admin'

    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { action } = await request.json()

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ 
        error: 'Invalid action. Must be "approve" or "reject"' 
      }, { status: 400 })
    }

    if (action === 'approve') {
      // Approve the provider
      const { error } = await supabaseAdmin
        .from('providers')
        .update({ 
          verified: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', providerId)

      if (error) {
        console.error('Error approving provider:', error)
        return NextResponse.json({ 
          error: 'Failed to approve provider' 
        }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true,
        message: 'Provider approved successfully' 
      })

    } else if (action === 'reject') {
      // Reject the provider (delete the record)
      const { error } = await supabaseAdmin
        .from('providers')
        .delete()
        .eq('id', providerId)

      if (error) {
        console.error('Error rejecting provider:', error)
        return NextResponse.json({ 
          error: 'Failed to reject provider' 
        }, { status: 500 })
      }

      return NextResponse.json({ 
        success: true,
        message: 'Provider rejected and removed successfully' 
      })
    }

  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}