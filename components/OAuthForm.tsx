"use client";

import SupabaseBrowserClient from "@/supabase/browser-client";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function OAuthForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = SupabaseBrowserClient();

  const loginWithGithub = async () => {
    setIsSubmitting(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
    setIsSubmitting(false);

    if (error) {
      console.error(error);
    }
  };
  return (
    <Button
      className="w-full space-4"
      onClick={loginWithGithub}
      disabled={isSubmitting}
    >
      <Github className="mr-4" />
      Login With Github{" "}
      {isSubmitting ? <Loader2 className={cn("animate-spin ml-4")} /> : null}
    </Button>
  );
}
