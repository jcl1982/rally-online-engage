
export interface StageItem {
  id: string;
  name: string;
  distance: string;
  description?: string;
  location: string;
  rally_id?: string;
  created_at?: string;
}

export interface StageFormData {
  name: string;
  distance: string;
  description?: string;
  location: string;
}
