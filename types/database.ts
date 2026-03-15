export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          full_name: string;
          tier: "standard" | "premium";
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          full_name: string;
          tier?: "standard" | "premium";
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          full_name?: string;
          tier?: "standard" | "premium";
        };
      };
      accounts: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string;
          account_type: "savings" | "checking";
          account_number: string;
          balance: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id: string;
          account_type: "savings" | "checking";
          account_number?: string;
          balance?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          account_type?: "savings" | "checking";
          account_number?: string;
          balance?: number;
        };
      };
      transactions: {
        Row: {
          id: string;
          created_at: string;
          account_id: string;
          transaction_type: "incoming" | "outgoing";
          title: string;
          amount: number;
          status: "completed" | "pending";
          method: "zelle" | "cashapp" | "wire" | "deposit" | "transfer" | null;
          recipient: string | null;
          memo: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          account_id: string;
          transaction_type: "incoming" | "outgoing";
          title: string;
          amount: number;
          status?: "completed" | "pending";
          method?: "zelle" | "cashapp" | "wire" | "deposit" | "transfer" | null;
          recipient?: string | null;
          memo?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          account_id?: string;
          transaction_type?: "incoming" | "outgoing";
          title?: string;
          amount?: number;
          status?: "completed" | "pending";
          method?: "zelle" | "cashapp" | "wire" | "deposit" | "transfer" | null;
          recipient?: string | null;
          memo?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      process_transfer: {
        Args: {
          p_account_id: string;
          p_amount: number;
          p_title: string;
          p_method: "zelle" | "cashapp" | "wire";
          p_recipient: string;
          p_memo?: string | null;
        };
        Returns: {
          success: boolean;
          error?: string;
          transaction_id?: string;
          new_balance?: number;
        };
      };
    };
    Enums: {
      account_type: "savings" | "checking";
      transaction_type: "incoming" | "outgoing";
      transaction_status: "completed" | "pending";
      transfer_method: "zelle" | "cashapp" | "wire" | "deposit" | "transfer";
      user_tier: "standard" | "premium";
    };
  };
};

// Helper types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"];
export type TransferResult = Database["public"]["Functions"]["process_transfer"]["Returns"];