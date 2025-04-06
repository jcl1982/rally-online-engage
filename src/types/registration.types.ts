
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  license_number?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  registration_number: string;
}

export interface Registration {
  id: string;
  status: "pending" | "approved" | "rejected";
  rally_id: string;
  driver: Profile;
  co_driver?: Profile;
  vehicle?: Vehicle;
}

// Utility type for handling Supabase query responses where relations may have errors
export type SafeRegistration = {
  id: string;
  status: "pending" | "approved" | "rejected";
  rally_id: string;
  driver: Profile | any;
  co_driver?: Profile | any;
  vehicle?: Vehicle | any;
}
