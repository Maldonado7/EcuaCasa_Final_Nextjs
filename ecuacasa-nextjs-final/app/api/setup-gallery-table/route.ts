import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST() {
  try {
    console.log('🏗️ Creating provider_gallery table...')
    
    // Create provider_gallery table
    const { data: galleryResult, error: galleryError } = await supabase.rpc('execute_sql', {
      sql_query: `
        CREATE TABLE IF NOT EXISTS provider_gallery (
          id SERIAL PRIMARY KEY,
          provider_user_id TEXT NOT NULL,
          image_url TEXT NOT NULL,
          image_type TEXT NOT NULL CHECK (image_type IN ('profile', 'work_sample', 'before_after', 'certification')),
          description TEXT,
          uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Create index for faster queries
        CREATE INDEX IF NOT EXISTS idx_provider_gallery_user_id ON provider_gallery(provider_user_id);
        CREATE INDEX IF NOT EXISTS idx_provider_gallery_type ON provider_gallery(image_type);
        
        -- Add profile_image_url column to providers table if it doesn't exist
        DO $$ 
        BEGIN 
          BEGIN
            ALTER TABLE providers ADD COLUMN profile_image_url TEXT;
          EXCEPTION
            WHEN duplicate_column THEN 
              -- Column already exists, do nothing
              NULL;
          END;
        END $$;
      `
    })

    if (galleryError) {
      console.error('Error creating gallery table:', galleryError)
      return NextResponse.json({ 
        error: 'Failed to create gallery table',
        details: galleryError 
      }, { status: 500 })
    }

    console.log('✅ Provider gallery table created successfully')

    // Insert some sample gallery data
    const sampleGalleryData = [
      {
        provider_user_id: 'user_sample_1',
        image_url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500',
        image_type: 'work_sample',
        description: 'Instalación de tubería en cocina moderna'
      },
      {
        provider_user_id: 'user_sample_1',
        image_url: 'https://images.unsplash.com/photo-1585652757141-8e3e0c4ee15d?w=500',
        image_type: 'before_after',
        description: 'Antes: Cocina antigua'
      },
      {
        provider_user_id: 'user_sample_2',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
        image_type: 'work_sample',
        description: 'Trabajo de carpintería personalizada'
      }
    ]

    const { error: insertError } = await supabase
      .from('provider_gallery')
      .insert(sampleGalleryData)

    if (insertError) {
      console.log('Note: Sample data insertion failed (table may already have data):', insertError.message)
    } else {
      console.log('✅ Sample gallery data inserted')
    }

    return NextResponse.json({ 
      success: true,
      message: 'Provider gallery table created and configured successfully',
      galleryResult
    })
  } catch (error) {
    console.error('Error in setup-gallery-table:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error 
    }, { status: 500 })
  }
}