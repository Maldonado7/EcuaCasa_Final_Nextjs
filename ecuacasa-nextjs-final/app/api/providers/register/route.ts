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

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const providerData = await request.json()
    console.log('Received comprehensive provider data:', JSON.stringify(providerData, null, 2))

    // Validate required fields - STRICT validation, no fallbacks
    const requiredFields = ['name', 'service_type', 'phone', 'account_type', 'ruc_cedula']
    const missingFields = requiredFields.filter(field => !providerData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        missing: missingFields
      }, { status: 400 })
    }

    // Validate business logic
    if (providerData.payment_methods && providerData.payment_methods.length < 2) {
      return NextResponse.json({ 
        error: 'Must select at least 2 payment methods'
      }, { status: 400 })
    }

    if (!providerData.accept_terms) {
      return NextResponse.json({ 
        error: 'Must accept terms and conditions'
      }, { status: 400 })
    }

    // Check if user already has a provider profile
    const { data: existingProvider } = await supabaseAdmin
      .from('providers')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (existingProvider) {
      return NextResponse.json({ 
        error: 'User already has a provider profile'
      }, { status: 400 })
    }

    // Create comprehensive provider profile with ALL fields
    const providerPayload = {
      // Basic Information
      user_id: user.id,
      name: providerData.name,
      email: providerData.email,
      phone: providerData.phone,
      account_type: providerData.account_type,
      ruc_cedula: providerData.ruc_cedula,
      
      // Service Information
      service_type: providerData.service_type,
      experience_years: providerData.experience_years || 0,
      description: providerData.description || '',
      
      // Pricing & Services
      pricing_model: providerData.pricing_model || 'hourly',
      hourly_rate: providerData.hourly_rate,
      minimum_visit: providerData.minimum_visit,
      free_estimate: providerData.free_estimate || false,
      quote_fee: providerData.quote_fee,
      payment_methods: providerData.payment_methods || [],
      payment_conditions: providerData.payment_conditions || 'completion',
      advance_threshold: providerData.advance_threshold,
      guarantee_period: providerData.guarantee_period || 30,
      has_insurance: providerData.has_insurance || false,
      includes_materials: providerData.includes_materials || false,
      offers_contract: providerData.offers_contract || false,
      invoice_type: providerData.invoice_type || [],
      service_list: providerData.service_list || [],
      
      // Availability & Coverage
      schedule: providerData.schedule || {},
      emergency_service: providerData.emergency_service || false,
      emergency_response_time: providerData.emergency_response_time,
      emergency_surcharge: providerData.emergency_surcharge,
      coverage_zones: providerData.coverage_zones || [],
      travel_cost: providerData.travel_cost || 'free',
      fixed_travel_cost: providerData.fixed_travel_cost,
      max_travel_distance: providerData.max_travel_distance || '15',
      
      // Verification & Gallery
      profile_image_url: providerData.profile_image_url,
      id_document_url: providerData.id_document_url,
      certification_urls: providerData.certification_urls || [],
      gallery_urls: providerData.gallery_urls || [],
      accept_terms: providerData.accept_terms,
      accept_marketing: providerData.accept_marketing || false,
      
      // System fields
      rating: 0.0, // Start with 0, no inflated ratings
      verified: false, // Must be verified by admin
      status: providerData.status || 'pending_review',
      location: providerData.coverage_zones?.join(', ') || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    console.log('Inserting provider with payload:', JSON.stringify(providerPayload, null, 2))

    // Insert provider - NO FALLBACKS, clean data only
    const { data: newProvider, error } = await supabaseAdmin
      .from('providers')
      .insert(providerPayload)
      .select()
      .single()

    if (error) {
      console.error('Provider creation error:', error)
      
      // Handle specific database errors
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ 
          error: 'Provider with this information already exists'
        }, { status: 409 })
      }
      
      if (error.code === '23503') { // Foreign key constraint violation
        return NextResponse.json({ 
          error: 'Invalid user reference - please contact support'
        }, { status: 400 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to create provider profile',
        details: error.message
      }, { status: 500 })
    }

    console.log('Provider created successfully:', newProvider.id)
    
    return NextResponse.json({
      success: true,
      provider: {
        id: newProvider.id,
        name: newProvider.name,
        service_type: newProvider.service_type,
        status: newProvider.status
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message
    }, { status: 500 })
  }
}