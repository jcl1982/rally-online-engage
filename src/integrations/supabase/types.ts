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
      organizer_spaces: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          organizer_id: string | null
          space_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          organizer_id?: string | null
          space_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          organizer_id?: string | null
          space_name?: string
        }
        Relationships: []
      }
      organizers: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      participant_spaces: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          participant_id: number
          space_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: never
          participant_id: number
          space_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: never
          participant_id?: number
          space_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "participant_spaces_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
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
          is_upcoming: boolean
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
          is_upcoming?: boolean
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
          is_upcoming?: boolean
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
          difficulty_level: string
          distance: number
          finish_latitude: number | null
          finish_longitude: number | null
          id: string
          location: string
          map_zoom_level: number | null
          max_participants: number
          name: string
          rally_id: string
          route_type: string
          stage_order: number | null
          start_latitude: number | null
          start_longitude: number | null
          start_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          distance: number
          finish_latitude?: number | null
          finish_longitude?: number | null
          id?: string
          location: string
          map_zoom_level?: number | null
          max_participants?: number
          name: string
          rally_id: string
          route_type?: string
          stage_order?: number | null
          start_latitude?: number | null
          start_longitude?: number | null
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty_level?: string
          distance?: number
          finish_latitude?: number | null
          finish_longitude?: number | null
          id?: string
          location?: string
          map_zoom_level?: number | null
          max_participants?: number
          name?: string
          rally_id?: string
          route_type?: string
          stage_order?: number | null
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
          {
            foreignKeyName: "rally_stages_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "upcoming_rallies"
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
          {
            foreignKeyName: "registrations_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "upcoming_rallies"
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
      stage_organizer_notes: {
        Row: {
          created_at: string
          id: string
          note: string
          stage_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          note: string
          stage_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string
          stage_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_organizer_notes_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "rally_stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "stage_organizer_notes_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "rally_stages_complete"
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
          {
            foreignKeyName: "timing_points_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "rally_stages_complete"
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
      rally_stages_complete: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          distance: number | null
          finish_latitude: number | null
          finish_longitude: number | null
          id: string | null
          location: string | null
          map_zoom_level: number | null
          max_participants: number | null
          name: string | null
          rally_id: string | null
          rally_name: string | null
          rally_status: string | null
          route_type: string | null
          stage_order: number | null
          start_latitude: number | null
          start_longitude: number | null
          start_time: string | null
          status: string | null
          timing_points_count: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rally_stages_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "rallies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rally_stages_rally_id_fkey"
            columns: ["rally_id"]
            isOneToOne: false
            referencedRelation: "upcoming_rallies"
            referencedColumns: ["id"]
          },
        ]
      }
      upcoming_rallies: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string | null
          is_upcoming: boolean | null
          location: string | null
          name: string | null
          registration_deadline: string | null
          registration_open: boolean | null
          start_date: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string | null
          is_upcoming?: boolean | null
          location?: string | null
          name?: string | null
          registration_deadline?: string | null
          registration_open?: boolean | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string | null
          is_upcoming?: boolean | null
          location?: string | null
          name?: string | null
          registration_deadline?: string | null
          registration_open?: boolean | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
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
        Args: { p_id: string }
        Returns: boolean
      }
      get_rally_stages: {
        Args: Record<PropertyKey, never> | { rally_id_param: string }
        Returns: {
          stage_id: number
          stage_name: string
        }[]
      }
      get_timing_points: {
        Args: Record<PropertyKey, never> | { stage_id_param: string }
        Returns: undefined
      }
      get_user_profile: {
        Args: { user_id: string }
        Returns: Json
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
