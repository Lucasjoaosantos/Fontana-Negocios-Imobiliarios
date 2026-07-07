import { createBrowserClient } from "@supabase/ssr";

// Cliente Supabase para uso em Client Components (formulários, upload de
// fotos, filtros interativos, etc).
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
