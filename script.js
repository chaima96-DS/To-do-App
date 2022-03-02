// sélécteurs

const todoButton  =document.querySelector ('.todo-button')
//const deleteButton = document.querySelector('.delete')
///const checkButton = document.querySelector('.checked')
const input =document.querySelector('.txt');
const mylist= document.querySelector('ul');


// ajouter un event listner au boutton 
//DOMContentLoaded: la focntion getTodos fonctionne lorsque la page web est chargé
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click",addItem);
mylist.addEventListener("click",deleteItem);
mylist.addEventListener("click",checkItem);
//mylist.addEventListener("click",store);

//fonctions

function addItem(event)
{
    if (input.value!= "")
    {
        console.log("the button is clicked");
        //crée le div contenant un item de la todo liste
        const newDiv =document.createElement('div')
        // donner la classe pour ce div
        newDiv.classList.add("task-div");
        const newTask = document.createElement("li");
        newTask.innerText= input.value;
       
        //stocker la valeur d e linput dans le sotckage locle
       store(input.value)
        //rajuter les boutton de supression et de checking 
        /* //1 checked
         const newDivCheck=document.createElement('div');
         newDivCheck.classList.add("checked");
         newDivCheck.innerHTML='<i class="fas fa-check"></i>'
        //2 delete
        const newDivDelete=document.createElement('div');
        newDivDelete.classList.add("delete");
        newDivDelete.innerHTML='<i class="fas fa-trash"></i>'
        */
        const checkdeleteDiv=document.createElement("div");
        checkdeleteDiv.classList.add("check-delete");
        //1 checked
        const newDCheckButton=document.createElement('button');
        newDCheckButton.classList.add("checked");
        newDCheckButton.innerHTML='<i class="fas fa-check"></i>'
        //2 delete
        const newDeleteButton=document.createElement('div');
        newDeleteButton.classList.add("delete");
        newDeleteButton.innerHTML='<i class="fas fa-trash"></i>'
        
        checkdeleteDiv.appendChild(newDCheckButton);
        checkdeleteDiv.appendChild( newDeleteButton)
        //jouter le nouveau element li au nouveau div
        newDiv.appendChild(newTask)
        newDiv.appendChild( checkdeleteDiv)

        //ajouter le nouveau div a la liste ul
        mylist.append(newDiv);
        // réinitialiser la valeur de l'input à vide
        input.value="";

    }//end if
    
}//fin

//suppression
 function deleteItem(event)
 {   
     const element= event.target;
    //console.log(element.classList[1])
    if (element.classList[1]== "fa-trash")
    {
       
       const item = element.parentElement;
       const parentItem=item.parentElement
       const racine=parentItem.parentElement
       
       //console.log(parentItem)
       racine.remove()
       removeLocalTodos(racine)
    }
 }//fin

 function checkItem(event)
 {
    const element= event.target;
    //console.log(element.classList[1])
    if (element.classList[1]== "fa-check")
    {
      const item = element.parentElement;
      const parentItem=item.parentElement
      const racine=parentItem.parentElement
      
       //console.log(racine)
       racine.classList.toggle("complete")
      
       
       
      
    }


   
 }//fin 
//fonction d'ajout dans le lodcal storage 
 function store(todo)
 {
   let todos=[];
  if (localStorage.getItem("todos") == null) {
    todos = [];
   
    
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
   todos.push(todo)
   //console.log(todos)
  localStorage.setItem("todos", JSON.stringify(todos));
 }

 // récupérer les todos a partir du local storage pour les afficher
 function getTodos()
 {
   let todos=[];
   if (localStorage.getItem("todos") == null) {
     todos = [];
     
   } else {
     todos = JSON.parse(localStorage.getItem("todos"));
   }
   //console.log(todos);
   todos.forEach(element => {
       //crée le div contenant un item de la todo liste
       const newDiv =document.createElement('div')
       // donner la classe pour ce div
       newDiv.classList.add("task-div");
       const newTask = document.createElement("li");
       newTask.innerText=element;
      
      
        //rajuter les boutton de supression et de checking 
   
       const checkdeleteDiv=document.createElement("div");
       checkdeleteDiv.classList.add("check-delete");
        //1 checked
       const newDCheckButton=document.createElement('button');
       newDCheckButton.classList.add("checked");
       newDCheckButton.innerHTML='<i class="fas fa-check"></i>'
       //2 delete
        const newDeleteButton=document.createElement('div');
        newDeleteButton.classList.add("delete");
        newDeleteButton.innerHTML='<i class="fas fa-trash"></i>'
   
        checkdeleteDiv.appendChild(newDCheckButton);
        checkdeleteDiv.appendChild( newDeleteButton)
       //jouter le nouveau element li au nouveau div
        newDiv.appendChild(newTask)
         newDiv.appendChild( checkdeleteDiv)

       //ajouter le nouveau div a la liste ul
        mylist.append(newDiv);
   });
   
 }//fin

//supprimer l'element du stockage locale

function removeLocalTodos(todo) {
   let todos;
   console.log(todo)
   if (localStorage.getItem("todos") === null) {
     todos = [];
   } else {
     todos = JSON.parse(localStorage.getItem("todos"));
   }
   
   const todoIndex = todo.children[0].innerText;
  
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem("todos", JSON.stringify(todos));
 }