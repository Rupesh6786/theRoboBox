"use server";

import { z } from "zod";

const formSchema = z.object({
  schoolName: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, "Contact name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().max(500, "Message cannot exceed 500 characters.").optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export async function handleSubmitAction(data: FormValues) {
  // In a real app, you'd process the data here (e.g., save to DB, send email)
  console.log("School Registration Submitted:", data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, schoolName: data.schoolName };
}