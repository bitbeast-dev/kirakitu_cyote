# Cloudinary Integration Setup

## Configuration Complete ✅
- Environment variables added to `.env.local`
- Cloudinary utility created at `src/lib/cloudinary.ts`
- Upload API route created (needs manual folder setup)
- Admin dashboard updated with file upload

## 1. Install Cloudinary SDK
```powershell
npm install cloudinary
```

## 2. Create API Route Directory
Manually create folder: `src/app/api/upload/`

Then move: `src/app/api-upload-route.ts` → `src/app/api/upload/route.ts`

## 3. How It Works

### Admin Dashboard
1. Click "Add Product"
2. Select image file from computer
3. Fill product details
4. Click "Add" - image uploads to Cloudinary automatically
5. Product saved with Cloudinary URL

### Image Upload Flow
```
User selects file → Admin form → /api/upload → Cloudinary → Returns URL → Saves to product
```

### Cloudinary Configuration
- **Cloud Name**: dqw3sgnxx
- **Folder**: kirakitu
- **API Key**: 645981851895124
- All images stored in `kirakitu` folder on Cloudinary

## 4. API Endpoint

### POST /api/upload
Upload image to Cloudinary
```javascript
const formData = new FormData()
formData.append('file', imageFile)

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const { url, publicId } = await response.json()
```

## 5. Image URLs
All product images will use Cloudinary URLs:
```
https://res.cloudinary.com/dqw3sgnxx/image/upload/v1234567890/kirakitu/product.jpg
```

## 6. Benefits
- ✅ Automatic image optimization
- ✅ CDN delivery (fast loading)
- ✅ Automatic format conversion (WebP, AVIF)
- ✅ Responsive images
- ✅ No server storage needed

## Files Created
- ✅ `.env.local` - Cloudinary credentials
- ✅ `src/lib/cloudinary.ts` - Upload utility
- ✅ `src/app/api-upload-route.ts` - Upload API (needs folder)
- ✅ `src/app/admin/page.tsx` - Updated with file upload
