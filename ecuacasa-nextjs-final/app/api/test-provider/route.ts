import { NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export async function POST() {
  const supabaseAdmin = getSupabaseAdmin()
  try {
    // Create a test provider that needs approval - only using existing columns
    const { data: newProvider, error } = await supabaseAdmin
      .from('providers')
      .insert({
        name: 'Test Provider - Juan Pérez',
        service_type: 'Plomero Certificado',
        description: 'Plomero con 10 años de experiencia en reparaciones domésticas',
        location: 'El Centro, Cuenca',
        phone: '+593999123456',
        type: 'individual', // Required field
        verified: false, // Needs admin approval
        // user_id: null // Skip user_id for test
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating test provider:', error)
      return NextResponse.json({ 
        error: 'Failed to create test provider',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      message: 'Test provider created successfully',
      provider: newProvider
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error'
    }, { status: 500 })
  }
}