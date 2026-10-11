import { fetchWithPolicy } from "./fetch-policy.js";
import { checkStatus } from "./status-controller.js";
const button = document.querySelector("#check"),
  result = document.querySelector("#result");
const render = (model) => {
  result.dataset.state = model.state;
  result.textContent =
    model.state === "loading"
      ? "Se verifică…"
      : model.state === "success"
        ? `${model.data.service}: ${model.data.status}`
        : `Eșec: ${model.message}`;
};
button.addEventListener("click", () =>
  checkStatus({ policy: () => fetchWithPolicy("/data/status.json"), render }),
);
