// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Helper function for API calls
export async function fetchAPI(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Helper function to get full image URL with better path handling
export function getImageUrl(path: string): string {
  if (!path) return '/owner.png'; // Default image
  
  // If it's already a full URL, return it as is
  if (path.startsWith('http')) return path;
  
  // Make sure path doesn't start with a slash if we're going to add /static/
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // If the path already includes 'static/', don't add it again
  if (cleanPath.startsWith('static/')) {
    return `${API_URL}/${cleanPath}`;
  }
  
  // Regular case - add /static/ prefix
  return `${API_URL}/static/${cleanPath}`;
} 