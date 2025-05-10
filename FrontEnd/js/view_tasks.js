const taskList = document.getElementById('task-list');
const message = document.getElementById('message');

async function fetchTasks(){
    try{
    const res = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
        credentials: 'include'
    });

    if(!res.ok){
        throw new Error('Failed to load tasks');
    }

    const tasks = await res.json();

    if(tasks.length === 0){
        message.textContent = 'Tasks not found';
        return;
    }

    taskList.innerHTML = '';
    tasks.forEach(task =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Fecha: ${new Date(task.dueDate).toLocaleDateString()}</p>
        <p>Status: ${task.status}</p>
        <button onclick = "editTask('${task._id}')">Edit</button>
        <button onclick = "deleteTask('${task._id}')">Delete</button>
        `;

        taskList.appendChild(div);
    });
    }catch(error){
        message.textContent = error.message;
        message.style.color = 'red';
    }
}

async function deleteTask(taskId){
    const confirmed = confirm('Are u sure u want to delete this task?');
    if(!confirmed){
        return;
    }

    try{
        const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: 'include'
        });

        if(!res.ok){
            throw new Error('Failed to delete task');
        }

        alert('Task deleted');
        fetchTasks();
    }catch(error){
        alert('Error deleting task:', error.message);
    }
}

function editTask(taskId){
    window.location.href = `edit_task.html?id=${taskId}`;
}

const homeButton = document.getElementById('btn-goHome');
homeButton.addEventListener('click', () =>{
    window.location.href = 'home.html';
});
fetchTasks();