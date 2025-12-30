import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { getSupabaseAdmin } from '../../../../lib/supabase-admin'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { id } = await params
    const { data: provider, error } = await supabaseAdmin
      .from('providers')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !provider) {
      return NextResponse.json({ 
        error: 'Provider not found' 
      }, { status: 404 })
    }

    return NextResponse.json(provider)
  } catch (error) {
    console.error('Error fetching provider:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const updates = await request.json()

    // Update provider in database with all fields
    const updateData: any = {
      name: updates.name,
      service_type: updates.service_type,
      description: updates.description,
      location: updates.location,
      phone: updates.phone,
      updated_at: new Date().toISOString()
    }

    // Add extended fields if they exist
    if (updates.price_range !== undefined) updateData.price_range = updates.price_range
    if (updates.response_time !== undefined) updateData.response_time = updates.response_time
    if (updates.experience !== undefined) updateData.experience = updates.experience
    if (updates.availability !== undefined) updateData.availability = updates.availability
    if (updates.warranty !== undefined) updateData.warranty = updates.warranty
    if (updates.insurance !== undefined) updateData.insurance = updates.insurance
    if (updates.emergency_available !== undefined) updateData.emergency_available = updates.emergency_available
    if (updates.services !== undefined) updateData.services = updates.services
    if (updates.portfolio !== undefined) updateData.portfolio = updates.portfolio
    
    // Ecuador-specific extended fields
    if (updates.cedula !== undefined) updateData.cedula = updates.cedula
    if (updates.references !== undefined) updateData.references = updates.references
    if (updates.insurance_info !== undefined) updateData.insurance_info = updates.insurance_info
    if (updates.portfolio_images !== undefined) updateData.portfolio_images = updates.portfolio_images
    if (updates.years_experience !== undefined) updateData.years_experience = updates.years_experience
    if (updates.hourly_rate !== undefined) updateData.hourly_rate = updates.hourly_rate
    if (updates.availability_schedule !== undefined) updateData.availability_schedule = updates.availability_schedule
    if (updates.emergency_contact !== undefined) updateData.emergency_contact = updates.emergency_contact

    const { data: updatedProvider, error } = await supabaseAdmin
      .from('providers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating provider:', error)
      return NextResponse.json({ 
        error: 'Failed to update provider' 
      }, { status: 500 })
    }

    return NextResponse.json(updatedProvider)
  } catch (error) {
    console.error('Error updating provider:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}