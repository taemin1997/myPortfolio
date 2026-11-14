# 포트폴리오 사이트

GitHub Pages에 그대로 올릴 수 있는 정적 사이트 (빌드 과정 없음).

## 파일 구성

| 파일 | 역할 | 언제 고치나 |
|---|---|---|
| `content.js` | **모든 내용** (소개, 프로젝트, 수치, 그래프 데이터, 링크) | 내용·수치를 바꿀 때 — 대부분 이 파일만 고치면 됨 |
| `style.css` | 색·글꼴·배치 | 디자인을 바꿀 때 |
| `app.js` | `content.js`를 화면으로 그리는 코드 | 새 종류의 칸이 필요할 때만 |
| `index.html` | 메인 페이지 뼈대 (소개·기술·연락처·대표 프로젝트·목록) | 거의 안 고침 |
| `project.html` | 프로젝트 상세 페이지 뼈대. `project.html?id=docentalk`처럼 `content.js`의 `id`로 열림 | 거의 안 고침 |
| `pdf/summary.html` → `pdf/portfolio_summary.pdf` | 제출용 A4 요약본 | 내용이 바뀌면 같이 고친 뒤 PDF 다시 만들기 |

## 자주 하는 수정

- **빈칸 채우기**: `content.js`에서 `TODO`를 찾아 내용으로 바꾸기. `TODO: 설명`처럼 쓰면 화면에 "(직접 채우기: 설명)"으로 나옴
- **수치 바꾸기**: 프로젝트의 `metrics`(큰 숫자 칸)와 `figures`(그래프 데이터)를 같이 고치기
- **첫 화면 대표 프로젝트 칸 바꾸기**: `highlights` 배열 수정 (`headline` 한 문장 + `points` 두세 줄 + `figure` 그래프 하나). 색은 해당 프로젝트의 `color`를 따라감
- **결과 칸**: `metrics`의 `v`는 숫자보다 "무엇을 해냈나"를 짧게, 수치는 `k`·`c`에 측정 조건과 함께
- **Compare Agent 완료 후**: `pending` 줄을 지우고 Docentalk처럼 `goal`, `decisions`, `metrics`, `troubles`, `limits`를 채우면 같은 모양으로 나옴
- **내 작업 / 팀 표시**: 항목에 `who: "me"` 또는 `who: "team"`

## 로컬 미리보기

`.claude/serve.js`는 미리보기용 서버 (배포에는 필요 없음).

```bash
node .claude/serve.js
```

브라우저에서 http://localhost:5500 열기.

## PDF 다시 만들기 (미리보기 서버가 켜져 있을 때)

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --no-pdf-header-footer --virtual-time-budget=6000 --print-to-pdf="pdf/portfolio_summary.pdf" "http://localhost:5500/pdf/summary.html"
```

## 고지

pokemon_rl 관련 그림은 모두 직접 만든 그래프·도식이며 게임 화면, ROM, 원작 에셋을 포함하지 않음. Pokémon 및 관련 명칭은 Nintendo / Creatures Inc. / GAME FREAK inc.의 상표이며, 이 사이트는 위 회사들과 관계가 없음.
