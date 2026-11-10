# FIGROOM

HTML/CSS/바닐라 JavaScript와 Supabase로 만든 반응형 피규어샵입니다. Vercel에는 정적 파일을 배포하고, 로그인과 상품 데이터는 Supabase에서 처리합니다. 배포할 때 Python 서버는 필요하지 않습니다.

## 실행

이 폴더에서 다음 명령을 실행합니다. Python 3.10 이상을 권장합니다. 추가 패키지는 필요 없습니다.

```powershell
python server.py
```

브라우저에서 http://127.0.0.1:8000 에 접속합니다. 포트 변경: `python server.py --port 8080`.
PyCharm에서는 `server.py`를 실행해도 됩니다. HTML 파일을 직접 열지 말고 서버 주소로 접속하세요.

## 구성

- `server.py`: 로컬 미리보기 서버 (기존 `GET /api/products`도 같은 JSON 데이터를 반환)
- `static/index.html`: 랜딩페이지, 상품 상세 및 장바구니 대화상자
- `static/style.css`: 반응형 디자인
- `static/app.js`: 자체 SVG 일러스트, 검색, 카테고리 필터, 정렬, 상품 상세, 장바구니
- `static/products.json`: 최초 등록용 데모 상품 6개. 스토어는 이 파일 대신 Supabase 상품 테이블을 조회합니다.
- `static/supabase-client.js`: 공개 연결 정보, 인증 및 API 요청
- `static/admin.html`, `admin.js`, `admin.css`: 관리자 로그인 및 상품 관리 화면
- `supabase_storage.sql`: 관리자 상품 이미지 업로드용 버킷과 접근 규칙

## 관리자 설정 및 사용

1. Supabase에서 상품 테이블과 관리자 권한 설정 SQL을 먼저 실행합니다. `products`와 `admin_users` 테이블이 있어야 합니다.
2. 이미지 업로드를 쓰려면 SQL Editor의 새 쿼리에서 `supabase_storage.sql` 전체를 실행합니다. 상품 이미지 버킷은 공개이므로 민감한 파일을 올리지 않습니다.
3. 로컬 서버 실행 후 `/admin.html`에 접속하거나 스토어 하단의 '관리자 로그인'을 누릅니다.
4. Supabase Authentication에서 만든 관리자 이메일·비밀번호로 로그인합니다.
5. 상품이 없는 경우 '기존 상품 6개 등록'을 한 번 누릅니다. 상품 ID는 DB가 자동 생성합니다.
6. 상품 추가·수정·삭제, 공개·숨김, 품절, 이미지 URL 또는 업로드를 관리합니다. 스토어를 새로고침하면 변경 사항이 반영됩니다.

로그인 세션은 현재 탭의 sessionStorage에 저장합니다. 비밀번호는 저장하지 않습니다. 새 탭에서는 다시 로그인합니다. 일반 로그인 계정은 관리자 권한을 얻지 않으며 DB의 RLS가 최종 권한을 검사합니다. 공개 회원가입 화면은 제공하지 않습니다.

화면에는 Publishable key만 넣었습니다. Secret key, service_role 키, 데이터베이스 비밀번호를 파일에 추가하지 마세요. 이미지 변경·상품 삭제 후 이전 이미지 파일은 자동 삭제하지 않습니다. 미사용 파일은 Supabase Storage에서 정리할 수 있습니다.

## Vercel 배포

GitHub 저장소에 `browser/static/index.html`이 있는 구조로 업로드한 다음 Vercel에서 저장소를 가져옵니다. `__pycache__`는 업로드하지 않습니다.

- Root Directory: `browser`
- Framework Preset: `Other`
- Build Command: Override를 켜고 빈칸
- Output Directory: `static`

Supabase 설정을 마친 최신 `browser` 폴더를 GitHub에 업로드합니다. `supabase-client.js`와 관리자 화면 파일도 함께 올려야 합니다. Python API 설정이나 추가 패키지 설치는 필요 없습니다.

장바구니는 브라우저 localStorage에 저장됩니다. 데모 상품 6개를 제공하며 데스크톱에서는 4열, 모바일에서는 2열로 표시합니다. Google Fonts 연결이 없으면 시스템 폰트를 사용하며 일러스트는 외부 연결 없이 표시됩니다.

상품명과 가격은 가상 데이터입니다. 관리자 로그인 외에 고객 회원가입, 실제 결제, 주문 저장 기능은 없습니다. 로컬 서버는 개발용으로 로컬 주소에만 바인딩됩니다.
