export type Category = "prime" | "joint" | "sub";

export interface Company {
  id: string;
  name: string;
  category: Category;
  section?: number; // 공구 번호 (공동도급사에서 사용)
}

export interface NewsItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
}

export interface ApiResponse {
  items: NewsItem[];
  error?: string;
}
