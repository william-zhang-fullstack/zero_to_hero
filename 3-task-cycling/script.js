/* doc elements  */
const taskInput    = document.querySelector(".task-input");
const taskAdd      = document.querySelector(".task-add");
const progressList = document.querySelector(".progress-list");

taskAdd.addEventListener("click", addTaskBar);
progressList.addEventListener("click", updateProgress);

/* update the containers to have the dragged element move to right position */
progressList.addEventListener('dragover', e => {
  e.preventDefault();
  const draggable = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(progressList, e.clientY);
  if (afterElement === null){
    /* no undragged element below cursor -> append */
    progressList.appendChild(draggable);
  } else {
    /* insert after next undragged element below cursor */
    progressList.insertBefore(draggable, afterElement);
  }
});

function addTaskBar(event) {
  event.preventDefault();
  const progressValue = taskInput.value;
  taskInput.value = "";

  if (progressValue === "") return;

  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");
  progressDiv.classList.add("draggable");

  // drag-and-drop attr and listeners
  progressDiv.setAttribute("draggable", true);
  progressDiv.addEventListener('dragstart', () => progressDiv.classList.add('dragging'));
  progressDiv.addEventListener('dragend', () => progressDiv.classList.remove('dragging'));

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

function getDragAfterElement(container, clientY) {
  /* identify the next undragged element below cursor */
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  /* 'closest' is our storage ... 'child' are the draggable elements */
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = clientY - (box.top + box.height / 2);
    if (offset < 0 && offset > closest.offset) {
      return {offset: offset, element: child};
    } else {
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
}