# AI 영어 교육 플랫폼 - 프로젝트 구조 가이드

이 문서는 프로젝트의 전체 구조와 각 파일의 역할을 설명합니다.

## 📂 전체 디렉토리 구조

```
ai-english-platform/
├── .git/                       # Git 버전 관리 (자동 생성)
├── .vscode/                    # VS Code 설정
│   └── extensions.json         # 추천 확장 프로그램
├── dist/                       # 빌드 출력 디렉토리 (자동 생성)
│   └── assets/                 # 빌드된 정적 파일
├── node_modules/               # npm 패키지 (자동 생성)
├── public/                     # 정적 파일 (현재 비어있음)
├── src/                        # 소스 코드
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Home.tsx           # 홈 페이지 컴포넌트
│   │   ├── Home.css           # 홈 페이지 스타일
│   │   ├── Speaking.tsx       # 말하기 연습 페이지
│   │   ├── Speaking.css       # 말하기 페이지 스타일
│   │   ├── Writing.tsx        # 쓰기 연습 페이지
│   │   ├── Writing.css        # 쓰기 페이지 스타일
│   │   ├── Reading.tsx        # 읽기 연습 페이지
│   │   ├── Reading.css        # 읽기 페이지 스타일
│   │   ├── Calendar.tsx       # 학습 기록 달력 페이지
│   │   └── Calendar.css       # 달력 페이지 스타일
│   ├── App.tsx                # 메인 애플리케이션 컴포넌트
│   ├── App.css                # 앱 전역 스타일
│   ├── main.tsx               # React 진입점
│   └── index.css              # 글로벌 CSS 변수 및 기본 스타일
├── .gitignore                  # Git 제외 파일 목록
├── ARCHITECTURE.md             # 아키텍처 문서
├── index.html                  # HTML 진입점
├── package.json                # 프로젝트 의존성 및 스크립트
├── package-lock.json           # 의존성 잠금 파일 (자동 생성)
├── README.md                   # 프로젝트 개요 및 사용법
├── tsconfig.json               # TypeScript 컴파일러 설정
├── tsconfig.node.json          # Node 환경 TypeScript 설정
├── vercel.json                 # Vercel 배포 설정
└── vite.config.ts              # Vite 빌드 도구 설정
```

## 🗂️ 상세 파일 설명

### 루트 디렉토리 파일

#### `package.json`
- **역할**: 프로젝트 메타데이터 및 의존성 관리
- **주요 내용**:
  - 프로젝트 이름, 버전
  - npm 스크립트 (dev, build, preview)
  - 프로덕션 의존성 (react, react-router-dom 등)
  - 개발 의존성 (typescript, vite 등)

#### `tsconfig.json`
- **역할**: TypeScript 컴파일러 설정
- **주요 설정**:
  - 타겟: ES2020
  - JSX 모드: react-jsx
  - Strict 모드 활성화
  - 모듈 해석: bundler

#### `vite.config.ts`
- **역할**: Vite 빌드 도구 설정
- **주요 내용**:
  - React 플러그인 설정
  - 빌드 최적화 옵션

#### `vercel.json`
- **역할**: Vercel 배포 설정
- **주요 내용**:
  - SPA 라우팅을 위한 rewrites 설정
  - 모든 경로를 index.html로 리다이렉트

#### `index.html`
- **역할**: HTML 진입점
- **주요 내용**:
  - `<div id="root">` - React 앱이 마운트되는 위치
  - `<script src="/src/main.tsx">` - React 진입점 로드

#### `.gitignore`
- **역할**: Git에서 추적하지 않을 파일 목록
- **제외 항목**:
  - `node_modules/` - npm 패키지
  - `dist/` - 빌드 출력
  - 로그 파일
  - 에디터 설정 파일

### `src/` 디렉토리

#### `main.tsx`
- **역할**: React 애플리케이션의 진입점
- **기능**:
  - ReactDOM으로 앱을 DOM에 마운트
  - StrictMode로 개발 모드 검증
  - 글로벌 CSS 임포트

```typescript
// 실행 순서:
// 1. index.html 로드
// 2. main.tsx 실행
// 3. App.tsx 렌더링
// 4. 라우팅 및 페이지 표시
```

#### `App.tsx`
- **역할**: 메인 애플리케이션 컴포넌트 및 라우팅 관리
- **주요 기능**:
  - React Router 설정
  - 네비게이션 바 렌더링
  - 라우트 정의:
    - `/` → Home
    - `/speaking` → Speaking
    - `/writing` → Writing
    - `/reading` → Reading
    - `/calendar` → Calendar
  - 활성 라우트 하이라이트

