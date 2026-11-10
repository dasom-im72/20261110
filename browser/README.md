# FIGROOM

HTML/CSS/바닐라 JavaScript와 정적 JSON 데이터로 만든 반응형 피규어샵 랜딩페이지입니다. 배포할 때 Python 서버는 필요하지 않습니다.

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
- `static/products.json`: 상품 6개 데이터. 상품명과 가격을 수정하려면 이 파일을 편집합니다.

## Vercel 배포

GitHub 저장소에 `browser/static/index.html`이 있는 구조로 업로드한 다음 Vercel에서 저장소를 가져옵니다. `__pycache__`는 업로드하지 않습니다.

- Root Directory: `browser`
- Framework Preset: `Other`
- Build Command: Override를 켜고 빈칸
- Output Directory: `static`

브라우저가 `./products.json`을 직접 읽으므로 Python API 설정이나 추가 패키지 설치는 필요 없습니다.

장바구니는 브라우저 localStorage에 저장됩니다. 데모 상품 6개를 제공하며 데스크톱에서는 4열, 모바일에서는 2열로 표시합니다. Google Fonts 연결이 없으면 시스템 폰트를 사용하며 일러스트는 외부 연결 없이 표시됩니다.

상품명과 가격은 가상 데이터입니다. 회원가입, 실제 결제, 주문 저장 기능은 없습니다. 서버는 개발용으로 로컬 주소에만 바인딩됩니다.
