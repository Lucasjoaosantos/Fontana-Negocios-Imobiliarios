"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function BotaoSair() {
  const router = useRouter();

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={sair}
      className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
