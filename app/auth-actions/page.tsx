import { AuthForm } from "@/components/AuthForm";
import { getUserSession } from "@/supabase/auth/auth-actions";
import getSupabaseServerClient from "@/supabase/client";
import { redirect } from "next/navigation";

export default async function Home() {
  const { data } = await getUserSession();

  if (data?.session) {
    return redirect("/dashboard");
  }

  return (
    <main className=" max-w-[30%] mx-auto my-8">
      <AuthForm />
    </main>
  );
}
