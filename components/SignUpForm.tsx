// "use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TsignUpSchema, signUpSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { signUpWithEmailAndPassword } from "@/supabase/auth/auth-actions";

export function SignUpForm() {
  const { toast } = useToast();
  const form = useForm<TsignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: TsignUpSchema) {
    const result = await signUpWithEmailAndPassword(values);
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        variant: "destructive",
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{error.message}</code>
          </pre>
        ),
      });
    } else {
      toast({
        title: "User registered successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values.email, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...form.register("password")} />
          </FormControl>
          <FormMessage>{form.formState.errors.password?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" {...form.register("confirmPassword")} />
          </FormControl>
          <FormMessage>
            {form.formState.errors.confirmPassword?.message}
          </FormMessage>
        </FormItem>

        <Button
          type="submit"
          className="w-full flex gap-2 my-4"
          disabled={isSubmitting}
        >
          Register
          {isSubmitting ? <Loader2 className={cn("animate-spin")} /> : null}
        </Button>
      </form>
    </Form>
  );
}
