# Vercel Environment Variables Setup

To deploy this project to Vercel, you need to add the following environment variables in your Vercel project settings:

## Required Environment Variables

### API Configuration
- `NEXT_PUBLIC_API_URL` - Your API URL (e.g., http://localhost:8000 for development)

### Razorpay Configuration
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Razorpay public key ID
- `RAZORPAY_KEY_SECRET` - Your Razorpay secret key

### Supabase Configuration
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

## How to Add Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add each variable with the appropriate value
5. Make sure to set the environment (Production, Preview, Development)

## Notes
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Variables without `NEXT_PUBLIC_` are only available on the server
- Make sure to redeploy after adding environment variables 