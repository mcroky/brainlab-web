# 브레인랩 홈페이지 (brainlab-web)

브레인랩 창의융합교육센터 공식 홈페이지. 빌드 도구 없는 순수 HTML/CSS/JS 정적 사이트 — **push가 곧 배포**입니다.
설계 문서: `노션_업로드용/43_홈페이지_설계.md` (저장소에 커밋 금지 — 내부 문서)

## 배포 방법 (최초 1회)

1. GitHub Organization(예: `brainlab-edu`) 생성 → `brainlab-web` **Public** 저장소 생성
2. 이 폴더를 push
3. 저장소 Settings → Pages → Source: `main` 브랜치 `/ (root)` 선택
4. 몇 분 뒤 `https://<org>.github.io/brainlab-web/` 접속 확인

## 도메인 연결 (개원 인쇄물 제작 전)

1. 도메인 구입 → Settings → Pages → Custom domain 입력 (CNAME 파일 자동 생성)
2. DNS: apex는 A 레코드(GitHub Pages IP 4개), www는 CNAME → `<org>.github.io`
3. Enforce HTTPS 체크. 기존 github.io 주소는 자동 301 리다이렉트되므로 이미 배포된 QR·링크 모두 유효

## 🔒 커밋 전 검수 체크리스트 (매번 확인 — 커밋 이력은 영구 공개)

- [ ] 내부 문서(노션_업로드용/*), 원가·단가표, 개인정보(원생·학부모)가 포함되지 않았는가
- [ ] 새 콘텐츠가 공개 수위 정책(43번 설계서 2장)을 통과하는가 — 그림책·워크북 본문, 지도안 세부, 측정 루브릭 금지
- [ ] 이미지는 압축본인가 (폭 1200px 이하, 원본 사진 금지)
- [ ] 아동 사진은 서면 동의분인가

## 오픈 전 TODO (노란 형광펜 `.placeholder` 표시 전수 교체)

- [ ] 상세 주소·도로명 주소 (footer, contact)
- [ ] 전화번호 — `tel:` 링크 포함 (footer, contact)
- [ ] 카카오톡 채널 개설 후 링크 교체 (contact)
- [ ] 구글 폼 생성 후 체험 신청 링크 연결 (contact, admission)
- [ ] 학원등록번호·대표자명 (footer) — 교육지원청 신고 후
- [ ] 수강료 게시 — 교습비 신고 **수리 후에만** (admission, 43번 설계서 10장)
- [ ] 시범반 마감 후 공지 배너 문구 교체 (index.html 상단 `.notice-bar`)
- [ ] OG 이미지 전용 제작 (현재 logo.jpg 임시 사용)
- [ ] **og:image를 절대 URL로 교체** — 배포 주소 확정 후 전 페이지의 `og:image`를 `https://<계정>.github.io/<repo>/images/logo.jpg` 형태로 일괄 변경 (카톡·페북 스크레이퍼는 상대경로 이미지를 못 읽음) + `og:url` 추가 + 카카오톡 공유 디버거로 미리보기 실물 확인
- [ ] 네이버 서치어드바이저 등록 + sitemap.xml 생성 (도메인 연결 후)

## 구조

- 페이지: 폴더/`index.html` 방식 (`/about/`, `/program/` …) — URL에 .html 노출 없음
- 모든 링크·리소스는 **상대경로** (`./`, `../`) — 도메인 전환 비용 0의 핵심 규칙
- `partnership/`은 v2 공개 예정: nav 주석 처리 + robots.txt Disallow + noindex 상태
- 디자인 토큰: `css/style.css` 상단 `:root` — 이 값이 브랜드 컬러의 원본 (미니 브랜드 가이드)
