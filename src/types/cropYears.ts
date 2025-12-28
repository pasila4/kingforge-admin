import { z } from "zod";

export const SeasonCodeSchema = z.enum(["KHARIF", "RABI"]);
export type SeasonCode = z.infer<typeof SeasonCodeSchema>;

export const SeasonStatusSchema = z.enum(["NOT_STARTED", "ACTIVE", "ENDED"]);
export type SeasonStatus = z.infer<typeof SeasonStatusSchema>;

export const CropYearStatusSchema = z.enum(["NOT_STARTED", "ACTIVE", "ENDED"]);
export type CropYearStatus = z.infer<typeof CropYearStatusSchema>;

export const SeasonSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  status: z.string().optional(),
  startedAt: z.string().nullable().optional(),
  endedAt: z.string().nullable().optional(),
});

export type Season = z.infer<typeof SeasonSchema>;

export const CropYearSchema = z.object({
  id: z.string(),
  label: z.string(),
  startYear: z.number().int(),
  status: z.string().optional(),
  seasons: z.array(SeasonSchema),
});

export type CropYear = z.infer<typeof CropYearSchema>;

export const CropYearListResponseSchema = z.object({
  success: z.boolean(),
  data: z.object({
    items: z.array(CropYearSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
  message: z.string().optional(),
});

export const CropYearResponseSchema = z.object({
  success: z.boolean(),
  data: CropYearSchema,
  message: z.string().optional(),
});

export const CreateCropYearRequestSchema = z.object({
  startYear: z.number().int().min(2000, "Enter a valid year.").max(3000, "Enter a valid year."),
});

export type CreateCropYearRequest = z.infer<typeof CreateCropYearRequestSchema>;
