import { apiFetch } from "./api";
import {
  ListSeasonBagRatesResponseSchema,
} from "../types/seasonBagRates";
import type {
  SeasonCode,
  UpsertSeasonBagRatesRequest,
} from "../types/seasonBagRates";

export async function listSeasonBagRates(params: {
  cropYearStartYear: number;
  seasonCode: SeasonCode;
}) {
  const searchParams = new URLSearchParams();
  searchParams.set("cropYearStartYear", String(params.cropYearStartYear));
  searchParams.set("seasonCode", params.seasonCode);

  const qs = searchParams.toString();
  const res = await apiFetch(`/admin/season-bag-rates?${qs}`);

  const parsed = ListSeasonBagRatesResponseSchema.safeParse(res);
  if (!parsed.success) {
    throw new Error("Unexpected response from server.");
  }

  return parsed.data;
}

export async function upsertSeasonBagRates(payload: UpsertSeasonBagRatesRequest) {
  const res = await apiFetch("/admin/season-bag-rates", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const parsed = ListSeasonBagRatesResponseSchema.safeParse(res);
  if (!parsed.success) {
    throw new Error("Unexpected response from server.");
  }

  return parsed.data;
}
