export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          blood_type: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          license_category: string | null
          license_number: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          blood_type?: string | null
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name: string
          license_category?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          blood_type?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          license_category?: string | null
          license_number?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      rallies: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          id: string
          location: string
          name: string
          registration_deadline: string | null
          registration_open: boolean
          start_date: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          id?: string
          location: string
          name: string
          registration_deadline?: string | null
          registration_open?: boolean
          start_date: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          id?: string
          location?: string
          name?: string
          registration_deadline?: string | null
          registration_open?: boolean
          start_date?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      rally_stages: {
        Row: {
          created_at: string
          description: string | null
          distance: number
          finish_latitude: number | null
          finish_longitude: number | null
          id: string
          location: string
          map_zoom_level: number | null
          name: string
          rally_id: string
          start_latitude: number | null
          start_longitude: number | null
          start_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          distance: number
          finish_latitude?: number | null
          finish_longitude?: number | null
          id?: string
          location: string
          map_zoom_level?: number | null
          name: string
          rally_id: string
          start_latitude?: number | null
          start_longitude?: number | null
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          distance?: number
          finish_latitude?: number | null
          finish_longitude?: number | null
          id?: string
          location?: string
          map_zoom_level?: number | null
          name?: string
          rally_id?: string
          start_latitude?: number | null
          start_longitude?: number | null
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rally_stages_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "rallies"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          co_driver_id: string | null
          created_at: string
          driver_id: string
          id: string
          rally_id: string
          status: string
          updated_at: string
          vehicle_id: string | null
        }
        Insert: {
          co_driver_id?: string | null
          created_at?: string
          driver_id: string
          id?: string
          rally_id: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Update: {
          co_driver_id?: string | null
          created_at?: string
          driver_id?: string
          id?: string
          rally_id?: string
          status?: string
          updated_at?: string
          vehicle_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "rallies"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_equipment: {
        Row: {
          belts_brand: string
          belts_expiration_date: string
          co_driver_helmet_brand: string
          co_driver_helmet_expiration_date: string
          co_driver_helmet_model: string
          co_driver_suit_brand: string
          co_driver_suit_expiration_date: string
          created_at: string
          driver_helmet_brand: string
          driver_helmet_expiration_date: string
          driver_helmet_model: string
          driver_suit_brand: string
          driver_suit_expiration_date: string
          has_extinguisher: boolean
          has_fia_hans: boolean
          has_first_aid_kit: boolean
          has_tow_rope: boolean
          has_warning_triangle: boolean
          id: string
          registration_id: string
          seats_brand: string
          seats_expiration_date: string
          updated_at: string
        }
        Insert: {
          belts_brand: string
          belts_expiration_date: string
          co_driver_helmet_brand: string
          co_driver_helmet_expiration_date: string
          co_driver_helmet_model: string
          co_driver_suit_brand: string
          co_driver_suit_expiration_date: string
          created_at?: string
          driver_helmet_brand: string
          driver_helmet_expiration_date: string
          driver_helmet_model: string
          driver_suit_brand: string
          driver_suit_expiration_date: string
          has_extinguisher?: boolean
          has_fia_hans?: boolean
          has_first_aid_kit?: boolean
          has_tow_rope?: boolean
          has_warning_triangle?: boolean
          id?: string
          registration_id: string
          seats_brand: string
          seats_expiration_date: string
          updated_at?: string
        }
        Update: {
          belts_brand?: string
          belts_expiration_date?: string
          co_driver_helmet_brand?: string
          co_driver_helmet_expiration_date?: string
          co_driver_helmet_model?: string
          co_driver_suit_brand?: string
          co_driver_suit_expiration_date?: string
          created_at?: string
          driver_helmet_brand?: string
          driver_helmet_expiration_date?: string
          driver_helmet_model?: string
          driver_suit_brand?: string
          driver_suit_expiration_date?: string
          has_extinguisher?: boolean
          has_fia_hans?: boolean
          has_first_aid_kit?: boolean
          has_tow_rope?: boolean
          has_warning_triangle?: boolean
          id?: string
          registration_id?: string
          seats_brand?: string
          seats_expiration_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "safety_equipment_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      timing_points: {
        Row: {
          created_at: string
          description: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          order_index: number
          point_type: string
          stage_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          order_index: number
          point_type: string
          stage_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          order_index?: number
          point_type?: string
          stage_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "timing_points_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "rally_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          category: string
          chassis_number: string
          class: string
          created_at: string
          engine_capacity: string
          engine_number: string
          group_class: string
          homologation_number: string
          id: string
          make: string
          model: string
          owner_id: string
          registration_number: string
          technical_passport_number: string
          updated_at: string
          year: string
        }
        Insert: {
          category: string
          chassis_number: string
          class: string
          created_at?: string
          engine_capacity: string
          engine_number: string
          group_class: string
          homologation_number: string
          id?: string
          make: string
          model: string
          owner_id: string
          registration_number: string
          technical_passport_number: string
          updated_at?: string
          year: string
        }
        Update: {
          category?: string
          chassis_number?: string
          class?: string
          created_at?: string
          engine_capacity?: string
          engine_number?: string
          group_class?: string
          homologation_number?: string
          id?: string
          make?: string
          model?: string
          owner_id?: string
          registration_number?: string
          technical_passport_number?: string
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_timing_point: {
        Args: {
          p_stage_id: string
          p_name: string
          p_description: string
          p_latitude: number
          p_longitude: number
          p_point_type: string
          p_order_index: number
        }
        Returns: string
      }
      delete_timing_point: {
        Args: {
          p_id: string
        }
        Returns: boolean
      }
      get_timing_points: {
        Args: {
          stage_id_param: string
        }
        Returns: {
          created_at: string
          description: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          order_index: number
          point_type: string
          stage_id: string
          updated_at: string
        }[]
      }
      update_timing_point: {
        Args: {
          p_id: string
          p_name: string
          p_description: string
          p_latitude: number
          p_longitude: number
          p_point_type: string
          p_order_index: number
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
