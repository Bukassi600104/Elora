import { User, UserRole, Estate } from './types';

// Helper for date formatting
export const formatDate = (timestamp: number) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
};

export const GUEST_EXPIRY_MS = 6 * 60 * 60 * 1000; // 6 Hours
export const DOMESTIC_EXPIRY_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 Months

// Initial Mock Data
export const MOCK_ESTATES: Estate[] = [
  { id: 'est-1', name: 'Royal Palms Estate', address: '12 Palm Ave, Beverly Hills', adminId: 'u-2' }
];

export const MOCK_USERS: User[] = [
  { id: 'u-1', name: 'Super Admin', email: 'super@basic.com', role: UserRole.SUPER_ADMIN },
  { id: 'u-2', name: 'Estate Manager', email: 'admin@royalpalms.com', role: UserRole.ESTATE_ADMIN, estateId: 'est-1' },
  { 
    id: 'u-3', 
    name: 'John Doe', 
    email: 'john@royalpalms.com', 
    role: UserRole.RESIDENT, 
    estateId: 'est-1', 
    houseNumber: 'A-101',
    authorizedPhones: [
      { id: 'ph-1', number: '+15550001', name: 'Wife', status: 'APPROVED' }
    ]
  },
  { id: 'u-4', name: 'Gate Guard 1', email: 'guard@royalpalms.com', role: UserRole.GUARD, estateId: 'est-1' },
];