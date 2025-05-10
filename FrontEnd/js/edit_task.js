const form = document.getElementById('editForm');
const message = document.getElementById('message');
const taskId = new URLSearchParams(window.location.search).get('id');

window.addEventListener('load', async() =>{
    try{
        const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            credentials: 'include'
        });

        if(!res.ok){
            throw new Error('Failed to load task');
        }

        const task = await res.json();
        form.title.value = task.title;
        form.description = task.description;
        form.dueDate.value = task.dueDate;
        form.status.value = task.status;

    }catch(error){
        message.textContent = 'Error loading task';
        message.style.color = 'red';
    }
});

form.addEventListener('submit', async(e) =>{
    e.preventDefault();

    const updateTask = {
        title:form.title.value.trim(),
        description: form.description.value.trim(),
        dueDate: form.dueDate.value.trim(),
        status: form.status.value
    };

    try{
        const res = await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json' 
            },
            credentials: 'include',
            body: JSON.stringify(updateTask)
        });

        if(!res.ok){
            throw new Error('Failed to update task');
        }

        message.textContent = 'Task update succesfully';
        message.style.color = 'green';
    }catch(error){
        message.textContent = 'Error updating task';
        message.style.color = 'red';
    }
});

const viewButton = document.getElementById('btn-goView');
viewButton.addEventListener('click', () =>{
    window.location.href = 'view_tasks.html';
});

const homeButton = document.getElementById('btn-goHome');
homeButton.addEventListener('click', () =>{
    window.location.href = 'home.html';
});