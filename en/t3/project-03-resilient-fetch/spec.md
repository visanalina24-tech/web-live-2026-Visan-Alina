# Exercise Specification — Resilient Fetch

## Unit

Unit 03 — Modules, Asynchrony, Events and the Browser

## Learning objective

Implement and verify timeout, retry, and error-classification behavior around `fetch` without leaking timers, retrying permanent client errors, or leaving stale UI state.

## Why this exercise exists

Naïve generated fetch code often handles only the happy path. Resilience requires an explicit policy: which failures retry, how cancellation works, how attempts are counted, and which final state reaches the user.

## Prerequisites

- Dashboard promises/fetch and explicit UI states.
- Error handling and injectable functions.

## Starting context

Students receive a browser ESM status checker, renderer, deterministic fake-backed tests, static server, and a working `singleAttempt` helper. `fetchWithPolicy(url, options)` is incomplete.

## Required behavior

- Options are `fetchImpl=fetch`, `timeoutMs=1000`, `retries=2`, `sleep`, `createController=() => new AbortController()`, plus injectable `setTimer`/`clearTimer` equivalents for deterministic checks.
- Every attempt uses a fresh abort controller and clears its timeout in `finally`.
- A fulfilled response with `ok` returns its parsed JSON.
- `4xx` throws `Error('request failed: <status>')` immediately without retry.
- Network rejection, abort/timeout, and `5xx` retry until total attempts equal `retries + 1`.
- Before retry N (starting at 1), await `sleep(50 * 2 ** (N - 1))`.
- After exhaustion, throw `Error('request failed after <attempts> attempts: <last message>')` with `cause` set to the last error.
- The supplied UI controller renders loading, success, or final error and never leaves an unhandled rejection.

## Constraints

- Browser-native ESM, `fetch`, `AbortController`; Node LTS tests/server; no dependencies.
- Student edits only `public/fetch-policy.js`.
- Do not retry `4xx` or JSON parsing failures after an otherwise successful response.
- Do not reuse an aborted signal.
- Avoid real waiting in tests through injected `sleep` and controller factories.

## Observable completion criteria

- A transient `503` followed by success produces success after one recorded delay.
- A `404` performs one attempt and renders error.
- A hanging request aborts, retries according to policy, and reaches a final error.
- Timers are cleared for success and failure.
- All checks pass and the student can explain the attempt timeline.

## Validation plan

### Baseline checks

- Renderer/controller transitions work with an injected successful or failing policy.
- Static page and modules load.

### Objective checks

- Immediate success uses one fresh controller and clears timeout.
- `4xx` does not retry.
- Network, timeout, and `5xx` retry with exact delays and fresh signals.
- Exhaustion error includes attempts, last message, and cause.
- Successful-response JSON parse failure does not retry.

### Regression checks

- No timer remains active after an attempt succeeds or fails.
- Input options are not mutated.
- Retry count zero means exactly one attempt.

## Intended student work

After reference validation, copy the reference and replace only `fetchWithPolicy` with a TODO passthrough to the supplied `singleAttempt`, retaining exports/signatures. The browser remains runnable and baseline UI orchestration passes with injected policies; policy checks fail.

## Codex task

> Implement only `public/fetch-policy.js` around the supplied `singleAttempt`. Apply the exact timeout/retry classification and specified delays, which double before each retry, create a fresh controller per attempt, clear every timer in `finally`, and preserve the final cause. Do not edit UI, tests, or dependencies. Done when all checks pass. Draw the attempt/state timeline before editing.

## Debugging / extension task

- Deliberately create the abort controller outside the retry loop. Use the second-attempt failure to diagnose signal reuse, ask Codex for the smallest fix, and verify controller identity in tests.

## Out of scope

- Production circuit breakers, caching, offline persistence, service workers, arbitrary status policies, or external endpoints.
