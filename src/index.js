import './index.css';
// import _ from 'lodash';

const jobs = [
  {
    index: 1,
    desc: 'Complete project',
    completed: false,
  },
  {
    index: 2,
    desc: 'Do excersie',
    completed: false,
  },
  {
    index: 3,
    desc: 'Play vindexeo game',
    completed: false,
  },
];

const displayJob = () => {
  jobs.forEach((job) => {
    const li = document.createElement('li');
    li.innerHTML = `<input  type="checkbox" 
                            class="checkbox ${job.completed ? 'completed' : ''}" 
                            id="job-${job.index}" ${job.completed ? 'checked' : ''}>
                    <label for="job-${job.index}">
                      ${job.desc}
                    </label>`;
    li.dataset.index = job.index;
    if (job.completed) {
      li.classList.add('completed');
    }
    document.querySelector('.job-container').appendChild(li);
  });
};

window.addEventListener('load', () => {
  displayJob();
});