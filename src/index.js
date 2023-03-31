import './index.css';
// import _ from 'lodash';
import Element from '../modules/element.js';
import { removeAllCompleted, updateTask } from '../modules/status.js';
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
  element.nextElementSibling.addEventListener('click', (e) => {
    e.target.parentElement.setAttribute('style', 'background-color:lightgray;');
    e.target.nextElementSibling.classList.remove('fa-trash', 'fa-xs', 'fa-grip-lines');
    e.target.nextElementSibling.classList.add('fa-trash', 'fa-xs', 'delete');
    e.target.nextElementSibling.addEventListener('click', () => {
      taskObject1.removeItem(element.getAttribute('index'));
    });

    document.querySelectorAll('.checkbox').forEach((element) => {
      if (element.nextElementSibling !== e.currentTarget) {
        element.parentElement.setAttribute('style', 'background-color:white;');
        element.nextElementSibling.nextElementSibling.classList.add('fa-trash', 'fa-xs', 'fa-grip-lines');
        element.nextElementSibling.nextElementSibling.classList.remove('fa-trash', 'fa-xs', 'delete');
      }
    });
  });
});
document.querySelectorAll('.checkbox').forEach((element) => {
  element.addEventListener('change', (e) => {
    if (e.currentTarget.checked === true) {
      updateTask(element.nextElementSibling.textContent, true);
    } else {
      updateTask(element.nextElementSibling.textContent, false);
    }
  });
});

elementObject1.refresh.addEventListener('click', () => {
  window.location.reload();
});

document.querySelectorAll('.edit').forEach((item, index) => {
  item.addEventListener('click', () => {
    const elem = item.previousElementSibling.previousElementSibling.textContent.trim();
    taskObject1.editItem(elem, index);
  });
});

document.querySelectorAll('label').forEach((element) => {
  element.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      if (e.target.textContent !== '') {
        const num = e.target.getAttribute('index');
        taskObject1.update(num, e.currentTarget.textContent);
      }
    }
  });
});

elementObject1.removeButton.addEventListener('click', () => {
  removeAllCompleted();
});