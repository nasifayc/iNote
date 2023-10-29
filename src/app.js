const input = document.querySelector("#note-input");
const titleInput = document.querySelector("#title-input");
const addNote = document.querySelector("#add-button");
const container = document.querySelector(".container");
const countBox = document.querySelector('.counter');

addNote.addEventListener("click", () =>{
  appendNote();
})

let data = JSON.parse(localStorage.getItem("notes")) || [];
console.log(data);

createNote();
countNotes();

function appendNote(){
  const title = titleInput.value;
  const note = input.value;
  const date = dateCounter();
  if(note && title){
    data.unshift({title,note,date});
    saveNotes(data);
    createNote();
    countNotes();
  }
  input.value = '';
  titleInput.value = '';
}

function createNote(){
  let noteList = '';
  data.forEach((element) =>{
    const{title,note,date} = element;
    const html = `
      <div class="note-box css-note-box">
        <div class="date-tool-tip css-date-tool-tip">${date}</div>
        <div class="note-title css-note-title">${title}</div>
        <div class="notes">${note}</div>
        <button class="delete-note css-delete-note">-</button>
      </div>
    `;

    noteList += html;
  })

  container.innerHTML = noteList;

  document.querySelectorAll('.delete-note').forEach((value,index)=>{
    value.addEventListener('click',()=>{
      data.splice(index, 1);
      localStorage.removeItem('notes');
      saveNotes(data);
      createNote();
      countNotes();
    })
  })
}

function dateCounter(){
  const currentDate = new Date();
  const day = currentDate.getDate();
  let month  = currentDate.getMonth();
  const year = currentDate.getFullYear();
  switch(month){
    case 0: month = 'Jan'; break;
    case 1: month = 'Feb'; break;
    case 2: month = 'Mar'; break;
    case 3: month = 'Apr'; break;
    case 4: month = 'May'; break;
    case 5: month = 'Jun'; break;
    case 6: month = 'Jul'; break;
    case 7: month = 'Aug'; break;
    case 8: month = 'Sep'; break;
    case 9: month = 'Oct'; break;
    case 10: month = 'Nov'; break;
    case 11: month = 'Dec'; break;
  }
  return `${month} ${day}, ${year} G.C`;
}
function countNotes(){
  let totalNotes = 0;
  data.forEach(() => ++totalNotes);
  countBox.innerHTML = totalNotes;
}

function saveNotes(data){
  localStorage.setItem('notes', JSON.stringify(data));
}