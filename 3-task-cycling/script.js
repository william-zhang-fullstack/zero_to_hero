/* doc elements  */
const taskInput    = document.querySelector(".task-input");
const taskAdd      = document.querySelector(".task-add");
const progressList = document.querySelector(".progress-list");

taskAdd.addEventListener("click", addTaskBar);
progressList.addEventListener("click", updateProgress);

function addTaskBar(event) {
  event.preventDefault();
  const progressValue = taskInput.value;
  taskInput.value = "";

  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");

  // task subtract button
  const subtractButton = document.createElement('button');
  subtractButton.innerHTML = '<i class="fas fa-minus"></i>';
  subtractButton.classList.add("subtract-btn");
  progressDiv.appendChild(subtractButton);

  // task complete button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-plus"></i>';
  completedButton.classList.add("complete-btn");
  progressDiv.appendChild(completedButton);

  // progress bar
  const progressBar = document.createElement("div");
  const att = document.createAttribute("data-label");
  att.value = progressValue;
  progressBar.setAttributeNode(att);
  progressBar.classList.add("progress-bar");
  progressBar.style.flexGrow = "5";
  progressDiv.appendChild(progressBar);

  // task type delete button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  progressDiv.appendChild(trashButton);

  progressList.appendChild(progressDiv);
}


function updateProgress(event) {
  /* update on clicking complete/subtract/delete button */
  const taskBarElements = Array.from(event.target.parentElement.children);

  switch (event.target.classList[0]) {
    case "complete-btn":
      taskBarElements.forEach(elem => {
        if (elem.classList[0] === "progress-bar") {
          const computedStyle = getComputedStyle(elem);
          const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
          const newWidth = Math.min(100, width + 10)
          elem.style.setProperty('--width', newWidth);
          if (newWidth >= 100) make_fall(elem.parentElement);
        }
      });
      break;
    case "subtract-btn":
      taskBarElements.forEach(elem => {
        if (elem.classList[0] === "progress-bar") {
          const computedStyle = getComputedStyle(elem);
          const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
          elem.style.setProperty('--width', Math.max(0, width - 10));
        }
      });
      break;
    case "trash-btn":
      const progress = event.target.parentElement;
      make_fall(progress);
      break;
  }
}

function make_fall(element) {
  element.addEventListener('transitionend', () => element.remove());
  element.classList.add("fall");
}
