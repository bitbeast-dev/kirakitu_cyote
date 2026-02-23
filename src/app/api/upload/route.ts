import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const result = await uploadToCloudinary(file) as any
    
    return NextResponse.json({ 
      url: result.secure_url,
      publicId: result.public_id 
    })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
