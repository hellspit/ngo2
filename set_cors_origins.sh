#!/bin/bash

# This is a reference script showing how to update environment variables on Render via API
# You would need to set these variables with the actual values from your Render account
# RENDER_API_KEY="your_render_api_key"
# SERVICE_ID="your_service_id_from_render"
# VERCEL_URL="your-app-name.vercel.app"

echo "MANUAL STEPS TO SET CORS ON RENDER:"
echo "------------------------------------"
echo "1. Log in to your Render dashboard at https://dashboard.render.com"
echo "2. Select your backend service 'dandn-ngo-backend'"
echo "3. Click on Environment in the left sidebar"
echo "4. Add a new environment variable with:"
echo "   - Key: ALLOWED_ORIGINS"
echo "   - Value: https://dandn-ngo.vercel.app,https://www.dandn-ngo.vercel.app"
echo "   (Include any additional domains or subdomains you plan to use, separated by commas)"
echo "5. Click 'Save and Deploy' to apply the changes"
echo ""
echo "The CORS configuration in your code is already correctly set up to read this variable."
echo "After this change, your Vercel frontend should be able to communicate with your Render backend." 