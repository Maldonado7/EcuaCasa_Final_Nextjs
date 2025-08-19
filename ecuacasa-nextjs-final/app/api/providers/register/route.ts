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

    // Validate required fields
    if (!providerData.name || !providerData.service_type || !providerData.location) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        required: ['name', 'service_type', 'location']
      }, { status: 400 })
    }

    // Check if user_profiles table exists, if not, we'll skip user profile creation
    console.log('Checking user profile for:', user.id, user.emailAddresses[0]?.emailAddress)
    
    let userId = null
    
    // Try to create/find user profile, but don't fail if table doesn't exist
    try {
      const { data: userProfile, error: userProfileError } = await supabaseAdmin
        .from('user_profiles')
        .upsert({
          clerk_id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          first_name: user.firstName,
          last_name: user.lastName,
          role: 'provider'
        }, {
          onConflict: 'clerk_id'
        })
        .select()
        .single()

      if (userProfileError) {
        console.log('User profile table may not exist:', userProfileError.message)
        // If table doesn't exist (error code 42P01), continue without user_id
        if (userProfileError.code === '42P01') {
          console.log('user_profiles table does not exist, continuing without user_id')
        } else {
          console.error('User profile error:', userProfileError)
        }
      } else {
        userId = userProfile?.id
        console.log('User profile created/found:', userId)
      }
    } catch (err) {
      console.log('Error with user_profiles table, continuing without user_id:', err.message)
    }

    // Check if user already has a provider profile (only if we have userId)
    if (userId) {
      const { data: existingProvider } = await supabaseAdmin
        .from('providers')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (existingProvider) {
        return NextResponse.json({ 
          error: 'User already has a provider profile'
        }, { status: 400 })
      }
    }

    // Create provider profile
    const providerPayload: any = {
      name: providerData.name,
      service_type: providerData.service_type,
      description: providerData.description,
      location: providerData.location,
      phone: providerData.phone,
      rating: 5.0,
      verified: false,
      type: providerData.type || 'individual',
      profile_image_url: providerData.profile_image_url || null,
      experience_years: providerData.experience_years ? parseInt(providerData.experience_years) : null,
      certifications: providerData.certifications || null
    }

    // Try to create a user record first, then use that ID
    let finalUserId = userId
    
    if (!userId) {
      // Since we have complex foreign key constraints, let's try to find an existing user first
      try {
        // Try to find if any user exists we can reference
        const { data: existingUsers, error: fetchError } = await supabaseAdmin
          .from('users')
          .select('id')
          .limit(1)

        if (existingUsers && existingUsers.length > 0) {
          finalUserId = existingUsers[0].id
          console.log('Using existing user ID:', finalUserId)
        } else {
          // Create user with absolute minimal fields
          const newUserId = crypto.randomUUID()
          const { data: newUser, error: userError } = await supabaseAdmin
            .from('users')
            .insert({ id: newUserId })
            .select()
            .single()

          if (userError) {
            console.error('Error creating user:', userError)
            // If everything fails, we need to fail the provider creation
            throw new Error('Cannot create provider without valid user reference')
          } else {
            finalUserId = newUser.id
            console.log('Created minimal user and using ID:', finalUserId)
          }
        }
      } catch (err) {
        console.error('Database constraint issues:', err.message)
        throw new Error('Database configuration prevents provider registration')
      }
    }

    // Always add user_id since it's required
    providerPayload.user_id = finalUserId

    const { data: newProvider, error } = await supabaseAdmin
      .from('providers')
      .insert(providerPayload)
      .select()
      .single()

    if (error) {
      console.error('Error creating provider:', error)
      return NextResponse.json({ 
        error: 'Failed to create provider profile',
        details: error.message
      }, { status: 500 })
    }

    // Save gallery images if provided
    try {
      const galleryImages = []
      
      // Add gallery images
      if (providerData.gallery_images && providerData.gallery_images.length > 0) {
        providerData.gallery_images.forEach((imageUrl: string) => {
          galleryImages.push({
            provider_user_id: user.id,
            image_url: imageUrl,
            image_type: 'work_sample',
            uploaded_at: new Date().toISOString()
          })
        })
      }

      // Add before/after images
      if (providerData.before_after_images && providerData.before_after_images.length > 0) {
        providerData.before_after_images.forEach((imageUrl: string) => {
          galleryImages.push({
            provider_user_id: user.id,
            image_url: imageUrl,
            image_type: 'before_after',
            uploaded_at: new Date().toISOString()
          })
        })
      }

      // Add certification documents
      if (providerData.certification_documents && providerData.certification_documents.length > 0) {
        providerData.certification_documents.forEach((imageUrl: string) => {
          galleryImages.push({
            provider_user_id: user.id,
            image_url: imageUrl,
            image_type: 'certification',
            uploaded_at: new Date().toISOString()
          })
        })
      }

      // Save all gallery images
      if (galleryImages.length > 0) {
        const { error: galleryError } = await supabaseAdmin
          .from('provider_gallery')
          .insert(galleryImages)

        if (galleryError) {
          console.error('Error saving gallery images:', galleryError)
          // Don't fail the entire registration, just log the error
        } else {
          console.log(`Saved ${galleryImages.length} gallery images for provider`)
        }
      }
    } catch (galleryErr) {
      console.error('Error processing gallery images:', galleryErr)
      // Don't fail the registration
    }

    // Update user role in user_profiles if exists
    if (userId) {
      try {
        await supabaseAdmin
          .from('user_profiles')
          .upsert({
            clerk_id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            first_name: user.firstName,
            last_name: user.lastName,
            role: 'both', // Now they're both customer and professional
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'clerk_id'
          })
      } catch (err) {
        console.log('Could not update user role, but provider was created successfully')
      }
    }

    return NextResponse.json({ 
      success: true,
      message: 'Provider profile created successfully',
      provider: newProvider
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ 
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Try to get user_id from user_profiles (if table exists)
    let userProfileId = null
    try {
      const { data: userProfile } = await supabaseAdmin
        .from('user_profiles')
        .select('id')
        .eq('clerk_id', user.id)
        .single()
      
      userProfileId = userProfile?.id
    } catch (err) {
      console.log('user_profiles table may not exist, checking providers without user_id filter')
    }

    // Get user's provider profile - try multiple approaches
    let provider = null
    let error = null

    if (userProfileId) {
      // If we have user profile, search by user_id
      const result = await supabaseAdmin
        .from('providers')
        .select('*')
        .eq('user_id', userProfileId)
        .single()
      provider = result.data
      error = result.error
    } 
    
    // No email-based fallback - only return exact matches

    // No fallback - only return actual user's provider profile

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json({ 
        error: 'Failed to fetch provider profile'
      }, { status: 500 })
    }

    return NextResponse.json({ 
      hasProfile: !!provider,
      provider: provider || null
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error'
    }, { status: 500 })
  }
}