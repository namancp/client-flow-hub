
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

// Type for the Supabase database schema
export type Database = {
  public: {
    Tables: {
      users: {
        Row: UserData;
        Insert: UserData;
        Update: Partial<UserData>;
      };
      bookings: {
        Row: BookingData;
        Insert: BookingData;
        Update: Partial<BookingData>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
