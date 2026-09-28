const actionList = document.querySelector("#action-list");
const countLabel = document.querySelector("#action-count");
const openMetric = document.querySelector("#open-actions-metric");
const panelCount = document.querySelector("#action-panel-count");

function updateActionCounts() {
  const openCount = actionList.querySelectorAll(".action-row:not(.completed)").length;
  const formattedCount = String(openCount).padStart(2, "0");
  countLabel.textContent = formattedCount;
  openMetric.textContent = formattedCount;
  panelCount.textContent = `${formattedCount} OPEN`;
}

actionList.addEventListener("change", (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    event.target.closest(".action-row").classList.toggle("completed", event.target.checked);
    updateActionCounts();
  }
});

document.querySelector("#add-action").addEventListener("click", () => {
  const taskText = window.prompt("What needs to be done next?");
  if (!taskText || !taskText.trim()) return;

  const row = document.createElement("div");
  row.className = "action-row";
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${Date.now()}`;
  const copy = document.createElement("div");
  copy.className = "action-copy";
  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = taskText.trim();
  const detail = document.createElement("small");
  detail.textContent = "General · No due date";
  const priority = document.createElement("span");
  priority.className = "priority";
  priority.textContent = "MED";
  copy.append(label, detail);
  row.append(checkbox, copy, priority);
  actionList.append(row);
  updateActionCounts();
});

updateActionCounts();
