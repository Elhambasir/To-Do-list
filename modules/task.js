import Element from './element.js';

const elementObject1 = new Element();
let editId = 0;
let i = null;
export default class Task {
  constructor() {
    this.taskList = [];
  }

  addTask = () => {
    if (editId !== 0 && i !== null) {
      this.updateTask(elementObject1.titleInput.value, i);
    } else {
      const tasks = {
        title: elementObject1.titleInput.value,
        completed: false,
      };
      this.taskList.push(tasks);
      let rd = JSON.parse(localStorage.getItem('tasksInfo'));
      if (rd) {
        rd.push(tasks);
      } else {
        rd = [];
        rd.push(tasks);
      }
      const taskssString = JSON.stringify(rd);
      localStorage.setItem('tasksInfo', taskssString);
      this.retrieveData();
    }
  }

  updateTask = (text, check) => {
    const rd = JSON.parse(localStorage.getItem('tasksInfo'));
    rd.forEach((element) => {
      if (check === true || check === false) {
        if (rd[rd.indexOf(element)].title === text.trim()) {
          rd[rd.indexOf(element)].title = text.trim();
          rd[rd.indexOf(element)].completed = check;
        }
      } else if (check >= 0) {
        if (rd.indexOf(element) === check) {
          rd[rd.indexOf(element)].title = text.trim();
        }
      }
    });
    const taskssString = JSON.stringify(rd);
    localStorage.setItem('tasksInfo', taskssString);
    window.location.reload();
  }

  removeItem = (tasksTitle) => {
    let taskList = JSON.parse(localStorage.getItem('tasksInfo'));
    taskList = taskList.filter((element) => element.title !== tasksTitle);
    const string = JSON.stringify(taskList);
    localStorage.setItem('tasksInfo', string);
    window.location.reload();
  }

  editItem = (title, indexTwo) => {
    const rd = JSON.parse(localStorage.getItem('tasksInfo'));
    rd.forEach((item, index) => {
      if (index === indexTwo) {
        elementObject1.titleInput.value = item.title;
        editId = 1;
        i = indexTwo;
      }
    });
  }

  retrieveData = () => {
    const data = JSON.parse(localStorage.getItem('tasksInfo'));
    if (data) {
      data.forEach((job, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input  type="checkbox"
                                class="checkbox " 
                                id="job-${index}" index="${index}" ${job.completed ? 'checked' : ''}>
                        <label for="job-${index}">
                          ${job.title}
                        </label>
                        <i class="fas fa-trash fa-xs delete" dataset=${job.title} ></i>
                        <i class="fas fa-edit fa-xs edit" dataset=${job.title} ></i>`;
        li.dataset.index = index;
        if (job.completed) {
          li.classList.add('completed');
        }
        document.querySelector('.job-container').appendChild(li);
      });
    }
  }
}
