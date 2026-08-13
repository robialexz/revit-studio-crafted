import { z } from "zod";

/**
 * Validare server-side pentru lead-uri — sursa unică de adevăr.
 * Toate limitele sunt intenționat generoase pentru utilizatori reali,
 * dar suficient de strânse încât să oprească payload-uri abuzive.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  email: z.string().trim().email().max(160).or(z.literal("")).optional(),
  project_type: z.string().trim().max(120).optional(),
  available_files: z.array(z.string().trim().max(60)).max(20).default([]),
  approximate_sheet_count: z.string().trim().max(60).optional(),
  deadline: z.string().trim().max(120).optional(),
  description: z.string().trim().max(4000).optional(),
  page_path: z.string().trim().max(500).optional(),
  referrer: z.string().trim().max(500).optional(),
  utm_source: z.string().trim().max(200).optional(),
  utm_medium: z.string().trim().max(200).optional(),
  utm_campaign: z.string().trim().max(200).optional(),
  utm_content: z.string().trim().max(200).optional(),
  utm_term: z.string().trim().max(200).optional(),
  website: z.string().trim().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