#### `App.css`
- **역할**: 앱 레벨 스타일
- **주요 스타일**:
  - 네비게이션 바 (글래스모피즘 효과)
  - 레이아웃 구조
  - 반응형 디자인

#### `index.css`
- **역할**: 글로벌 스타일 및 CSS 변수 정의
- **주요 내용**:
  - CSS 변수 (색상, 간격 등)
  - 전역 리셋 스타일
  - 공통 컴포넌트 스타일 (버튼, 카드 등)
  - 기본 타이포그래피

### `src/pages/` 디렉토리

각 페이지는 `.tsx` (컴포넌트)와 `.css` (스타일) 파일로 구성됩니다.

#### `Home.tsx` / `Home.css`
- **역할**: 플랫폼 소개 및 기능 안내
- **주요 기능**:
  - 히어로 섹션 (메인 타이틀)
  - 기능 카드 (말하기/쓰기/읽기)
  - 통계 카드
  - 각 기능 페이지로의 링크

#### `Speaking.tsx` / `Speaking.css`
- **역할**: 영어 말하기 연습
- **주요 기능**:
  - 일일 질문 표시
  - 오디오 녹음 (MediaRecorder API)
  - 3분 타이머
  - 녹음 재생
  - AI 피드백 표시 (발음, 문법, 종합)
- **상태 관리**:
  - `timeLeft`: 남은 시간 (초)
  - `isRecording`: 녹음 중 여부
  - `audioBlob`: 녹음된 오디오 데이터
  - `feedback`: AI 피드백 결과

#### `Writing.tsx` / `Writing.css`
- **역할**: 영어 쓰기 연습
- **주요 기능**:
  - 일일 주제 표시
  - 텍스트 에디터
  - 10분 타이머
  - 단어 수 카운터
  - AI 피드백 표시 (문법, 어휘, 구조, 종합)
- **상태 관리**:
  - `timeLeft`: 남은 시간 (초)
  - `text`: 작성 중인 텍스트
  - `wordCount`: 단어 수
  - `isActive`: 작성 중 여부
  - `feedback`: AI 피드백 결과

#### `Reading.tsx` / `Reading.css`
- **역할**: 영어 읽기 연습
- **주요 기능**:
  - 시험 유형 선택 (TOEIC/TOEFL/수능)
  - 지문 표시
  - 객관식 문제
  - 문제당 2분 타이머
  - 즉시 채점
  - 상세 해설 표시
- **상태 관리**:
  - `currentQuestion`: 현재 문제 번호
  - `timeLeft`: 남은 시간 (초)
  - `selectedAnswer`: 선택한 답안
  - `answers`: 답안 목록
  - `showFeedback`: 피드백 표시 여부
  - `examType`: 시험 유형

#### `Calendar.tsx` / `Calendar.css`
- **역할**: 학습 기록 관리
- **주요 기능**:
  - 동적 달력 생성 (현재 월 자동 계산)
  - 날짜 클릭으로 기록 추가
  - 기록 수정/삭제
  - 영역별 색상 표시
  - 난이도 평가
  - 메모 작성
- **상태 관리**:
  - `entries`: 학습 기록 목록
  - `showModal`: 모달 표시 여부
  - `selectedDate`: 선택한 날짜
  - `selectedEntry`: 수정 중인 기록
  - `formData`: 폼 입력 데이터
- **데이터 구조**:
  ```typescript
  interface DiaryEntry {
    id: string
    date: string  // YYYY-MM-DD 형식
    type: 'speaking' | 'writing' | 'reading'
    difficulty: '하' | '중' | '상'
    notes: string
  }
  ```

## 🔄 컴포넌트 계층 구조

```
App.tsx
├── Navigation Bar
│   ├── Logo
│   └── Nav Links
│       ├── Home Link
│       ├── Speaking Link
│       ├── Writing Link
│       ├── Reading Link
│       └── Calendar Link
└── Main Content (Routes)
    ├── Home Page
    │   ├── Hero Section
    │   ├── Feature Cards
    │   └── Stats Cards
    ├── Speaking Page
    │   ├── Question Card
    │   ├── Timer
    │   ├── Recording Section
    │   └── Feedback Section
    ├── Writing Page
    │   ├── Topic Card
    │   ├── Timer & Word Count
    │   ├── Text Editor
    │   └── Feedback Section
    ├── Reading Page
    │   ├── Exam Selector
    │   ├── Passage Section
    │   ├── Question Section
    │   └── Explanation Section
    └── Calendar Page
        ├── Calendar Grid
        ├── Entries List
        └── Modal (Add/Edit Entry)
```

