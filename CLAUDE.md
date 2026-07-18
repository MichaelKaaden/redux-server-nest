# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branching model

This repo follows **Git Flow**: `master` holds released code (tagged per version), `develop` is the integration branch. Releases are cut on `release/*` branches, bumped (`[chore] Bump version for release x.y.z`), merged into `master` and tagged, then merged back into `develop`. Feature work branches off `develop`, not `master`.

## Commands

Package manager is **yarn**.

- `yarn start` — run with ts-node (no watch)
- `yarn start:dev` — run with nodemon, auto-restart on change
- `yarn build` — compile to `dist/` via `tsc -p tsconfig.build.json`
- `yarn start:prod` — run compiled `dist/main.js`
- `yarn lint` — tslint over `src` (project uses **tslint**, not eslint)
- `yarn format` — prettier `--write` on `src/**/*.ts`
- `yarn test` — unit tests (Jest, files matching `*.spec.ts` under `src/`)
- `yarn test:watch` — unit tests in watch mode
- `yarn test:cov` — unit tests with coverage
- `yarn test:e2e` — e2e tests (`test/*.e2e-spec.ts`, separate Jest config at `test/jest-e2e.json`)
- Run a single unit test file: `yarn test counters.controller.spec.ts`
- Run a single test by name: `yarn test -t "should choke on a missing index"`

Note: `test/app.e2e-spec.ts` expects a `GET /` route returning "Hello World!", but `AppModule` only registers `CountersController` (mounted at `/counters`) — there is no root controller, so this e2e test currently fails against the real app. Be aware of this mismatch if asked to fix or extend e2e tests.

## Architecture

This is a minimal Nest.js REST API with a **single controller and no service/module-per-feature layering** — don't assume there's a `CountersService` or repository to find; the controller holds state directly.

- `src/main.ts` — bootstraps the Nest app on port 3000 and wires up Swagger UI at `/swagger-ui` (built from `DocumentBuilder` config here).
- `src/app.module.ts` — root module; registers `CountersController` directly, no providers.
- `src/counters/counters.controller.ts` — all business logic lives here:
  - Counters are kept **in-memory** in a private `counters: Counter[]` array on the controller instance — state resets on every restart and is not persisted anywhere.
  - `getCounterByIndex(index)` is get-or-create: if a counter for that index doesn't exist, it's created with value 0, inserted, and the array is re-sorted by index. This is the routing hub — `getCounter`, `setCounter`, `increment`, and `decrement` all go through it.
  - All endpoints validate the `id` route param manually (`if (id == null) throw new HttpException(...)`) rather than using a Nest pipe/guard — follow this same manual-check style for new endpoints rather than introducing `ParseIntPipe` etc.
  - Responses are wrapped uniformly via the private `buildOkayResponse(data)` helper into `{ data, message: "okay", status: 200 }` — reuse this helper for any new endpoint rather than returning raw payloads.
- `src/models/`
  - `counter.ts` — the `Counter` domain class (`index`, `value`), also directly annotated with `@ApiProperty` for Swagger (no separate DTO for the domain object).
  - `body-types.ts` — request body DTOs: `CreateCounterDto` (`count`) for `PUT /counters/:id`, `DecIncCounterDto` (optional `by`) for increment/decrement.
  - `json-types.ts` — response envelope DTOs (`JsonCounter`, `JsonCounters`, and their nested `CounterDto`/`CountersDto`) used purely for Swagger typing of the `buildOkayResponse` shape.

## Style conventions (enforced by tslint/prettier, not just convention)

- Double quotes (`tslint.json` `quotemark: double`), 4-space indent, 120 print width, trailing commas everywhere (`.prettierrc`).
- tslint extends `tslint:recommended` with several rules disabled project-wide: `member-access`, `ordered-imports`, `member-ordering`, `interface-name`, `arrow-parens`, `object-literal-sort-keys`. Don't "fix" code to satisfy those — they're deliberately off.
