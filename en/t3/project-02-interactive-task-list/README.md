# Project 02 — Interactive Task List

## Objective

Render immutable task state with safe DOM APIs and connect one submit plus one delegated click listener to the supplied model.

## Workflow

Read the model and app orchestration first. Identify which module stores tasks and which functions create DOM elements and register listeners. In DevTools, inspect how a nested click bubbles to the list and compare `target`, `closest(...)`, and `currentTarget`.

Give Codex the focused task from `spec.md`. Reject `innerHTML`, per-row listeners, model edits, or a rewrite of app orchestration. Check that cleanup removes each listener using the same function reference that was registered.

## Success criteria

- All checks pass and manual add/toggle/delete works.
- Untrusted markup-shaped titles render as text.
- Nested delete-button clicks resolve the correct row.
- Cleanup stops callbacks.
- Only `public/task-view.js` changes.

## Debugging task

Temporarily derive the task id from `event.currentTarget`. Observe why the list has no task id, request a focused explanation, and repair lookup through the event target's containing row.

## What you should be able to explain

- State versus DOM representation.
- Safe text insertion.
- Event bubbling and delegation.
- Removing listeners and dividing work between modules.
