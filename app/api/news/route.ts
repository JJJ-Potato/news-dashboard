import { type NextRequest } from "next/server";
import type { ApiResponse, NewsItem } from "@/lib/types";

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#0*39;/g, "'").trim();
}

export async function GET(request: NextRequest) {
  const company = request.nextUrl.searchParams.get("company");

  if (!company) {
    return Response.json({ items: [], error: "company 파라미터가 필요합니다." }, { status: 400 });
  }

  const clientId = process.env.NAVER_CLIENT_ID;
  const clientSecret = process.env.NAVER_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return Response.json({ items: [], error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  try {
    const params = new URLSearchParams({ query: company, display: "20", sort: "date" });
    const res = await fetch(`https://openapi.naver.com/v1/search/news.json?${params}`, {
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
    });

    if (!res.ok) {
      return Response.json({ items: [], error: `네이버 API 오류: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    const mapped: NewsItem[] = (data.items ?? []).map((item: Record<string, string>) => ({
      title: stripHtml(item.title),
      originallink: item.originallink,
      link: item.link,
      description: stripHtml(item.description),
      pubDate: item.pubDate,
      source: new URL(item.originallink).hostname.replace(/^www\./, ""),
    }));

    // 제목 또는 요약에 기업명 전체가 포함된 기사만 유지
    const items = mapped
      .filter(item => item.title.includes(company) || item.description.includes(company))
      .slice(0, 10);

    return Response.json({ items } satisfies ApiResponse);
  } catch (err) {
    const message = err instanceof Error ? err.message : "알 수 없는 오류";
    return Response.json({ items: [], error: message }, { status: 500 });
  }
}
