# Exercise Specification — Interactive Task List

## Unit

Unit 03 — Modules, Asynchrony, Events and the Browser

## Learning objective

Render state with DOM creation APIs and connect form submission and delegated clicks to the supplied task model using exported view functions.

## Why this exercise exists

DOM applications become understandable when state, rendering, and event handling have distinct responsibilities. Event delegation also makes propagation observable instead of attaching opaque handlers to every generated element.

## Prerequisites

- ESM, functions/objects, browser events, and basic HTML.

## Starting context

Students receive HTML/CSS, a complete immutable task model, app orchestration, a static server, and an incomplete `task-view.js`. The view exports `renderTasks(tasks, { document, list })` and `bindTaskEvents({ form, list, onAdd, onToggle, onDelete })`.

## Required behavior

- Rendering clears the list and creates one `li` per task with `data-task-id`.
- Each row contains a checkbox reflecting `completed`, a title element populated with `textContent`, and a delete button with `data-action="delete"`.
- Completed rows have class `completed`; empty state renders one noninteractive message row.
- Form submit prevents default, trims the named `title` field, calls `onAdd(title)` only when nonempty, and resets the form after a valid add.
- One list click listener delegates checkbox clicks to `onToggle(id)` and delete-button/descendant clicks to `onDelete(id)` using the containing row.
- Binding returns an `unbind()` function that removes both listeners.

## Constraints

- Browser-native ESM/DOM; Node LTS tests/server; no dependencies.
- Do not use `innerHTML` for task data.
- Do not attach per-row event listeners.
- Student edits only `public/task-view.js`.
- Keep model changes in the supplied model and rerender through the supplied orchestration.

## Observable completion criteria

- Add, toggle, and delete work in the browser without reload.
- A title containing `<script>` renders as text.
- Clicking text inside a delete button still deletes the correct row.
- After unbinding, interactions no longer invoke callbacks.
- All automated checks pass.

## Validation plan

### Baseline checks

- Supplied task model add/toggle/delete is immutable and deterministic.
- HTML contains labeled form and list roots.

### Objective checks

- Normal/empty rendering produces required DOM structure and state.
- Submit behavior trims, rejects blank input, resets correctly, and prevents default.
- Delegated toggle/delete resolves action and task id correctly.
- Unbind removes listeners.

### Regression checks

- Untrusted titles are assigned via `textContent`, not parsed markup.
- Rendering does not mutate tasks.
- Repeated rendering does not accumulate row listeners.

## Intended student work

After reference validation, copy the reference and replace only both exported functions in `public/task-view.js` with TODO no-op implementations (render clears nothing; binding returns a no-op unbind). Model and orchestration remain intact. Baseline passes; view/event checks fail.

## Codex task

> Implement only `public/task-view.js` using DOM creation and `textContent`. Render required rows and empty state; bind one submit and one delegated list click listener; return cleanup that removes them. Do not use `innerHTML`, per-row listeners, dependencies, or changes to model/tests. Done when all checks and manual add/toggle/delete behavior pass. Explain event target, closest row, and current target.

## Debugging / extension task

- Temporarily read `event.currentTarget.dataset.taskId` inside the delegated list listener. Reproduce the missing-id bug, ask Codex for a focused explanation of propagation fields, and repair it.

## Out of scope

- Persistence, server APIs, drag-and-drop, frameworks, custom elements, or styling as the objective.
