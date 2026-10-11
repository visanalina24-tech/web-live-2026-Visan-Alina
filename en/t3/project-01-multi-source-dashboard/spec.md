# Exercise Specification — Multi-source Data Dashboard

## Unit

Unit 03 — Modules, Asynchrony, Events and the Browser

## Learning objective

Coordinate several independent `fetch` operations in parallel and render explicit loading, success, and error states through a small ESM browser application.

## Why this exercise exists

Browser applications rarely wait for one source at a time. Keeping data loading, result combination, and rendering separate lets students trace successful requests and locate errors.

## Prerequisites

- Unit 2 functions, arrays/objects, ESM reading, and error handling.
- Unit 1 HTTP status and JSON concepts.

## Starting context

Students receive a dependency-free browser project served by a tiny supplied Node static server. Three deterministic JSON resources, HTML/CSS, DOM renderer, app bootstrap, and tests are complete. `loadDashboard({ fetchImpl, render })` is incomplete.

## Required behavior

- Immediately render `{ state: 'loading' }`.
- Start requests for `/data/profile.json`, `/data/tasks.json`, and `/data/notices.json` before awaiting any one result.
- Reject any non-2xx response with `Error('request failed: <path> (<status>)')`.
- Parse all three JSON bodies and render one success model containing profile, open task count, total task count, and notices.
- On any request/parsing failure, render `{ state: 'error', message }` and resolve without an unhandled rejection.
- Return the final rendered model for deterministic testing.

## Constraints

- Browser-native ESM and `fetch`; Node LTS static server and tests; no dependencies.
- Use `Promise.all` for independent work.
- Do not edit resource fixtures, renderer, bootstrap, or tests as student work.
- Keep DOM access inside the supplied renderer and inject `fetch`/render dependencies into the controller.

## Observable completion criteria

- Browser visibly moves from loading to a dashboard populated from all three sources.
- Network inspection shows the three requests begin together.
- A missing resource produces a visible error rather than stale loading or an unhandled rejection.
- All tests pass and the student can explain when each promise fulfills or rejects.

## Validation plan

### Baseline checks

- Static project files and JSON fixtures exist and parse.
- Renderer displays each state without depending on the controller.

### Objective checks

- Loading precedes the final state.
- All fetches are initiated before any response resolves.
- Success aggregation is exact.
- HTTP and JSON failures become the required error model.

### Regression checks

- Source arrays/objects are not mutated.
- Each path is fetched exactly once.
- Controller produces no unhandled rejection for expected failures.

## Intended student work

After reference validation, copy the reference and replace only `loadDashboard` in `public/dashboard.js` with a TODO that renders/returns loading state. Baseline remains green; objective and controller-dependent regression checks fail while the application still loads.

## Codex task

> Implement only `public/dashboard.js`. Start all three native fetches in parallel, validate `response.ok`, aggregate the documented model, render explicit loading/success/error states, and handle expected failures without an unhandled rejection. Do not edit the DOM renderer, fixtures, server, or tests and add no dependency. Done when all checks pass. Explain why the requests are parallel.

Students inspect the diff for sequential awaits, swallowed errors, duplicated fetches, and DOM coupling, then verify browser Network timing and one deliberate missing-resource failure.

## Debugging / extension task

- Change one path to a missing file. Diagnose why `fetch` fulfills for a `404`, add or restore the explicit `response.ok` check, and verify the error UI.

## Out of scope

- Remote APIs, authentication, caching, retry/timeout behavior, React, bundlers, or production static hosting.
