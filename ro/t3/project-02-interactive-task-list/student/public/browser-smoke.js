import "./app.js";

const form = document.querySelector("#task-form");
form.elements.title.value = "Sarcină din browser";
form.requestSubmit();
let row = [...document.querySelectorAll("[data-task-id]")].at(-1);
row.querySelector('[data-action="toggle"]').click();
row = [...document.querySelectorAll("[data-task-id]")].at(-1);
if (!row.classList.contains("completed"))
  throw new Error("Evenimentul de comutare nu a actualizat sarcina");
row.querySelector('[data-action="delete"]').click();
if (document.body.textContent.includes("Sarcină din browser"))
  throw new Error("Evenimentul de ștergere nu a eliminat sarcina adăugată");
document.documentElement.dataset.browserSmoke = "pass";
