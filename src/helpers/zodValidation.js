import { z } from "zod";

export const signupShcema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters long'),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(5, 'Password must be at least 6 characters long')
})

export const signinShcema = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(5, 'Password must be at least 6 characters long')
})

export const urlSchema = z.object({
    link: z
        .string()
        .trim()
        .url("Please enter a valid URL")
});