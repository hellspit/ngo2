import { api } from './api';

// Update Member interface to match backend schema
export interface Member {
  id: number;
  name: string;
  position: string;
  age: number;
  photo: string | null;
  bio: string | null;
}

export interface MemberCreate {
  name: string;
  position: string;
  age: number;
  photo?: string | null;
  bio?: string | null;
}

export interface MemberUpdate {
  name?: string;
  position?: string;
  age?: number;
  photo?: string | null;
  bio?: string | null;
}

export const membersService = {
  // Get all members
  getAllMembers: () => {
    return api.get('/api/members');
  },
  
  // Get a single member by ID
  getMember: (id: number) => {
    return api.get(`/api/members/${id}`);
  },
  
  // Create a new member (requires authentication)
  createMember: (memberData: MemberCreate) => {
    return api.post('/api/members', memberData);
  },
  
  // Update a member (requires authentication)
  updateMember: (id: number, memberData: MemberUpdate) => {
    return api.put(`/api/members/${id}`, memberData);
  },
  
  // Delete a member (requires authentication)
  deleteMember: (id: number) => {
    return api.delete(`/api/members/${id}`);
  },

  // Add this method for creating members with image upload
  createMemberWithImage: async (name: string, position: string, age: number, bio: string, imageFile: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('age', age.toString());
    
    if (bio) {
      formData.append('bio', bio);
    }
    
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    return api.post('/api/members/with-image', formData, {
      headers: {
        // Let the browser set the Content-Type with boundary
        'Content-Type': undefined,
      },
    });
  }
}; 