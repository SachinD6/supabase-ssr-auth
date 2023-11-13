import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  
export const signInSchema = z.object( {
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type TsignUpSchema = z.infer<typeof signUpSchema>
export type TsignInSchema = z.infer<typeof signInSchema>
