import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "건설사 뉴스 모니터링 | 수도권 제2순환선(양평-이천)",
  description: "수도권 제2순환선(양평-이천) 건설공사 참여 건설사 최신뉴스를 한 눈에 확인하는 모니터링 대시보드",
  openGraph: {
    title: "건설사 뉴스 모니터링 | 수도권 제2순환선(양평-이천)",
    description: "수도권 제2순환선(양평-이천) 건설공사 참여 건설사 최신뉴스를 한 눈에 확인하는 모니터링 대시보드",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
