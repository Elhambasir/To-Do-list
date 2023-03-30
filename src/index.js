import './index.css';
// import _ from 'lodash';
import Element from '../modules/element.js';
import Task from '../modules/task.js';

const taskObject1 = new Task();
const elementObject1 = new Element();
elementObject1.btnAddNew.addEventListener('click', () => {
  if (elementObject1.titleInput.value) {
    taskObject1.addTask();
  }
});
taskObject1.retrieveData();
window.addEventListener('load', () => {
  document.querySelectorAll('.checkbox').forEach((element) => {
    if (element.attributes.value === 'checked') {
      element.classList.add('overlined');
    } else {
      element.classList.remove('overlined');
    }
  });
});

document.querySelectorAll('.checkbox').forEach((element) => {
  element.addEventListener('change', (e) => {
    if (e.currentTarget.checked === true) {
      taskObject1.updateTask(element.nextElementSibling.textContent, true);
    } else {
      taskObject1.updateTask(element.nextElementSibling.textContent, false);
    }
  });
});

elementObject1.removeButton.addEventListener('click', () => {
  document.querySelectorAll('.completed').forEach((element) => {
    taskObject1.removeItem(element.firstElementChild.nextElementSibling.textContent.trim());
  });
});

elementObject1.refresh.addEventListener('click', () => {
  window.location.reload();
});

document.querySelectorAll('.delete').forEach((item) => {
  item.addEventListener('click', () => {
    taskObject1.removeItem(item.previousElementSibling.textContent.trim());
  });
});

document.querySelectorAll('.edit').forEach((item, index) => {
  item.addEventListener('click', () => {
    const elem = item.previousElementSibling.previousElementSibling.textContent.trim();
    taskObject1.editItem(elem, index);
  });
});