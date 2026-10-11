# Project 03 — Resilient Fetch

## Objective

Extend the supplied single-request helper to stop slow requests and retry selected failures. Check the delays, timer cleanup, and final result shown on the page.

A **timeout** sets a time limit for an attempt. A **retry** makes another attempt after a failure. **Backoff** is the delay before retrying; in this exercise, that delay doubles before each retry. These rules are chosen for this exercise, rather than being universal rules for every application.

## What is missing from the starter

The student project can succeed once and reject permanent errors, but it does not stop slow requests or retry failed ones. Draw attempts as a timeline including controller creation, timer setup, request success or failure, timer cleanup, an optional delay before retrying, and the next attempt.

Give Codex the focused task from `spec.md`. Review for controllers created outside the loop, retries of `4xx` or parse errors, timers cleared after rather than before backoff, off-by-one attempt counts, and loss of the final cause.

## Success criteria

- All checks pass.
- Transient failures use exact delays and fresh signals.
- `4xx` and JSON parsing failures do not retry.
- Timeout aborts the active attempt.
- Every timer clears and exhaustion reports attempts plus cause.
- Only `public/fetch-policy.js` changes.

## Debugging task

Move controller creation outside the retry loop. Inspect the second attempt's already-aborted signal, request a targeted diagnosis, and restore a fresh controller per attempt.

## What you should be able to explain

- Fulfilled HTTP errors versus rejected network requests.
- Cancelling a request and creating a new controller for each attempt.
- Which failures are retried and why the delay doubles before each retry.
- Clearing timers in `finally` and retaining the last error in `cause`.
