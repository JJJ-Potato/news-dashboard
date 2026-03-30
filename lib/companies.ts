import type { Company } from "./types";

export const COMPANIES: Company[] = [
  { id: "daewoo", name: "대우건설", category: "prime" },
  { id: "geukdong", name: "극동건설", category: "prime" },
  { id: "kcc", name: "KCC건설", category: "prime" },
  { id: "taeyoung", name: "태영건설", category: "prime" },
  { id: "daemyung", name: "대명건설", category: "joint", section: 1 },
  { id: "dowon", name: "도원이엔씨", category: "joint", section: 2 },
  { id: "daeya", name: "대야산업", category: "sub", section: 1 },
];

export const CATEGORY_LABELS: Record<string, string> = {
  prime: "원도급사",
  joint: "공동도급사",
  sub: "하도급사",
};
