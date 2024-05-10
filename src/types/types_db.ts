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
      categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
          template_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      category_image_paths: {
        Row: {
          category_id: number | null
          created_at: string
          id: number
          image_path: number | null
          updated_at: string | null
        }
        Insert: {
          category_id?: number | null
          created_at?: string
          id?: number
          image_path?: number | null
          updated_at?: string | null
        }
        Update: {
          category_id?: number | null
          created_at?: string
          id?: number
          image_path?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_image_paths_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      my_avatar_options: {
        Row: {
          accessory: string | null
          background: string | null
          base: string | null
          color: string | null
          created_at: string
          eyes: string | null
          hair: string | null
          hand: string | null
          id: number
          mouth: string | null
          my_avatar_id: number | null
          shirt: string | null
          updated_at: string | null
        }
        Insert: {
          accessory?: string | null
          background?: string | null
          base?: string | null
          color?: string | null
          created_at?: string
          eyes?: string | null
          hair?: string | null
          hand?: string | null
          id?: number
          mouth?: string | null
          my_avatar_id?: number | null
          shirt?: string | null
          updated_at?: string | null
        }
        Update: {
          accessory?: string | null
          background?: string | null
          base?: string | null
          color?: string | null
          created_at?: string
          eyes?: string | null
          hair?: string | null
          hand?: string | null
          id?: number
          mouth?: string | null
          my_avatar_id?: number | null
          shirt?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "my_avatar_options_my_avatar_id_fkey"
            columns: ["my_avatar_id"]
            isOneToOne: false
            referencedRelation: "my_avatars"
            referencedColumns: ["id"]
          },
        ]
      }
      my_avatars: {
        Row: {
          created_at: string
          id: number
          image_path: string | null
          name: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      template_options: {
        Row: {
          accessory: string | null
          background: string | null
          base: string | null
          color: string | null
          created_at: string
          eyes: string | null
          hair: string | null
          hand: string | null
          id: number
          mouth: string | null
          shirt: string | null
          template_id: number | null
          updated_at: string | null
        }
        Insert: {
          accessory?: string | null
          background?: string | null
          base?: string | null
          color?: string | null
          created_at?: string
          eyes?: string | null
          hair?: string | null
          hand?: string | null
          id?: number
          mouth?: string | null
          shirt?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Update: {
          accessory?: string | null
          background?: string | null
          base?: string | null
          color?: string | null
          created_at?: string
          eyes?: string | null
          hair?: string | null
          hand?: string | null
          id?: number
          mouth?: string | null
          shirt?: string | null
          template_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "options_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      templates: {
        Row: {
          created_at: string
          id: number
          image_path: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          image_path?: string | null
          name?: string | null
          updated_at?: string | null
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
