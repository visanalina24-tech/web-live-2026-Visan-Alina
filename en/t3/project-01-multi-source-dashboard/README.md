# Project 01 — Multi-source Data Dashboard

## Objective

Coordinate three independent browser requests in parallel and render explicit loading, success, and error states.

## Workflow

Run the student project, open Network tools, and observe its permanent loading state. Read the bootstrap, renderer, fixtures, and tests before editing the controller. Sketch the promise timeline and identify what must happen before the first `await`.

Give Codex the focused task from `spec.md`. Review for sequential awaits, missing `response.ok` checks, duplicate requests, swallowed failures, and direct DOM access. Run focused checks, then confirm in the browser that all three requests begin together.

## Success criteria

- All checks pass.
- Loading always renders first.
- Success combines all three sources exactly once.
- HTTP and parse failures render an error without an unhandled rejection.
- Only `public/dashboard.js` changes.

## Debugging task

Point one request at a missing resource. Explain why `fetch` still fulfills for `404`, then restore explicit status validation and verify the visible error state.

## What you should be able to explain

- Promise creation versus awaiting.
- Parallel versus sequential async work.
- HTTP failure versus rejected `fetch`.
- Keeping data loading separate from DOM rendering.
