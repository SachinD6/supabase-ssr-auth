import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthForm } from "@/components/AuthForm";
import { getUserSession } from "@/supabase/auth/auth-actions";
import Link from "next/link";

export default async function Home() {
  const { data } = await getUserSession();
  return (
    <main className=" max-w-[30%] mx-auto my-8 flex items-center justify-center">
      <Link
        href="/auth-actions"
        className={buttonVariants({ variant: "default", size: "lg" })}
      >
        GO TO LOGIN
      </Link>
      <p>{data?.session?.user.email}</p>
    </main>
  );
}