## 📊 데이터 흐름

### 1. 말하기 연습 플로우
```
사용자 클릭 (녹음 시작)
    ↓
MediaRecorder API 시작
    ↓
3분 타이머 시작
    ↓
오디오 녹음 (Blob 생성)
    ↓
녹음 완료 → 피드백 요청
    ↓
AI 피드백 표시
```

### 2. 쓰기 연습 플로우
```
사용자 클릭 (작성 시작)
    ↓
10분 타이머 시작
    ↓
텍스트 입력 → 단어 수 실시간 계산
    ↓
제출 → 피드백 요청
    ↓
AI 피드백 표시
```

### 3. 읽기 연습 플로우
```
시험 유형 선택
    ↓
지문 및 문제 로드
    ↓
2분 타이머 시작 (문제당)
    ↓
답안 선택
    ↓
즉시 채점 및 해설 표시
```

### 4. 학습 기록 플로우
```
달력 날짜 클릭
    ↓
모달 열기
    ↓
기록 정보 입력
    ↓
저장 → entries 배열 업데이트
    ↓
달력에 색상 표시
```

## 🎨 스타일 시스템

### CSS 변수 (index.css)
```css
--primary: #6366f1           /* 주요 색상 (파란색) */
--primary-dark: #4f46e5      /* 어두운 파란색 */
--secondary: #f59e0b          /* 보조 색상 (주황색) */
--success: #10b981            /* 성공 색상 (녹색) */
--danger: #ef4444             /* 위험 색상 (빨간색) */
--background: gradient        /* 배경 그라데이션 */
--surface: #ffffff            /* 카드/표면 색상 */
--text-primary: #0f172a       /* 주요 텍스트 색상 */
--text-secondary: #64748b     /* 보조 텍스트 색상 */
--border: #e5e7eb             /* 테두리 색상 */
```

### 스타일 계층
1. **index.css**: 글로벌 변수 및 기본 스타일
2. **App.css**: 레이아웃 및 네비게이션
3. **pages/*.css**: 페이지별 고유 스타일

## 🔌 API 및 브라우저 API 사용

### 사용 중인 브라우저 API
- **MediaRecorder API**: 오디오 녹음 (Speaking 페이지)
- **Date API**: 날짜 및 시간 관리 (모든 페이지)
- **URL.createObjectURL**: 오디오 재생 (Speaking 페이지)

### 외부 라이브러리
- **React Router**: 클라이언트 사이드 라우팅
- **Lucide React**: 아이콘
- **Vite**: 빌드 도구 및 개발 서버

## 🚀 빌드 및 배포

### 개발 환경
```bash
npm run dev
# → localhost:5173에서 개발 서버 실행
```

### 프로덕션 빌드
```bash
npm run build
# → dist/ 디렉토리에 빌드 결과 생성
```

### 배포
- **플랫폼**: Vercel
- **방식**: GitHub 연동 자동 배포
- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist/`

## 📝 주요 컴포넌트 설명

### 공통 패턴
모든 페이지 컴포넌트는 다음 패턴을 따릅니다:
1. **페이지 헤더**: 제목 및 설명
2. **응원 문구**: 동기부여 메시지
3. **메인 컨텐츠**: 기능별 구현
4. **피드백 섹션**: AI 피드백 표시 (해당되는 경우)

### 상태 관리 패턴
- **로컬 State (useState)**: 각 컴포넌트에서 자체 상태 관리
- **메모이제이션 (useMemo)**: 달력 그리드 생성 등 최적화
- **부수 효과 (useEffect)**: 타이머, 데이터 동기화 등

## 🔮 확장 가능성

### 현재 구조의 장점
- 모듈화된 컴포넌트 구조
- 페이지별 독립적인 스타일
- 명확한 라우팅 구조
- 타입 안전성 (TypeScript)

### 향후 개선 가능 영역
- 상태 관리 라이브러리 도입 (Redux, Zustand 등)
- API 레이어 분리
- 공통 컴포넌트 추출
- 테스트 코드 추가
- 백엔드 연동 준비

## 📚 추가 문서
- `README.md`: 프로젝트 개요 및 사용법
- `ARCHITECTURE.md`: 아키텍처 및 기술 상세 설명

---

**작성일**: 2025-01-26  
**프로젝트 버전**: 1.0.0  
**문서 버전**: 1.0.0

