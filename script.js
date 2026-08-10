const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const allBtn = document.querySelector("#allBtn");
const completedBtn = document.querySelector("#completedBtn");
const pendingBtn = document.querySelector("#pendingBtn");
const totalTask = document.querySelector("#totalTask");
const completedTask = document.querySelector("#completedTask");
const pendingTask = document.querySelector("#pendingTask");
const clearBtn = document.querySelector("#clearBtn");
const emptyMsg = document.querySelector("#emptyMsg");
const filterBtns = document.querySelectorAll("filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTask(){
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

function checkEmpty(){

    if(tasks.length === 0){

        emptyMsg.style.display = "block";

    }else{

        emptyMsg.style.display = "none";
    }
}

function updateCount(){

    totalTask.textContent = tasks.length;

    let completed = tasks.filter(function(task){

        return task.completed === true;

    });

    completedTask.textContent = completed.length;

    let pending = tasks.filter(function(task){

        return task.completed === false;

    });

    pendingTask.textContent = pending.length;
}

clearBtn.addEventListener("click",

    () =>{

        tasks = [];

        saveTask();

        taskList.innerHTML = "";

        updateCount();
    }
);

function updateUI(){

    saveTask();

    updateCount();

    checkEmpty();
}

function createTask(task){
    
    checkEmpty();

    let li = document.createElement("li");
    li.className = "Task";

    const left = document.createElement("div");
    left.className = "left";

    const right = document.createElement("div");
    right.classList.add("right");
 
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    left.appendChild(checkBox);

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    left.appendChild(taskText);

    
    let editBtn = document.createElement("button");
    editBtn.className =  "edit-btn"
    editBtn.innerHTML = `<i class="ri-pencil-line"></i>`;

    li.appendChild(left);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = `<i class="ri-delete-bin-5-line"></i>`;

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(right);

    taskList.appendChild(li);
   
    checkBox.checked = task.completed;

    li.prepend(checkBox);

     checkBox.addEventListener("change",
        () =>{
            
            task.completed = checkBox.checked;

            if(checkBox.checked){

                li.style.textDecoration = "line-through";
            
            }else{

                li.style.textDecoration = "none";
            
            }

            saveTask();
            checkEmpty();
            updateCount();
        }
    ); 


    deleteBtn.addEventListener("click",
        () =>{
            li.remove();

            let index = tasks.indexOf(task);
            tasks.splice(index,1);

            saveTask();

            checkEmpty();

            updateCount();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

    li.appendChild(editBtn);

    editBtn.addEventListener("click",

        () =>{

            let newTask = prompt("Edit Task", task.text);

            if (newTask === null || newTask.trim() === ""){
                return;
            }

            task.text = newTask;
          
            li.childNodes[1].textContent = newTask;

            saveTask();
            
        }
    );

    allBtn.addEventListener("click",
        () =>{
            const allTask = document.querySelectorAll("li");

            allTask.forEach(function (li) {
            
                li.style.display = "flex";
            
            })

            setActive(addBtn);
    });
    
    completedBtn.addEventListener("click",
        () =>{
            
            const allTask = document.querySelectorAll("li");

            allTask.forEach(function (li) {

                const checkbox = li.querySelector("input");

                if(checkbox.checked){

                    li.style.display = "flex";

                }else{

                    li.style.display = "none";
                
                }
            })

            setActive(completedBtn);
    });

    pendingBtn.addEventListener("click",

        () =>{
            const allTask = document.querySelectorAll("li");

            allTask.forEach(function (li) {

                const checkbox = li.querySelector("input");

                if(! checkbox.checked){

                    li.style.display = "flex";

                }else{

                    li.style.display = "none";
                
                }
            })

            setActive(pendingBtn);
    });

    
    
}

addBtn.addEventListener("click" ,
    () => {

        let task = taskInput.value.trim() ;

        if (task === ""){
            alert("Please enter a task");
            return;
        }

        tasks.push({
            text: task,
            completed: false
        });

        saveTask();

        createTask(tasks[tasks.length - 1]);

        updateCount();

        taskInput.value = ""; 
    }
)

tasks.forEach(task => {

    createTask(task);

    checkEmpty();

});

allBtn.classList.add("active");

function setActive(btn){

    allBtn.classList.remove("active");

    completedBtn.classList.remove("active");

    pendingBtn.classList.remove("active");

    btn.classList.add("active");

}