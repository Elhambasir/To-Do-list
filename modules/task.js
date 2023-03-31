import Element from './element.js';

const elementObject1 = new Element();
export default class Task {
  constructor() {
    this.taskList = JSON.parse(localStorage.getItem('tasksInfo')) || [];
  }

  addTask = () => {
    const tasks = {
      title: elementObject1.titleInput.value,
      completed: false,
      index: this.taskList.length + 1,
    };
    this.taskList.push(tasks);
    const taskssString = JSON.stringify(this.taskList);
    localStorage.setItem('tasksInfo', taskssString);
    this.retrieveData();
  }

  updateTask = (text, check) => {
    const rd = this.taskList;
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

  removeItem = (index) => {
    const data = this.taskList;
    data.splice(index, 1);
    for (let i = 0; i < data.length; i += 1) {
      data[i].index = i + 1;
    }
    localStorage.setItem('tasksInfo', JSON.stringify(data));
    window.location.reload();
  }

  update = (index, title) => {
    const data = this.taskList;
    data.forEach((item) => {
      if (item.index === Number(index)) {
        item.title = title;
        localStorage.setItem('tasksInfo', JSON.stringify(data));
      }
    });
    window.location.reload();
  };

  retrieveData = () => {
    const data = this.taskList;
    if (data) {
      data.forEach((job, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input  type="checkbox"
                                class="checkbox " 
                                 index="${index}" ${job.completed ? 'checked' : ''}>
                        <label contenteditable="true" index="${job.index}">
                          ${job.title}
                          </label>
                          <i class="fas fa-grip-lines" data-index=${job.index} ></i>
                        `;
        li.dataset.index = index;
        if (job.completed) {
          li.classList.add('completed');
        }
        document.querySelector('.job-container').appendChild(li);
      });
    }
  }
}