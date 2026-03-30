# 건설사 뉴스 모니터링

수도권 제2순환선(양평-이천) 건설공사 참여 건설사의 최신 뉴스를 한 눈에 확인하는 대시보드입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **News API**: 네이버 검색 API
- **Font**: Pretendard
- **Deploy**: Vercel

## 로컬 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env.example`을 복사하여 `.env.local`을 생성하고 네이버 API 키를 입력합니다.

```bash
cp .env.example .env.local
```

네이버 개발자센터(https://developers.naver.com)에서 애플리케이션을 등록하고 발급받은 키를 입력하세요.

```
NAVER_CLIENT_ID=발급받은_클라이언트_ID
NAVER_CLIENT_SECRET=발급받은_클라이언트_시크릿
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 기업 추가 방법

`lib/companies.ts` 파일의 `COMPANIES` 배열에 항목을 추가하면 자동 반영됩니다.

```ts
{ id: "고유id", name: "기업명", category: "prime" | "joint" | "sub", section: 1 | 2 | 3 | 4 }
```

- `category`: `prime`(원도급사) / `joint`(공동도급사) / `sub`(하도급사)
- `section`: 공구 번호 (공동도급사·하도급사에서 사용)

## Vercel 배포 방법

1. GitHub에 저장소 푸시
2. [Vercel](https://vercel.com)에서 해당 저장소 연결
3. Vercel 프로젝트 설정 > Environment Variables에 아래 두 값 입력
   - `NAVER_CLIENT_ID`
   - `NAVER_CLIENT_SECRET`
4. Deploy
"# news-dashboard" 
"# news-dashboard" 
