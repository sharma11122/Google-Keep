const addButton=document.querySelector('#add');

const updateLSData=()=>{
    const textAreaData=document.querySelectorAll('textarea');
    const notes=[];

    textAreaData.forEach((note)=>{
         return notes.push(note.value);
    })

    localStorage.setItem('notes',JSON.stringify(notes));
}
const addNewNodes=(text='')=>{

    const note=document.createElement('div');
    note.classList.add('note');

    const htmlData=`
    <div class="operation">
    <button class="edit"><i class="fas fa-edit"></i></button>
    <button class="delete"><i class="fas fa-trash-alt"></i></button>
     </div>
     <div class="main ${text ? " " : "hidden"}"></div>
     <textarea class="${text? "hidden": " "}"></textarea> `;

     note.insertAdjacentHTML('afterbegin',htmlData);
     console.log(note);
     
     const editButton=note.querySelector('.edit');
     const delButton=note.querySelector('.delete');
     const mainDiv=note.querySelector('.main');
     const textarea=note.querySelector('textarea');

    delButton.addEventListener('click',()=>{
        note.remove();
    })
    textarea.value=text;
    mainDiv.innerHTML=text;

    //toggle using editButton
    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    })
    textarea.addEventListener('change',(event)=>{
         const value=event.target.value;
         mainDiv.innerHTML=value;

         updateLSData();//local storage m data store krna
    })


     document.body.appendChild(note);
}
//getting data back from localStrage

const notes=JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note)=>{
        addNewNodes(note);
    });
}

addButton.addEventListener('click',()=>{
    addNewNodes();
});

