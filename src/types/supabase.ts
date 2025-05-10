
// Define types for the tables used in the application
export interface UserData {
  id: string;
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  role?: 'customer' | 'advisor';
  avatar_url?: string | null;
  location?: string | null;
  linkedin_url?: string | null;
  bio?: string | null;
  theme_preference?: string | null;
  created_at?: string;
}

export interface BookingData {
  id?: string;
  user_id: string;
  advisor_id: string;
  session_time: string;
  session_length: number;
  status?: string;
  notes?: string | null;
  created_at?: string;
}
