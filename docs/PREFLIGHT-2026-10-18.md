# ARKIVE GLOBAL 최종 배포 준비 보고서

최종 정리일: 2026-10-18 · 개발 브랜치: `codex/arkive-bilingual-rebuild`

## 판정 및 변경된 운영 결정

**기술적으로 배포 준비 완료. 실제 배포는 별도 명시적 승인 후에만 실행한다.**

사용자는 `licensing@arkiveglobal.com`을 당분간 운영하지 않기로 확정했다. 주소와 링크를 유지하며 미운영은 알려진 제한사항으로 수용한다. **이메일 수신은 출시 차단 조건에서 제외한다.** 이전 검증의 메일 수신·회신 및 이메일 서비스 설정 요구를 이 결정으로 대체한다. DNS 변경, 계정 생성, 외부 서비스 도입, 메일 테스트는 수행하지 않았다.

이번 작업은 기존 미커밋 검증·복구 보완을 정리하고, Contact·Privacy의 메일 수신을 전제로 한 문구를 사실에 맞게 최소 수정했다. 추가 디자인 개편이나 신규 기능을 구현하지 않았다. 검증 통과한 변경을 체크포인트 커밋하며, 최종 SHA는 `git log -1 --format=%H`와 전달본의 `RELEASE.json`에 기록한다. main 병합·원격 push·배포는 수행하지 않았다.

## About·Contact·Privacy 최종 검토

| 대상 | 검토·조치 |
|---|---|
| About | 기존 공개 사이트의 기술 자산 개발·보유·관리·라이선싱 역할과 제조·유통·시장 진출 역량을 가진 기업 연결 설명을 대조했다. 확인되지 않은 법인명·주소·설립일·실적·특허·파트너는 추가하지 않았다. 본문 유지. |
| Contact | 기존 이메일 주소와 모든 mailto 목적지·제목 유지. 한·영 안내에 현재 이메일 미운영과 수신 불가, 링크가 접수를 확인하지 않음을 명시. 폼·성공 화면 없음. |
| Privacy | 정적 사이트, 양식·회원가입·분석·광고 추적 부재, 자체 쿠키·언어 저장 부재, GitHub 호스팅 설명 유지. 운영 중인 메일 처리나 개인정보 요청 접수를 암시하던 문구를 제거하고 현재 채널 미운영을 명시. 가상의 보관 기간·위탁 처리 절차를 만들지 않았다. |

코드와 공개 원문 대조에서 새로 확인된 중대한 사실 오류는 없다. 이 검토는 법인 실체나 기술 권리 실사가 아니다. 법인·사업자의 관할 및 실제 사업 형태가 제공되지 않아 기업 필수 고지의 적용 여부는 확정할 수 없다. 운영자는 공개할 법인/사업자 표시, 주소·등록 정보·책임 연락처 등의 필요 여부를 실제 사실에 근거해 확인해야 한다. 이는 이메일을 운영해야 한다는 요구가 아니다. 적용되는 필수 고지가 확인되면 배포 전에 실제 정보로 반영해야 한다.

현재 정보 제출 기능이 없으므로 존재하지 않는 양식 수집·보관·파기 절차를 정책에 추가하지 않았다. 추후 실제 문의 채널이나 분석 기능을 도입할 때에만 실제 처리 항목·제공업체·보유 기간 등 안내를 갱신한다.

## 검증 결과

| 항목 | 결과·범위 |
|---|---|
| Astro/TypeScript | 오류·경고·힌트 0 |
| 빌드 | 정적 HTML 14개: 한·영 12개, 루트, 404 |
| 링크·SEO | 내부 참조 369개, canonical URL 12개, hreflang, OG, sitemap, robots, 구조화 데이터, CNAME 검사 통과 |
| Playwright | 12개 테스트 통과 |
| 반응형 | 전체 12개 페이지, 너비 320/375/390/640/768/900/1024/1440px 및 200% 텍스트 확대·740×360 가로 화면 검사 통과 |
| 접근성 | 전체 언어 페이지 데스크톱·모바일 axe 위반 0, 키보드·포커스·메뉴·FAQ·skip link 검사 통과 |
| 문의·호환성 | mailto 목적지·제목, 기존 앵커의 헤더 가림, /index.html, 실제 404, OG 이미지, 저장소·외부 요청, JavaScript 미사용 흐름 검사 통과 |
| 원본 보존 | 원본 루트 파일 및 자산 보존, 복구용 원본 11개 파일 바이트 일치 + .nojekyll |
| 복구 | 로컬 신규→원본→신규 HTTP 전환 검증. 실제 GitHub 배포·복구는 실행하지 않음 |

이전 회차의 실제 데스크톱·모바일 스크린샷 24장과 6개 비교 시트를 검수했다. 이번 최종 테스트도 스크린샷을 생성한다. 자동 접근성 결과는 WCAG 준수 인증이 아니며 실제 Safari/Firefox·스크린리더·물리 기기 검증은 남아 있다. 이번에는 Lighthouse를 재측정하지 않았다.

## 운영 사이트·배포 설정 확인

