const DOMAIN_TO_PRESS: Record<string, string> = {
  // 종합일간지
  "chosun.com": "조선일보",
  "donga.com": "동아일보",
  "hani.co.kr": "한겨레",
  "khan.co.kr": "경향신문",
  "munhwa.com": "문화일보",
  "segyetimes.co.kr": "세계일보",
  "kmib.co.kr": "국민일보",
  "joins.com": "중앙일보",
  "joongang.co.kr": "중앙일보",
  "joongdo.co.kr": "중도일보",
  "imaeil.com": "매일신문",
  "busan.com": "부산일보",

  // 경제지
  "hankyung.com": "한국경제",
  "mk.co.kr": "매일경제",
  "edaily.co.kr": "이데일리",
  "mt.co.kr": "머니투데이",
  "sedaily.com": "서울경제",
  "fnnews.com": "파이낸셜뉴스",
  "thebell.co.kr": "더벨",
  "bizwatch.co.kr": "비즈워치",
  "newstomato.com": "뉴스토마토",

  // IT·전문지
  "etnews.com": "전자신문",
  "etnews.co.kr": "전자신문",
  "dt.co.kr": "디지털타임스",
  "zdnet.co.kr": "ZDNet Korea",
  "inews24.com": "아이뉴스24",

  // 방송
  "kbs.co.kr": "KBS",
  "mbc.co.kr": "MBC",
  "sbs.co.kr": "SBS",
  "jtbc.co.kr": "JTBC",
  "ytn.co.kr": "YTN",
  "tvchosun.com": "TV조선",
  "mbn.co.kr": "MBN",
  "channela.com": "채널A",
  "sentv.co.kr": "서울경제TV",
  "paxetv.com": "팍스경제TV",
  "knn.co.kr": "KNN",

  // 통신사·인터넷
  "yna.co.kr": "연합뉴스",
  "yonhapnews.co.kr": "연합뉴스",
  "news1.kr": "뉴스1",
  "newsis.com": "뉴시스",
  "nocutnews.co.kr": "노컷뉴스",
  "ohmynews.com": "오마이뉴스",
  "pressian.com": "프레시안",
  "mediatoday.co.kr": "미디어오늘",
  "sisajournal.com": "시사저널",
  "sisa-news.com": "시사뉴스",
  "m-economynews.com": "M이코노미뉴스",

  // 건설·부동산 전문
  "koscaj.com": "한국건설신문",
  "constructionkorea.com": "건설경제",
  "conslove.co.kr": "건설경제",
  "cnews.co.kr": "건설경제신문",
  "insightkorea.co.kr": "인사이트코리아",
  "pinpointnews.co.kr": "핀포인트뉴스",
  "koreastocknews.com": "코리아스탁뉴스",
  "ggilbo.com": "금강일보",
  "sidae.com": "시대일보",
}

export function domainToPress(hostname: string): string {
  const clean = hostname.replace(/^www\./, "")
  return DOMAIN_TO_PRESS[clean] ?? clean
}
