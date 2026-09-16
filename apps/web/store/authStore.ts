import { create } from 'zustand';
import { User, UserRole } from '@school-erp/types';
import { DEMO_USERS } from '@school-erp/constants';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'USR-ADMIN',
    name: 'Dr. Rajesh Sharma',
    email: 'admin@stxavier.edu',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    role: 'SCHOOL_ADMIN',
    schoolId: 'SCH-001',
    schoolName: 'St. Xavier International School'
  },
  isAuthenticated: true,
  selectedRole: 'SCHOOL_ADMIN',

  loginAsRole: (role: UserRole) => {
    const demo = DEMO_USERS.find(u => u.role === role) || DEMO_USERS[1];
    set({
      selectedRole: role,
      isAuthenticated: true,
      user: {
        id: `USR-${role}`,
        name: demo.name,
        email: demo.email,
        avatar: demo.avatar,
        role: role,
        schoolId: 'SCH-001',
        schoolName: 'St. Xavier International School'
      }
    });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
