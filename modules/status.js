export function updateTask(text, check) {
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

export function removeAllCompleted() {
  const data = JSON.parse(localStorage.getItem('tasksInfo'));
  const incompleted = data.filter((item) => item.completed !== true);
  for (let i = 0; i < incompleted.length; i += 1) {
    incompleted[i].index = i + 1;
  }
  const string = JSON.stringify(incompleted);
  localStorage.setItem('tasksInfo', string);
  window.location.reload();
}