- 로컬 main과 원격 main: `91a68d2bcaa9e42aace2a28a5176858a720e3f08` 유지.
- 읽기 전용으로 재확인한 운영 루트는 원본 index.html과 바이트 일치. HTTPS 200, HTTP→HTTPS 301.
- 최근 원격 실행은 기존 `pages build and deployment`, main 기준 성공 이력이다. 신규 수동 워크플로는 아직 원격에 없다.
- CNAME은 원본·신규·복구본 모두 `arkiveglobal.com`. 신규 아티팩트의 `/`, `/index.html`, `/ko/`, `/en/`, 다섯 기존 앵커 및 언어별 하위 페이지를 로컬 검증했다. 신규 언어 URL은 아직 운영에 게시되지 않았다.
- Pages Settings 조회는 연결 도구에서 지원되지 않아 source/domain/HTTPS/환경 승인 설정을 직접 확인하지 못했다. 실제 전환 직전 관리자 확인이 필요하다. 원격 main 조회상 branch protection은 꺼져 있다.
- CNAME 파일만으로 Actions 도메인이 설정되지는 않는다. 승인된 전환 시간대에 기존 게시 소스를 GitHub Actions로 바꾸고 도메인·HTTPS를 보존한다. 그 전에 main에 병합하면 기존 게시 설정이 반응할 수 있다.
- DNS 레코드는 재설정하지 않았다. 메일 DNS의 이전 관측은 운영 서비스 도입 요구나 배포 차단 사유로 사용하지 않는다.

## 이번에 정리한 파일

- `src/content/en.ts`, `src/content/ko.ts`: Contact·Privacy 이메일 미운영 고지 및 사실에 맞는 문구.
- `README.md`, `docs/CONTENT.md`, `docs/VERIFICATION.md`: 이메일 미운영 수용, 실제 처리만 고지한다는 정책 반영.
- `.github/workflows/deploy.yml`: 이전 검증에서 준비한 아티팩트 업로드 v4 반영.
- `.github/workflows/rollback.yml`, `scripts/prepare-rollback.mjs`: 수동 원본 복구 및 무결성 검증.
- `tests/preflight.spec.ts`: 이전 검증에서 준비한 전체 메일 링크·모바일 접근성·앵커·index/404/OG/저장소 검사.
- `docs/DEPLOYMENT.md`, 이 보고서: 기존 출시 조건 갱신, 승인 후 실행 명령과 복구 한계 정리.

소스 저장소에는 node_modules, dist, .astro, .artifacts, test-results, playwright-report, .env를 포함하지 않는다. 기존 HTML/CSS/JS, 원본 이미지, legacy 보관본과 Git 이력은 보존한다. 파일 정리는 생성물의 Git 제외 상태를 확인하는 방식으로 진행하며 임의 삭제하지 않는다.

## 남은 위험과 배포 전 필수 확인

1. **별도 실행 승인:** 정확한 최종 SHA, push·main 병합·운영 배포, 전환 시간대와 복구 담당자 승인.
2. **관리자 설정:** 기존 Pages source/domain/HTTPS, Actions 권한, 환경 승인 여부와 실제 현재 운영 SHA 확인. 운영 SHA가 기준과 달라지면 복구 기준부터 재검토.
3. **실제 운영 정보:** 관할과 사업 형태에 따른 필수 기업 고지 적용 여부 확인. 확인되지 않은 사실을 게시하지 않으며 완전한 법적 적합성을 주장하지 않는다.
4. **수용한 제한:** 메일 미운영으로 모든 이메일 문의가 수신되지 않는다. 매출 문의 전환이 이루어지지 않는 위험을 사용자가 수용했다. 성공 접수 기능 없음.
5. **복구 한계:** 정확한 원본 복구 시 신규 /ko/·/en/ 주소는 404가 된다. 원격 Actions 실행·CDN 반영 시간은 아직 검증하지 않았다. 진행 중인 배포를 취소/완료 확인 후 복구하고 복구 실행이 마지막으로 완료되는지 확인한다.

## 실제 실행 명령과 절차

상세 승인 후 순서는 [DEPLOYMENT.md](DEPLOYMENT.md)에 있다. 아래 명령 중 원격 작업은 **이번에는 실행하지 않았다**.

로컬 검증 및 원본 복구본 준비:

```sh
npm ci
npm run check
npm run build
npm test
node scripts/prepare-rollback.mjs
```

별도 push 승인 후 개발 브랜치를 올리고 검토·병합한다. 병합 전 승인된 시간대에 Pages 소스를 Actions로 전환하고 도메인·HTTPS를 보존한다:

```sh
git push -u origin codex/arkive-bilingual-rebuild
```

정확한 승인 커밋을 main에 병합한 뒤, main의 수동 배포 실행:

```sh
gh workflow run deploy.yml --repo myhushus/Arkiveglobal --ref main -f confirmation='DEPLOY ARKIVE GLOBAL'
gh run list --repo myhushus/Arkiveglobal --workflow deploy.yml --limit 1
```

원격 실행의 SHA와 성공 여부, 실제 도메인의 페이지·앵커·SEO·HTTPS를 확인한다. 메일 수신 테스트는 하지 않는다. 신규 회귀가 있으면 진행 중인 배포를 정리한 후 별도 승인된 원본 복구 실행:

```sh
gh workflow run rollback.yml --repo myhushus/Arkiveglobal --ref main -f confirmation='ROLLBACK ARKIVE GLOBAL'
gh run list --repo myhushus/Arkiveglobal --workflow rollback.yml --limit 1
```

GitHub CLI가 설치·인증되어 있어야 하며 같은 수동 워크플로를 GitHub UI에서도 실행할 수 있다. 복구는 Git 강제 초기화나 DNS 변경 없이 원본 파일 아티팩트를 재게시한다. 사이트 루트·기존 자산·앵커·HTTPS를 다시 확인한다.

## 근거

- [운영 사이트](https://arkiveglobal.com/), [원격 main](https://github.com/myhushus/Arkiveglobal/tree/main), [기존 Pages 실행](https://github.com/myhushus/Arkiveglobal/actions/runs/30683777963): 읽기 전용 조사.
- [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): 배포·도메인 절차의 공식 참고.
- 이메일 미운영 및 배포 차단 조건 제외: 이번 사용자 지시.
