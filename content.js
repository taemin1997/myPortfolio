/*
 * 포트폴리오 내용은 이 파일 하나만 고치면 됨.
 * - 문자열 안에 "TODO" 라고 쓰면 노란 "(직접 채우기)" 표시로 바뀜. 예: "TODO", "TODO: 한 줄 소개"
 * - 문자열 안에 <code>, <b> 같은 간단한 HTML을 써도 됨
 * - who 값: "me"(내 작업) / "team"(팀) / 생략
 * - 화면 모양(style.css)·그리는 방식(app.js)은 이 파일과 따로 있어서 디자인을 바꿔도 내용은 그대로 남음
 */
window.PORTFOLIO = {
  profile: {
    name: "고태민",
    role: "데이터·AI 직무 신입 지원",
    lead: "RAG 서비스의 데이터·백엔드를 맡고, 강화학습 실험을 혼자 설계해 끝까지 측정한 프로젝트 모음",
    intro: "TODO: 한 줄 소개",
    org: "SKN AI 캠프 35기 · 2026.07 ~ 12",
    email: "TODO",
    phone: "TODO",
    github: "taemin1997",
    pdf: "pdf/portfolio_summary.pdf",
    updated: "2026-11-14"
  },

  /* 첫 화면 오른쪽의 대표 프로젝트 요약 칸. project 값은 아래 projects의 id (누르면 해당 프로젝트로 이동) */
  highlights: [
    {
      project: "docentalk",
      label: "02 · Docentalk 3차 → 4차 · 팀",
      headline: "3차에서 미달이던 검색 지표를 4차에서 모두 통과",
      points: [
        { who: "me", text: "백엔드를 FastAPI → Django로 옮기면서 API 54개의 주소·응답을 그대로 유지해 프론트 수정 없이 교체" },
        { who: "team", text: "벡터 + BM25 하이브리드 검색으로 청크 Recall@5 0.787 → 0.870 (45문항, 목표 0.85)" }
      ],
      figure: "docentalk-recall"
    },
    {
      project: "pokemon-rl",
      label: "03 · pokemon_rl · 개인 연구",
      headline: "자동 복구 뒤 생긴 '잊어버림'의 원인을 찾고 대응까지 검증",
      points: [
        { text: "길목 몇 칸의 행동만 옛 정책으로 되돌리면 성공이 돌아옴을 반사실 실험으로 확인 (3/3 사례)" },
        { text: "확신 상태에만 KL 규제를 거는 방식으로 두 시드 모두 기존 구간 보존 통과" }
      ],
      figure: "e29"
    }
  ],

  /* 그림 데이터. 수치를 바꾸면 그래프도 같이 바뀜 */
  figures: {
    "docentalk-recall": {
      type: "dumbbell",
      min: 0.70, max: 0.90, ticks: [0.70, 0.75, 0.80, 0.85, 0.90],
      fromLabel: "3차", toLabel: "4차", targetLabel: "목표",
      rows: [
        { label: "청크 Recall@5", from: 0.787, to: 0.870, target: 0.85 },
        { label: "MRR", from: 0.778, to: 0.852, target: 0.80 },
        { label: "nDCG@5", from: 0.751, to: 0.828, target: 0.80 }
      ],
      caption: "청크 검색 지표 3차 → 4차 (팀 성과, 45문항). 점선은 목표값. 저장소 평가 결과로 직접 그림"
    },
    "e29": {
      type: "bars",
      max: 50, ticks: [0, 10, 20, 30, 40, 50], unit: "판",
      series: [
        { key: "b", label: "새 정책 그대로", color: "warn" },
        { key: "ctrl", label: "대조 칸만 되돌림", color: "soft" },
        { key: "c", label: "길목 칸만 되돌림", color: "accent", strong: true },
        { key: "a", label: "옛 정책", color: "ink" }
      ],
      groups: [
        { label: "K1 · 시드 0", sub: "29번도로", b: 4, ctrl: 5, c: 42, a: 49 },
        { label: "K2 · 시드 1", sub: "29번도로", b: 26, ctrl: 31, c: 45, a: 49 },
        { label: "K3 · 시드 0", sub: "무궁시티", b: 17, ctrl: 15, c: 47, a: 49 }
      ],
      caption: "E29 반사실 실험의 목표 도착 판 수 (사례당 50판, 같은 시작 상태·판 시드, 시계 고정). 사전 기준: 길목 − 새 정책 ≥ +30%p, 길목 ≥ 옛 정책 − 15%p, 대조 ≤ 길목 − 20%p. 직접 그린 그래프"
    },
    "docentalk-flow": {
      type: "flow",
      nodes: [
        { title: "브라우저", body: "Flutter Web<br>(3차 화면 그대로)" },
        { title: "nginx", body: "AWS EC2 · Docker Compose<br>화면과 API를 한 주소로" },
        { title: "Django + Ninja", body: "API 54개 · ORM 모델 22개<br>Admin · uvicorn(ASGI)", mine: true },
        { title: "답변 흐름", body: "LangGraph · 하이브리드 검색<br><code>refused</code> 검증" },
        { title: "저장소·모델", body: "TiDB(원본) · Chroma(검색 사본)<br>OpenAI · Firebase Auth" }
      ],
      legend: [["mine", "내 담당 (4차)"], ["node", "팀원 담당 또는 기존 구성"]],
      caption: "4차 시스템 구조. 저장소 문서를 바탕으로 직접 다시 그림"
    },
    "pokemon-flow": {
      type: "flow",
      nodes: [
        { title: "최종 목표 순서", body: "사람이 정함", rule: true },
        { title: "상위 계획", body: "맵 그래프에서<br>다음 목표 맵 계산", rule: true },
        { title: "길 찾기 정책 (RL)", body: "흑백 화면 72×80 + 목표 맵<br>버튼 선택 전부 · 구간 16개", mine: true },
        { title: "규칙·매크로", body: "회복 규칙 · 이벤트 대화<br>자동 전투 · 세이브 상태 시작", rule: true }
      ],
      legend: [["mine", "RL이 학습한 부분"], ["rule", "사람이 만든 비계"]],
      caption: "통합 실행 구조와 RL·비계의 경계. 저장소 문서를 바탕으로 직접 그림 (게임 화면 미사용)"
    }
  },

  projects: [
    {
      id: "compare-agent",
      title: "Compare Agent 2.1",
      status: "진행 중",
      kind: "최종 팀 프로젝트",
      tagline: "TODO: 한 줄 요약",
      desc: "12월 말 완료 후 작성 예정",
      color: "slate",
      meta: [
        ["기간", "2026.11.06 ~ 12.30"],
        ["팀", "5인 부트캠프 최종 팀 프로젝트"],
        ["내 역할", "TODO"],
        ["사용 기술", "TODO"]
      ],
      /* 완료 전에는 아래 항목이 빈칸 표로 나옴. 완료되면 pending을 지우고 다른 프로젝트처럼 goal, decisions, metrics ... 를 채우면 됨 */
      pending: ["목표와 제약", "핵심 결정", "결과", "트러블슈팅", "한계와 다음에 바꿀 점"],
      links: [{ label: "팀 저장소", url: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN35-FINAL-4TEAM" }]
    },

    {
      id: "docentalk",
      title: "Docentalk 3차 → 4차",
      kind: "팀 · 2026.10–11",
      tagline: "기능은 그대로 두고 서버를 바꾼 RAG 도슨트",
      desc: "팀이 수집·검수한 자료 안에서만 답하고 출처를 보여 주는 AI 도슨트 온라인 미술관",
      color: "blue",
      meta: [
        ["기간", "3차 2026.10.14 ~ 10.15 → 4차 2026.11.04 ~ 11.05 (각 2일)"],
        ["팀", "3차 5인 → 4차 4인 부트캠프 팀 프로젝트"],
        ["내 역할", "3차 데이터 전처리, API·DB 설계·연동, 백엔드 배포, 컬렉션 / 4차 FastAPI → Django 백엔드 이식, DB 복사·전환, 발표"],
        ["사용 기술", "FastAPI → Django 6 + Ninja, TiDB Cloud, Chroma Cloud, OpenAI, LangGraph, BM25(kiwipiepy), AWS EC2, Docker Compose, nginx"]
      ],
      figureTop: "docentalk-flow",
      goal: [
        "답변은 팀이 검수한 자료(작가 10명 · 작품 277점 · 문서 427건, 2026.10.15 기준) 안에서만 하고, 근거가 없으면 확인할 수 없다고 안내해야 했음",
        "4차 과제 요구는 Django와 클라우드 직접 배포. 3차 기능·화면은 유지하고 서버만 다시 만들어야 했음",
        "3차 평가에서 청크 검색 지표와 <code>refused</code> 상태값 정합성이 미달로 남아 있었음. 두 차수 모두 개발 기간 2일"
      ],
      decisions: [
        { who: "me", tag: "3차", title: "원본과 검색용 사본 나누기",
          body: "TiDB를 원본(작품·문서·벡터), Chroma를 검색용 사본으로 둠. 동기화 때 저장된 벡터를 그대로 복사해서 임베딩 API를 다시 부르지 않음. 승인 문서 필터 같은 관계형 조건은 TiDB에서 먼저 좁힘" },
        { who: "me", tag: "3차", title: "LLM에게 DB 쓰기를 맡기지 않기",
          body: "컬렉션은 \"모델 제안 → 사용자 확인 → 인증된 API로 저장\" 순서. MCP 도구도 <code>user_id</code>를 입력으로 받지 않고 Firebase 토큰으로 사용자를 정함" },
        { who: "me", tag: "4차", title: "프론트를 건드리지 않는 이식",
          body: "Django Ninja로 API 주소·응답 모양을 3차와 똑같이 맞춤. 기존 테이블은 <code>inspectdb</code> + <code>managed = False</code>로 스키마를 못 바꾸게 하고, 원본 DB에는 <code>migrate</code>를 실행하지 않음. 복사본의 전체 행 해시 일치를 확인한 뒤 전환함",
          note: "벡터 추천(<code>VEC_COSINE_DISTANCE</code>)과 열람 수 증가(<code>ON DUPLICATE KEY UPDATE</code>)는 ORM 표현이 없거나 원자성이 필요해 SQL로 남김" }
      ],
      metrics: [
        { who: "me", v: "프론트 수정 없이 백엔드 교체", k: "FastAPI → Django 이식 후 동작이 같음을 비교로 확인", c: "API 경로 54/54 · 응답 스냅샷 393/393 · 테스트 171/171" },
        { who: "team", v: "미달 검색 지표 3개 모두 통과", k: "청크 Recall@5 · MRR · nDCG@5", c: "0.787 → 0.870 등, 45문항, 3차 배포 → 4차 배포 EC2" },
        { who: "team", v: "거절 표시 불일치 해소", k: "<code>refused</code> 상태값 정합성 6/8 → 8/8", c: "같은 45문항 중 거절 대상 8문항" }
      ],
      resultNotes: [
        "이식 검증 세부: 함수 기준값 550/550, 쓰기 흐름 44/44. 인증은 실제 토큰 5/5 통과, 토큰 없음·잘못됨·위조·만료는 모두 401",
        "팀 평가 세부: 종합 통과 43/45 → 44/45, Faithfulness 0.9865 → 0.9878. 응답 시간 P95는 5.86초 → 6.68초로 늘었음 (목표 10초 이하 안)"
      ],
      figure: "docentalk-recall",
      troubles: [
        { who: "team", title: "문서는 찾는데 답의 조각은 못 찾음",
          phen: "3차 문서 Hit@5는 23/23(100%)인데 청크 Recall@5는 0.787로 목표 0.85 미달",
          cause: "벡터 검색만 쓰면 작품명·기법명·연도처럼 단어가 정확히 맞아야 하는 질문에서 생애·연표 같은 긴 문서가 위로 올라옴",
          fix: "벡터 + 한국어 BM25를 RRF로 합침. 18문항 실험에서 1:1은 미달, BM25 비중 2배가 세 지표 모두 통과. 비중 1.5~3배, k 10~60에서도 모두 통과" },
        { who: "team", title: "\"확인할 수 없다\"고 쓰고 거절로 안 잡힘",
          phen: "본문은 근거 부족 안내인데 <code>refused=false</code>로 보낸 답변 2건",
          cause: "답변 본문과 상태값을 서버에서 함께 검증하는 단계가 없었음",
          fix: "서버 검증 단계에 보정 규칙 추가. 적용 전 지난 답변 360건에 돌려 보정 대상 16건, 잘못 거절한 경우 0건을 먼저 확인함" },
        { who: "me", title: "배포 환경에서 Admin 스타일이 깨짐",
          phen: "로컬에서 보이던 Django Admin 화면이 배포 환경에서 스타일 없이 나옴",
          cause: "TODO",
          fix: "배포 환경에서도 Admin 정적 파일을 제공하도록 설정함" }
      ],
      limits: [
        "평가셋 45문항, BM25 가중치 실험 18문항으로 규모가 작음",
        "Faithfulness·Answer Relevancy는 LLM Judge 점수이고, Judge가 사람 판단과 얼마나 맞는지는 확인하지 않음",
        "남은 실패 1건은 원문 복사 요청 문항으로 3차 코드에서도 실행마다 통과·실패가 갈림. 지어낸 내용 없이 과잉 거절 쪽으로 실패함",
        "하이브리드 브랜치 병합 직후 import가 깨진 적이 있음. 다음에는 pytest를 병합 전 필수 검사로 더 일찍 걸겠음"
      ],
      links: [
        { label: "3차 저장소", url: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN35-3rd-1Team" },
        { label: "4차 저장소", url: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN35-4th-1Team" },
        { label: "3차 서비스", url: "https://artlog-skn35-1team.vercel.app" }
      ]
    },

    {
      id: "pokemon-rl",
      title: "pokemon_rl",
      kind: "개인 연구",
      tagline: "잊어버림의 원인을 반사실 실험으로 확인한 강화학습 연구",
      desc: "게임보이 컬러 게임(포켓몬 금 한국어판)에서 목표 맵을 입력받아 이동하는 PPO 정책을 학습하고, 실패한 구간을 스스로 고치는 과정을 실험함",
      color: "orange",
      meta: [
        ["기간", "TODO · 실험 32개 (E01 ~ E32)"],
        ["팀", "개인 연구"],
        ["내 역할", "메모리 주소 역분석, 학습 환경 구현, 실험 설계·판정, 진단 도구 작성 · AI 코딩 도구 활용 범위 TODO"],
        ["사용 기술", "Python, Stable-Baselines3(PPO), PyBoy 에뮬레이터, Go-Explore, 커리큘럼 학습"]
      ],
      figureTop: "pokemon-flow",
      goal: [
        "목표 맵을 입력으로 받는 길 찾기 정책 하나로 여러 구간을 이동하고, 처음 보는 구간에서 실패를 감지·복구하는 것까지 시험하려 했음",
        "CPU 한 대. 100만 스텝에 약 1.2시간 걸려서 실험 하나하나의 비용이 컸음",
        "보상은 \"목표 도착 +10\" 하나만 둠. 수풀·전투·전멸 벌점은 넣지 않음"
      ],
      decisions: [
        { title: "기준을 먼저 적고 하나만 바꾸기",
          body: "실험마다 가설과 판정 기준을 학습 전에 문서로 적음. 한 번에 하나만 바꾸고, 시드별 결과는 합치지 않고 따로 적음. 결과를 본 뒤 기준을 바꾼 경우에는 그 사실을 기록에 남김" },
        { title: "사람이 만든 부분을 숨기지 않기",
          body: "버튼은 RL이 고르지만 BFS 시연 경로, 세이브 상태 시작, 목표 순서, 회복 규칙, 이벤트·전투 매크로는 사람이 만든 것. 결과마다 어느 쪽 몫인지 표시하고 하나씩 걷어냄" },
        { title: "상관이 아니라 인과 확인하기",
          body: "행동이 바뀐 칸을 찾는 데서 멈추지 않고, 그 칸만 옛 정책 행동으로 되돌리는 반사실 실험과 같은 수의 대조 칸을 함께 돌려 원인을 확인함" }
      ],
      metrics: [
        { v: "잊어버림 원인 확인", k: "길목 몇 칸의 행동 뒤집힘이 원인임을 반사실 실험으로 확인", c: "3/3 사례 사전 기준 통과. 예: 길목만 되돌리면 4 → 42/50, 대조 5/50" },
        { v: "대응 방식 두 시드 통과", k: "확신 상태에만 KL 규제 → 새 구간 학습과 기존 16구간 보존 동시 달성", c: "E30, 4가지 비교, 기존 구간 최악 실패 증가 +6%p / +4%p" },
        { v: "정책 하나로 11구간 이동", k: "목표 맵을 입력받는 정책 하나가 여러 구간을 이동", c: "E23, 최악 구간 길 찾기 실패 4% / 0% (시드 0 / 1, 전멸 제외)" }
      ],
      resultNotes: [
        "조작 단위만 \"누르기 → 1칸 이동\"으로 바꿨더니 같은 커리큘럼에서 도착률 0% → 88~100% (E13 → E14, 시드 2개). 목표 조건 정책 하나로 같은 길을 정방향 96~100%, 반대 방향 100%로 이동함 (E22, 시드 2개)",
        "E30 확신 상태 = 시연 경로 594칸 중 기존 정책이 확신한 517칸, KL β=1, PPO 10만 스텝"
      ],
      figure: "e29",
      troubles: [
        { title: "자동 복구 뒤 바로 다음 구간이 깨짐 (E28 → E29 → E30)",
          phen: "실패한 구간을 자동으로 다시 학습하자, 기존 구간을 섞어 연습했는데도 바로 다음 구간이 깨짐. 29번도로 도착 100% → 8% (시계 고정 25판). 학습 중 기록(<code>real_goal</code>)에 이미 0으로 떨어진 것이 보였음",
          cause: "'목표 정보를 무시한다'(목표 민감도)와 '구간 경계 화면이 간섭한다'(입구 5칸 비율) 가설은 사전 기준으로 기각. 깨진 구간에서는 좁은 길목 몇 칸의 최빈 행동이 뒤집혀 있었고, 그 칸만 되돌리면 성공이 돌아와 인과로 확인함",
          fix: "전체 KL, 새 구간 가중치 조정 등 4가지를 비교해 확신 상태에만 KL 규제를 거는 방식을 고름" },
        { title: "통합 실행기가 지난 화면으로 판단",
          phen: "통합 실행에서 정책이 매크로 실행 전 화면을 보고 다음 행동을 고르고 있었음 (판당 약 550번)",
          cause: "속도를 위해 규칙·매크로 실행 중 화면을 그리지 않게 해 둔 설정 때문에 매크로 직후 관찰이 갱신되지 않음",
          fix: "매크로 뒤 관찰을 새로 그리도록 기본값을 바꿈. 고친 뒤 결과가 크게 달라져(한 모델 낮 8 → 18/20, 기준 모델 10 → 0/20) 그 전 판정 숫자는 모두 무효 처리하고 다시 잼" }
      ],
      limits: [
        "\"AI가 스스로 플레이한다\"는 아님. 목표 순서·이벤트·전투는 사람이 만든 규칙에 기대고 있음",
        "처음 보는 맵에 그대로 넣으면 0% (E24). 능력이 학습한 맵에 묶여 있음",
        "체육관까지 이어 가는 통합 실행은 고정 시계 8/20으로 기준 미달 (E27). 밤 시간대 일반화가 약함",
        "시드 2개, 잊어버림 사례 3개라 원인 해석은 가설 수준",
        "다음에는 확신 상태 KL을 자동 복구 루프 안에 넣고, 비계를 하나씩 걷어낸 상태에서 다시 재 보겠음"
      ],
      links: [
        { label: "저장소", url: "https://github.com/taemin1997/pokemon_rl" },
        { label: "실험 목록", url: "https://github.com/taemin1997/pokemon_rl/blob/main/notes/04_experiments.md" },
        { label: "E29 기록", url: "https://github.com/taemin1997/pokemon_rl/blob/main/notes/experiments/E29_CRITICAL.md" }
      ],
      notice: "이 저장소는 ROM 및 세이브 파일을 배포하지 않습니다. 직접 작성한 코드, 실험 기록, 직접 만든 그래프만 있으며 게임 ROM·세이브·상태 파일, 게임 화면·영상·음악·그래픽 등 원작 에셋은 포함하지 않습니다. 이 페이지의 그림도 모두 직접 만든 것입니다. Pokémon 및 관련 명칭은 Nintendo / Creatures Inc. / GAME FREAK inc.의 상표입니다. 이 프로젝트는 비상업 개인 연구·포트폴리오 목적이며 위 회사들과 관계가 없고, 승인이나 후원을 받지 않았습니다. 권리자의 요청이 있으면 해당 내용을 즉시 삭제합니다."
    },

    {
      id: "seoul",
      compact: true,
      title: "서울 상권 폐업 위험 예측",
      kind: "팀 · 2026.08",
      tagline: "불균형 데이터에서 정확도 대신 순위로 보여 준 예측",
      desc: "상가업소 스냅샷 6회와 생활인구 데이터로 상권·업종별 폐업 위험도를 계산하는 웹 앱",
      color: "green",
      meta: [
        ["기간", "2026.08.28 ~ 08.31"],
        ["팀", "5인 부트캠프 팀 프로젝트"],
        ["내 역할", "모델링 데이터 정리·결측 해소, TiDB 적재, DNN(5-fold 앙상블), Streamlit 화면·점수 계산, Gemini 상담 챗봇 (커밋 기록 기준)"],
        ["사용 기술", "PyTorch, ExtraTrees·LightGBM(팀), SHAP, TiDB Cloud, Streamlit, Gemini API"]
      ],
      metrics: [
        { who: "team", v: "ExtraTrees 채택", k: "ROC-AUC 0.7486 (정확도 대신 ROC-AUC로 선택)", c: "GroupKFold K=5, 점포 단위 분할" },
        { who: "me", v: "DNN 비교 기준 제공", k: "5-fold 앙상블 ROC-AUC 0.7233, 채택 안 됨", c: "같은 검증 조건" },
        { who: "me", v: "근거 제한 상담 챗봇", k: "화면의 DB 조회 결과만 근거로 답하게 함", c: "예측 대상이 아닌 업종은 \"예측 대상 아님\"으로 안내" }
      ],
      resultNotes: [
        "학습 데이터 약 188만 행 (소비자 대면 9개 업종군, 폐업률 10.6%)",
        "DNN은 채택되지 않았지만 같은 검증에서 트리 모델과 비교한 근거가 돼서 ExtraTrees 채택을 설명할 수 있었음"
      ],
      limits: [
        "정확도 0.888은 전부 \"안 망함\"으로 찍어도 나오는 수준이라 근거로 쓰지 않음. F1은 0.4 수준",
        "확률 보정을 안 해서 절대 점수 대신 \"423개 동 중 순위\"로만 보여 줌. PR-AUC 약 0.40은 추정치"
      ],
      links: [{ label: "팀 저장소", url: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN35-2nd-3Team" }]
    },

    {
      id: "carbti",
      compact: true,
      title: "CarBTI",
      kind: "팀 · 1차",
      tagline: "트림 단위로 설계한 차량 추천 DB",
      desc: "20문항 성향 검사로 16가지 차량 유형을 정하고, 크롤링한 차량 DB에서 1~3위를 추천하는 웹 앱",
      color: "violet",
      meta: [
        ["기간", "SKN35 1차 단위 프로젝트 · TODO: 날짜"],
        ["팀", "5인 부트캠프 팀 프로젝트"],
        ["내 역할", "크롤링, DB 설계 (테이블 9개)"],
        ["사용 기술", "Selenium, BeautifulSoup, MySQL / TiDB Cloud, Streamlit"]
      ],
      decisions: [
        { title: "가격·옵션은 트림 단위로", body: "같은 차종도 트림마다 가격·연비·옵션이 달라서 차종이 아니라 트림 테이블에 둠. 옵션과 트림은 N:N이라 연결 테이블로 풂" },
        { title: "없는 값은 지어내지 않기", body: "크롤링이 막힌 판매통계는 우회하지 않고 사람이 확인해 입력함. 공식 소스가 없는 평균 거래가는 추정값 대신 NULL로 남김" }
      ],
      resultNotes: [
        "제조사 17개·차량 135대 수집, 차종별로 다른 옵션 명칭을 26개로 표준화함",
        "공식 제원과 대조하다 가격 오류 3건을 찾아 정정함"
      ],
      links: [
        { label: "팀 저장소", url: "https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN35-1st-3Team" },
        { label: "배포 사이트", url: "https://skn35-1st-3team-nnrf48gks6yzw4qemidzdq.streamlit.app/" },
        { label: "시연 영상", url: "https://drive.google.com/file/d/1-kQiLjVrv7RRMOlCnmR6H04EjQco6Ape/view?usp=sharing" }
      ]
    }
  ],

  skills: [
    ["언어·데이터", "Python, SQL, pandas, NumPy"],
    ["ML·DL·RL", "PyTorch, Stable-Baselines3(PPO)"],
    ["LLM·RAG", "OpenAI API, Chroma, MCP, Gemini API"],
    ["백엔드·DB", "Django + Ninja, FastAPI, SQLAlchemy, TiDB / MySQL"],
    ["그 밖", "Selenium, BeautifulSoup, Streamlit, uv, Git"]
  ],
  skillsNote: "프로젝트에서 직접 쓴 것 기준 · TODO: 숙련도와 순서 조정",

  education: [
    ["2026.07–12", "SKN AI 캠프 35기 (2026.07.07 ~ 12.30) · Python, DB, 크롤링, 데이터 분석, 머신러닝·딥러닝, LLM, Django, 클라우드"],
    ["학력", "TODO"],
    ["자격증", "TODO"]
  ]
};
