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
      app_usage: {
        Row: {
          duration: number | null
          timestamp: string | null
          usage_id: number
          user_id: string | null
        }
        Insert: {
          duration?: number | null
          timestamp?: string | null
          usage_id?: number
          user_id?: string | null
        }
        Update: {
          duration?: number | null
          timestamp?: string | null
          usage_id?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_usage_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      garden_snapshots: {
        Row: {
          garden_id: number | null
          id: number
          snapshot: string | null
          snapshot_data: string | null
        }
        Insert: {
          garden_id?: number | null
          id?: number
          snapshot?: string | null
          snapshot_data?: string | null
        }
        Update: {
          garden_id?: number | null
          id?: number
          snapshot?: string | null
          snapshot_data?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "garden_snapshots_garden_id_fkey"
            columns: ["garden_id"]
            isOneToOne: false
            referencedRelation: "gardens"
            referencedColumns: ["id"]
          },
        ]
      }
      gardens: {
        Row: {
          garden_data: Json | null
          id: number
          last_update: string | null
          level: number | null
          user_id: string | null
        }
        Insert: {
          garden_data?: Json | null
          id?: number
          last_update?: string | null
          level?: number | null
          user_id?: string | null
        }
        Update: {
          garden_data?: Json | null
          id?: number
          last_update?: string | null
          level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gardens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "gardens_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mental_health: {
        Row: {
          journal_entry: Json | null
          meditation_time: number | null
          mood: string | null
          record_id: number
          recorded_at: string | null
          stress_level: number | null
          user_id: string | null
        }
        Insert: {
          journal_entry?: Json | null
          meditation_time?: number | null
          mood?: string | null
          record_id?: number
          recorded_at?: string | null
          stress_level?: number | null
          user_id?: string | null
        }
        Update: {
          journal_entry?: Json | null
          meditation_time?: number | null
          mood?: string | null
          record_id?: number
          recorded_at?: string | null
          stress_level?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mental_health_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      physical_health: {
        Row: {
          blood_pressure: string | null
          calories: number | null
          heart_rate: number | null
          height: number | null
          record_id: number
          recorded_at: string | null
          sleep_duration: number | null
          steps: number | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          blood_pressure?: string | null
          calories?: number | null
          heart_rate?: number | null
          height?: number | null
          record_id?: number
          recorded_at?: string | null
          sleep_duration?: number | null
          steps?: number | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          blood_pressure?: string | null
          calories?: number | null
          heart_rate?: number | null
          height?: number | null
          record_id?: number
          recorded_at?: string | null
          sleep_duration?: number | null
          steps?: number | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "physical_health_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      users: {
        Row: {
          age: number | null
          created_at: string | null
          gender: string | null
          name: string
          user_id: string
        }
        Insert: {
          age?: number | null
          created_at?: string | null
          gender?: string | null
          name: string
          user_id: string
        }
        Update: {
          age?: number | null
          created_at?: string | null
          gender?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
