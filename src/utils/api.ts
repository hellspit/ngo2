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

// Helper function to get full image URL
export function getImageUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${API_URL}/static/${path}`;
} 