// Select HTML elements
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const errorMessage = document.querySelector("#error-message");
const taskCounter = document.querySelector("#task-counter");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Tallentaa tehtävät selaimen muistiin
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// Laskee tehtävät, jotka ovat kesken
function updateCounter(){
    const remainingTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `Tasks remaining: ${remainingTasks}`;
}

// Tämä näyttää tehtävät verkkosivulla
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const taskText = document.createElement("span");
        const deleteButton = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", `Merkitse tehtävä ${task.text} tehdyksi`);
        checkbox.addEventListener("change", function(){
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        taskText.textContent = task.text;

        deleteButton.textContent = "Poista";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            renderTasks();
        });

        if (task.completed) {
            listItem.classList.add("completed");

        }
        listItem.append(checkbox, taskText, deleteButton);
        taskList.appendChild(listItem);
    });
        

    updateCounter();
}
    // tässä käsitellään lomakkeen lähettäminen
    taskForm.addEventListener("submit", function(event){
        event.preventDefault();

        const text = taskInput.value.trim();

        // tarkistaa, että tehtävässä on vähintään 3 merkkiä
        if (text.length < 3) {
            errorMessage.textContent =
                 "Kirjoita vähintään 3 merkkiä pitkä tehtävä.";
            taskInput.classList.add("invalid");
            return;
        }
        errorMessage.textContent = "";
        taskInput.classList.remove("invalid");

        // Luodaan uusi tehtävä
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        // lisätään tehtävä taulukkoon
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = "";

    
});
renderTasks();
