const notesContainer = document.querySelector('.notes-container');
const btnCreate = document.querySelector('.btn-create');
let notes = document.querySelectorAll('.input-box');

function showNodes() {
    notesContainer.innerHTML = localStorage.getItem('allNotes') || "";
}

showNodes();

btnCreate.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    inputBox.classList.add('input-box');
    inputBox.setAttribute("contentEditable", "true");
    
    let img = document.createElement('img');
    img.setAttribute("src", "images/trash.png");
    
    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
});

notesContainer.addEventListener('click', (e) => {
    if(e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }else if(e.target.tagName === "P") {
        notes = document.querySelectorAll('.input-box');
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
});

function updateStorage() {
    window.localStorage.setItem('allNotes', notesContainer.innerHTML);
}

document.addEventListener('keydown', (e) => {
    if(e.key === "Enter") {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
})
