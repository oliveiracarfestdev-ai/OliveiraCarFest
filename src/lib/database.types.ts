export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          role: string | null
          created_at: string | null
        }
        Insert: {
          id: string
          role?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          role?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          date: string
          time: string
          location: string
          address_url: string
          description: string
          banner_url: string
          is_next_event: boolean
          donation_items: string | null
          category: string | null
          accepting_registrations: boolean
          max_exhibitors: number
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          date: string
          time: string
          location: string
          address_url: string
          description: string
          banner_url: string
          is_next_event?: boolean
          donation_items?: string | null
          category?: string | null
          accepting_registrations?: boolean
          max_exhibitors?: number
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          date?: string
          time?: string
          location?: string
          address_url?: string
          description?: string
          banner_url?: string
          is_next_event?: boolean
          donation_items?: string | null
          category?: string | null
          accepting_registrations?: boolean
          max_exhibitors?: number
          created_at?: string | null
        }
        Relationships: []
      }
      albums: {
        Row: {
          id: string
          event_id: string
          title: string
          cover_url: string
          category: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          cover_url: string
          category?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string
          title?: string
          cover_url?: string
          category?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      photos: {
        Row: {
          id: string
          album_id: string
          image_url: string
          created_at: string | null
        }
        Insert: {
          id?: string
          album_id: string
          image_url: string
          created_at?: string | null
        }
        Update: {
          id?: string
          album_id?: string
          image_url?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "photos_album_id_fkey"
            columns: ["album_id"]
            referencedRelation: "albums"
            referencedColumns: ["id"]
          }
        ]
      }
      sponsors: {
        Row: {
          id: string
          name: string
          category: string
          logo_url: string
          description: string
          website_url: string
          instagram_url: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          category: string
          logo_url: string
          description: string
          website_url: string
          instagram_url: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          category?: string
          logo_url?: string
          description?: string
          website_url?: string
          instagram_url?: string
          created_at?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          whatsapp: string
          email: string
          subject: string
          message: string
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          whatsapp?: string
          email: string
          subject?: string
          message: string
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          whatsapp?: string
          email?: string
          subject?: string
          message?: string
          created_at?: string | null
        }
        Relationships: []
      }
      sponsor_leads: {
        Row: {
          id: string
          company: string
          contact_person: string
          phone: string
          email: string
          message: string
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          company: string
          contact_person: string
          phone: string
          email: string
          message: string
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          company?: string
          contact_person?: string
          phone?: string
          email?: string
          message?: string
          status?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      exhibitor_leads: {
        Row: {
          id: string
          owner_name: string
          email: string
          phone: string
          car_model: string
          car_year: string
          modifications: string
          instagram: string
          status: string
          car_plate: string
          car_photo_url: string | null
          event_id: string | null
          donation_choice: string | null
          checked_in_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          owner_name: string
          email: string
          phone: string
          car_model: string
          car_year: string
          modifications: string
          instagram: string
          status?: string
          car_plate?: string
          car_photo_url?: string | null
          event_id?: string | null
          donation_choice?: string | null
          checked_in_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          owner_name?: string
          email?: string
          phone?: string
          car_model?: string
          car_year?: string
          modifications?: string
          instagram?: string
          status?: string
          car_plate?: string
          car_photo_url?: string | null
          event_id?: string | null
          donation_choice?: string | null
          checked_in_at?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exhibitor_leads_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      site_settings: {
        Row: {
          id: number
          exclusive_cars_count: number
          official_partners_count: number
          updated_at: string | null
        }
        Insert: {
          id?: number
          exclusive_cars_count?: number
          official_partners_count?: number
          updated_at?: string | null
        }
        Update: {
          id?: number
          exclusive_cars_count?: number
          official_partners_count?: number
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
