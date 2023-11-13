"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import OAuthForm from "./OAuthForm";
import { Separator } from "@radix-ui/react-separator";

export function AuthForm() {
  return (
    <div className="w-full space-y-5">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">SignIn</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
        <TabsContent value="register">
          <SignUpForm />
        </TabsContent>
      </Tabs>
      <Separator />
      <h4 className="text-sm font-medium leading-none">Or login with</h4>

      <OAuthForm />
    </div>
  );
}
