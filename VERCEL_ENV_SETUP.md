# Vercel Deployment - Environment Variables Setup

## Go to Vercel Dashboard
1. Open your project: https://vercel.com/dashboard
2. Click on your project "kirakitu_cyote"
3. Go to **Settings** → **Environment Variables**

## Add These Variables:

### Database (Supabase)
```
DATABASE_URL
postgresql://postgres.fntzxkpqcesbbjbldnpa:Kirakitukid2026@aws-1-eu-north-1.pooler.supabase.com:6543/postgres?pgbouncer=true

DIRECT_URL
postgresql://postgres.fntzxkpqcesbbjbldnpa:Kirakitukid2026@aws-1-eu-north-1.pooler.supabase.com:5432/postgres
```

### Cloudinary
```
CLOUDINARY_URL
cloudinary://645981851895124:_l78X0Vx3uuCiMhcXDPu9nRXdGY@dqw3sgnxx

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
dqw3sgnxx

NEXT_PUBLIC_CLOUDINARY_API_KEY
645981851895124

CLOUDINARY_API_SECRET
_l78X0Vx3uuCiMhcXDPu9nRXdGY

CLOUDINARY_FOLDER
kirakitu
```

## After Adding Variables:
1. Click **Save**
2. Go to **Deployments** tab
3. Click **Redeploy** on latest deployment
4. Select "Use existing Build Cache" → **Redeploy**

## Verify:
- Visit your site
- Check if products load
- Test admin dashboard
- Test image upload

The 500 errors will be fixed once environment variables are added.
