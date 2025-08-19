import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    hasUploadThingToken: !!process.env.UPLOADTHING_TOKEN,
    hasUploadThingSecret: !!process.env.UPLOADTHING_SECRET,
    uploadthingVars: Object.keys(process.env).filter(key => 
      key.includes('UPLOAD') || key.includes('uploadthing')
    ),
    nodeEnv: process.env.NODE_ENV,
  })
}